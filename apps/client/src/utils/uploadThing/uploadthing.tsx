import { generateUploadButton, generateReactHelpers } from "@uploadthing/react";

const uploadUrl = `${import.meta.env.VITE_BACKEND_URL}/api/uploadthing`;
console.log("Upload URL:", uploadUrl);

export const UploadButton = generateUploadButton({
  url: uploadUrl,
});

export const { useUploadThing } = generateReactHelpers({
  url: uploadUrl,
});
