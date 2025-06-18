import { FiUpload } from "react-icons/fi";
import styles from "./UploadBtn.module.css";
import useStartUpload from "@/hooks/useStartUpload";
import { useState } from "react";

const UploadBtn = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { result, isUploading, error } = useStartUpload(selectedFiles);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files?.length < 1) {
      console.log("No files selected");
      return;
    }

    const filesArray = Array.from(e.target.files);
    console.log("selected files---", filesArray);
    setSelectedFiles(filesArray);

    // console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return (
    <>
      <label
        htmlFor="upload-button"
        className={styles.upload_btn_label}
        aria-disabled={isUploading}
      >
        <FiUpload title="upload" size={"1.5rem"} />
      </label>
      <input
        id="upload-button"
        type="file"
        onChange={handleChange}
        multiple={true}
        style={{ display: "none" }}
      />
    </>
  );
};

export default UploadBtn;
