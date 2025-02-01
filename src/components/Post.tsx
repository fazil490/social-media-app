import { FaRegHeart } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { useHomeContext } from "../context/HomeContext";
import { PostType } from "./Feed";
import { useState } from "react";
import ImagePreview from "./ImagePreview";

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [showPreview, setShowPreview] = useState<string>("");
  const {
    description,
    media,
    createdAt,
    likes,
    userName,
    userProfilePicture,
    mediaType,
  } = post;
  const { openShare, setPostUrl } = useHomeContext();
  // const handleShareClick = (url: string) => {
  //   setPostUrl(`https://yourwebsite.com/posts/${url}`);
  //   openShare();
  // };
  return (
    <section className="rounded-3xl bg-postBgLav p-4 flex flex-col items-start gap-3">
      <div className="flex items-center gap-2">
        <img
          className="w-10 h-10 rounded-full cursor-pointer object-cover"
          src={userProfilePicture}
          alt="user-profile-picture"
        />
        <div className="">
          <p className="font-semibold text-base md:text-lg font-Karla">
            {userName}
          </p>
          <p className="text-[10px] md:text-xs text-black text-opacity-50 font-KSans">
            2 hours ago
          </p>
        </div>
      </div>
      <div>
        <p className="text-xs md:text-sm font-KSans">{description}</p>
      </div>
      <div className="w-full h-[240px] flex gap-2 overflow-x-auto hide-scrollbar">
        {media && media?.length > 0 && (
          <>
            {mediaType === "Photos" ? (
              media?.map((media, i) => (
                <img
                  onClick={() => media && setShowPreview(media)}
                  key={i}
                  className="w-[270px] object-cover rounded-xl"
                  src={media}
                  alt={`media${i}`}
                />
              ))
            ) : mediaType === "Video" ? (
              <video
                src={media[0]}
                className="w-full h-full rounded-lg object-contain"
                controls
                autoPlay
              />
            ) : null}
          </>
        )}
      </div>
      <div className="flex items-center justify-between w-full">
        <span className="text-likePink flex items-center text-sm gap-1 font-medium cursor-pointer">
          <FaRegHeart className="text-lg" />
          {likes}
        </span>
        <div
          onClick={openShare}
          className="bg-black bg-opacity-[0.07] cursor-pointer px-2 py-1 flex items-center gap-1 rounded-3xl"
        >
          <RiSendPlaneFill className="text-xl rounded-full" />
          <span className="text-sm font-Karla font-semibold">Share</span>
        </div>
      </div>
      <ImagePreview url={showPreview} setShowPreview={setShowPreview} />
    </section>
  );
};

export default Post;
