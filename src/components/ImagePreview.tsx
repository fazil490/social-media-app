import { Dispatch, SetStateAction } from "react";

const ImagePreview = ({
  url,
  setShowPreview,
}: {
  url: string;
  setShowPreview: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <section
      onClick={() => setShowPreview("")}
      className={`${
        url ? "opacity-100 z-30" : "opacity-0 -z-30"
      } transition-opacity duration-300 absolute inset-0 max-h-full bg-black bg-opacity-70 flex items-center lg:rounded-xl justify-center`}
    >
      <img
        className="max-w-[90%] max-h-[90%] object-contain"
        src={url}
        alt="image_preview"
      />
    </section>
  );
};

export default ImagePreview;
