import { FaHeart, FaRegHeart } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { useHomeContext } from "../context/HomeContext";
import { PostType } from "./Feed";
import { useEffect, useRef, useState } from "react";
import ImagePreview from "./ImagePreview";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  arrayRemove,
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [showPreview, setShowPreview] = useState<string>("");
  const {
    id,
    description,
    media,
    createdAt,
    likes,
    userName,
    userProfilePicture,
    mediaType,
  } = post;
  const { openShare, setPostUrl } = useHomeContext();

  const [like, setLike] = useState<string[]>(post?.likes || []);
  const userId = useSelector((state: RootState) => state.user.uid);

  const formatDate = (createdAt: Timestamp | Date): string => {
    const date =
      createdAt instanceof Timestamp ? createdAt.toDate() : createdAt;

    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const handleLike = async () => {
    if (!userId) return;
    const postRef = doc(db, "posts", post.id);
    const isLiked = likes?.includes(userId);

    try {
      if (isLiked) {
        setLike((prevlikes) => prevlikes.filter((id) => id !== userId));
        await updateDoc(postRef, {
          likes: arrayRemove(userId),
        });
      } else {
        setLike((prevLikes) => [...prevLikes, userId]);
        await updateDoc(postRef, {
          likes: arrayUnion(userId),
        });
      }
    } catch (error) {
      console.error("Error updating likes", error);
    }
  };

  const handleShare = (url: string) => {
    setPostUrl(url);
    openShare();
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoElement) {
            if (entry.isIntersecting) {
              videoElement.play(); // Play when visible
            } else {
              videoElement.pause(); // Pause when out of view
            }
          }
        });
      },
      { threshold: 0.7 } // Trigger when 70% of video is visible
    );

    if (videoElement) observer.observe(videoElement);

    return () => {
      if (videoElement) observer.unobserve(videoElement);
    };
  }, []);

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
            {formatDate(createdAt)}
          </p>
        </div>
      </div>
      <div>
        <p className="text-xs md:text-sm font-KSans">{description}</p>
      </div>
      <div
        className={`w-full h-[240px] ${
          media && media?.length > 0 && "flex"
        } gap-2 overflow-x-auto hide-scrollbar`}
      >
        {media && media?.length > 0 && (
          <>
            {mediaType === "Photos" ? (
              media?.map((media, i) => (
                <img
                  onClick={() => media && setShowPreview(media)}
                  key={i}
                  className={`${
                    media && media?.length > 1 ? "w-full" : "w-full"
                  } h-full object-contain rounded-xl`}
                  src={media}
                  alt={`media${i}`}
                />
              ))
            ) : mediaType === "Video" ? (
              <video
                ref={videoRef}
                src={media[0]}
                className="w-full h-full rounded-xl object-contain"
                controls
                muted
              />
            ) : null}
          </>
        )}
      </div>
      <div className="flex items-center justify-between w-full">
        <span
          onClick={handleLike}
          className="text-likePink flex items-center text-sm gap-1 font-medium cursor-pointer"
        >
          {like?.includes(userId ?? "") ? (
            <FaHeart className="text-lg" />
          ) : (
            <FaRegHeart className="text-lg" />
          )}
          {like?.length}
        </span>
        <div
          onClick={() => handleShare(id)}
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
