import { useState } from "react";
import { useUploadThing } from "../../utils/uploadThing";

type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files?.length < 1) {
      console.log("No files selected");
      return;
    }

    const selectedFiles = Array.from(e.target.files);
    console.log("selected files", selectedFiles);
    // const result = await $ut.startUpload(selectedFiles);

    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    const result = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/files/upload`,
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to upload files");
      }
      return res.json();
    });

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      // multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      multiple: ($ut.routeConfig?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

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
  const [, setUploadComplete] = useState(false);
  // const router = useRouter();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      window.alert("Upload started");
    },
    onUploadError(error) {
      console.log(`Upload failed: ${error.message}`);
    },
    onClientUploadComplete() {
      console.log("Upload complete");
      setUploadComplete((prev) => !prev);
      // router.refresh();
    },
  });

  return (
    <div>
      <label htmlFor="upload-button" className="cursor-pointer">
        <UploadSVG />
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
        multiple={true}
      />
    </div>
  );
}
