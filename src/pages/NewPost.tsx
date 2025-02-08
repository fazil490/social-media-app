import { RootState } from "../redux/store";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavigateBack from "../components/NavigateBack";
import cameraIcon from "../assets/camera_icon.svg";
import photosIcon from "../assets/photos_icon.svg";
import videosIcon from "../assets/videos_icon.svg";
import MediaOption from "../components/MediaOption";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; 
import { Navigation, Pagination } from "swiper/modules"; 
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import {
  addMedia,
  clearPost,
  removeMedia,
  setMediaType,
  updateDescription,
} from "../redux/postSlice";
import { CircularProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const NewPost = () => {
  const [showProgress, setShowProgress] = useState<string>("");
  const postContent = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  const videoRef = useRef<HTMLInputElement>(null);
  const photosRef = useRef<HTMLInputElement>(null);
  const addMorePhotos = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(updateDescription(e.target.value));
  };

  const handleRemoveUrlFromPost = (mediaUrl: string) => {
    dispatch(removeMedia(mediaUrl));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "Photos" | "Video",
    label: string
  ) => {
    dispatch(setMediaType(type));
    setShowProgress(label);

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const files = Array.from(e.target.files);

      if (type === "Photos") {
        files.forEach((file) => uploadToCloudinary(file, type));
      } else if (type === "Video" && files.length === 1) {
        uploadToCloudinary(file, type);
      }
    }
  };

  const uploadToCloudinary = async (file: File, type: string) => {
    if (!file) {
      alert("No file selected!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "user_posts");
    formData.append("chunk_size", "3000000");

    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    if (!cloudName) {
      console.error("Missing Cloudinary Cloud Name!");
      return;
    }
    const url =
      type === "Video"
        ? `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`
        : `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    try {
      const response = await axios.post(url, formData);
      const uploadedUrl = response.data.secure_url;
      dispatch(addMedia(uploadedUrl));
      setShowProgress("");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image.");
      setShowProgress("");
    }
  };

  const isPostHasContent =
    (postContent?.description?.trim()?.length ?? 0) > 0 ||
    (postContent?.media?.length ?? 0) > 0;

  const createPost = async () => {
    setShowProgress("create");
    try {
      const postRef = await addDoc(collection(db, "posts"), {
        ...postContent,
        createdAt: serverTimestamp(),
      });
      await setDoc(postRef, { id: postRef.id }, { merge: true });
      dispatch(clearPost());
      toast("Post Created.");
      setShowProgress("");
    } catch (error) {
      setShowProgress("");
      console.log("Failed to create a post!", error);
      toast("Post creation failed!");
    }
  };

  return (
    <main className="relative h-full p-4 overflow-hidden overflow-y-auto hide-scrollbar bg-white lg:rounded-xl shadow-md">
      <div className="flex items-center gap-3">
        <NavigateBack />
        <span className="font-Karla font-extrabold text-xl">New Post</span>
      </div>
      {postContent?.media?.length > 0 && (
        <>
          {postContent?.mediaType === "Photos" ? (
            <div className="w-3/4 mx-auto my-4 h-[35%]">
              <Swiper
                className="w-full h-full rounded-lg"
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
              >
                {postContent.media.map((mediaUrl, index) => (
                  <SwiperSlide className="relative" key={index}>
                    <img
                      src={typeof mediaUrl === "string" ? mediaUrl : undefined}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full rounded-lg object-contain"
                    />
                    <div
                      onClick={() => handleRemoveUrlFromPost(mediaUrl)}
                      className="absolute top-3 right-3 z-20 cursor-pointer text-xl p-1 bg-white rounded-full"
                    >
                      <FaTrash />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : postContent?.mediaType === "Video" ? (
            <div className="w-3/4 mx-auto my-4 h-[35%] relative">
              <video
                src={postContent.media[0]}
                className="w-full h-full rounded-lg object-contain"
                controls
                autoPlay
              />
              <div
                onClick={() => handleRemoveUrlFromPost(postContent.media[0])}
                className="absolute top-3 right-3 z-20 cursor-pointer text-xl p-1 bg-white rounded-full"
              >
                <FaTrash />
              </div>
            </div>
          ) : null}
          {postContent?.mediaType === "Photos" ? (
            <div
              onClick={() =>
                addMorePhotos.current && addMorePhotos.current.click()
              }
              className="my-2"
            >
              <MediaOption
                showProgress={showProgress}
                iconSrc={photosIcon}
                label="Add more photos"
              />
            </div>
          ) : null}
        </>
      )}
      <textarea
        value={postContent?.description || ""}
        onChange={(e) => handleDescriptionChange(e)}
        placeholder="What's on your mind?"
        className="h-[30%] w-full resize-none outline-none my-4 rounded-xl p-4 text-darkGray bg-lightGrayBg bg-opacity-60"
      />
      {postContent?.media?.length > 0 ? null : (
        <div className="flex flex-col items-start gap-2">
          <div
            onClick={() =>
              !showProgress && photosRef.current && photosRef.current.click()
            }
          >
            <MediaOption
              showProgress={showProgress}
              iconSrc={photosIcon}
              label="Photos"
            />
          </div>
          <div
            onClick={() =>
              !showProgress && videoRef.current && videoRef.current.click()
            }
          >
            <MediaOption
              showProgress={showProgress}
              iconSrc={videosIcon}
              label="Video"
            />
          </div>
          <div
            onClick={() =>
              !showProgress && cameraRef.current && cameraRef.current.click()
            }
          >
            <MediaOption
              showProgress={showProgress}
              iconSrc={cameraIcon}
              label="Camera"
            />
          </div>
        </div>
      )}

      <>
        <input
          className="hidden"
          ref={photosRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileChange(e, "Photos", "Photos")}
        />
        <input
          className="hidden"
          ref={addMorePhotos}
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          onChange={(e) => handleFileChange(e, "Photos", "Add more photos")}
        />
        <input
          className="hidden"
          ref={videoRef}
          type="file"
          accept="video/*"
          onChange={(e) => handleFileChange(e, "Video", "Video")}
        />
        <input
          className="hidden"
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => handleFileChange(e, "Photos", "Camera")}
        />
      </>
      <div className="absolute bottom-3 w-full flex justify-center">
        <button
          onClick={createPost}
          disabled={!isPostHasContent}
          className={`transition-colors w-3/4 mx-auto duration-300 ${
            isPostHasContent
              ? "bg-black text-white"
              : "bg-lightGrayBg text-zinc-500"
          } font-Karla font-bold p-3 rounded-3xl`}
        >
          {showProgress === "create" ? (
            <CircularProgress color="inherit" size={17} />
          ) : (
            "CREATE"
          )}
        </button>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        theme="dark"
        pauseOnHover={false}
      />
    </main>
  );
};

export default NewPost;
