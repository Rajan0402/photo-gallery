import { useRef } from "react";

export const UploadBtn = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input type="file" ref={inputRef} hidden />
      {/* <Button></Button> */}
    </div>
  );
};
