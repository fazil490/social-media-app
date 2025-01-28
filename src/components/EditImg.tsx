import { ChangeEvent, useRef } from "react";
import { HiPencil } from "react-icons/hi";
import axios from "axios";

interface EditImgProps {
  onUploadComplete: (url: string) => void;
  setShowProgress: React.Dispatch<React.SetStateAction<string>>;
  imageType: "cover" | "profile";
}

const EditImg: React.FC<EditImgProps> = ({
  onUploadComplete,
  setShowProgress,
  imageType,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      uploadImageToCloudinary(file);
    }
  };

  const uploadImageToCloudinary = async (file: File) => {
    setShowProgress(imageType);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "images");
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        formData
      );
      const uploadedUrl = response.data.secure_url;
      setShowProgress("");
      onUploadComplete(uploadedUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image.");
      setShowProgress("");
    }
  };

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <div
        onClick={handleIconClick}
        className="bg-white shadow-md rounded-full p-1 text-2xl text-zinc-500 cursor-pointer w-fit"
      >
        <HiPencil />
      </div>
      <input
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
        type="file"
        accept="image/*"
      />
    </>
  );
};

export default EditImg;
