// import { useState } from "react";
import { useUploadThing } from "../../utils/uploadThing";

function UploadSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

export default function UploadButton() {
  const { startUpload, isUploading } = useUploadThing(
    `${import.meta.env.VITE_BACKEND_URL}/api/files/upload`,
    {
      onUploadBegin() {
        window.alert("Upload started");
      },
      onUploadError(error) {
        console.log(`Upload failed: ${error.message}`);
      },
      onClientUploadComplete() {
        console.log("Upload complete");
        // router.refresh();
      },
    }
  );

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files?.length < 1) {
      console.log("No files selected");
      return;
    }

    const selectedFiles = Array.from(e.target.files);
    console.log("selected files---", selectedFiles);
    const result = await startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return (
    <div>
      <label
        htmlFor="upload-button"
        className="upload-button"
        aria-disabled={isUploading}
      >
        <UploadSVG />
      </label>
      <input
        id="upload-button"
        type="file"
        onChange={onChange}
        multiple={true}
      />
    </div>
  );
}
