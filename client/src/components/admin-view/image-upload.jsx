import React, { useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (event) => {
    console.log("files log >>", event.target.files);

    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Upload Image </Label>
      <div>
        <Input
          id="image-upload"
          type="file"
          //   className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        ></Input>
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-"
          ></Label>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
