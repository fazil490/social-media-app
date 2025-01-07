import React from "react";
import { useHomeContext } from "../context/HomeContext";
import Share from "./share";

const ShareModal = () => {
  const { isShareModalOpen } = useHomeContext();
  return (
    <div
      className={`${
        isShareModalOpen ? "top-0 right-0" : "-right-[800px] top-0"
      } transition-all duration-300 absolute lg:rounded-xl z-30 flex items-center justify-center bg-black w-full h-full bg-opacity-70`}
    >
        <Share />
    </div>
  );
};

export default ShareModal;
