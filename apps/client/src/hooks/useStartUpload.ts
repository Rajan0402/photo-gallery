import axios from "axios";
import { useEffect, useState } from "react";
import { UploadFileResult } from "uploadthing/types";

export default function useStartUpload(files: File[]) {
  const [result, setResult] = useState<UploadFileResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("files---", files);
    const handleStartUpload = async () => {
      if (files.length === 0) return;

      setIsUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file);
        });

        const res: UploadFileResult = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/files/upload`,
          formData,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        setResult(res);
      } catch (err: any) {
        setError(err.response?.data ?? err.message);
        setResult(null);
      } finally {
        setIsUploading(false);
      }
    };
    handleStartUpload();
  }, [files]);

  return { result, isUploading, error };
}
