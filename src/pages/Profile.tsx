import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import coverImgPlaceholder from "../assets/coverImgPlaceholder.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import userPlaceholder from "../assets/userPlaceholder.jpg";
import EditImg from "../components/EditImg";
import React, { ChangeEvent, useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { setUser } from "../redux/userSlice";
import { toast, ToastContainer } from "react-toastify";
import { CircularProgress } from "@mui/material";
import CreatePostFloatingBtn from "../components/CreatePostFloatingBtn";
import ImagePreview from "../components/ImagePreview";
import { setUserDetails } from "../redux/postSlice";
import MyPosts from "../components/MyPosts";

interface User {
  bio: string;
  coverImg: string;
  email?: string;
  isAuthenticated?: boolean;
  name: string;
  photoUrl: string;
  uid: string;
}

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user) as User;
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showProgress, setShowProgress] = useState<string>("");
  const [changesHappened, setChangesHappened] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<string>("");
  const [userInfo, setUserInfo] = useState<User>({
    uid: user?.uid,
    bio: user?.bio,
    coverImg: user?.coverImg,
    name: user?.name,
    photoUrl: user?.photoUrl,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (
    key: keyof User,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setUserInfo((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleUploadComplete = (url: string, type: "photoUrl" | "coverImg") => {
    setUserInfo((prev) => ({
      ...prev,
      [type]: url,
    }));
    setChangesHappened(true);
  };

  const handleUserInfoEdit = async () => {
    if (
      user?.bio != userInfo?.bio ||
      user?.name != userInfo?.name ||
      user?.coverImg != userInfo?.coverImg ||
      user?.photoUrl != userInfo?.photoUrl
    ) {
      setShowProgress("save");
      try {
        const userDocRef = doc(db, "users", userInfo.uid);

        await updateDoc(userDocRef, {
          bio: userInfo.bio,
          coverImg: userInfo.coverImg,
          name: userInfo.name,
          photoUrl: userInfo.photoUrl,
        });
        dispatch(setUser(userInfo));
        dispatch(
          setUserDetails({
            uid: userInfo.uid,
            userName: userInfo.name || "",
            userProfilePicture: userInfo.photoUrl || "",
          })
        );
        toast("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating user info:", error);
        toast("Failed to update profile. Please try again.");
      }
      setShowProgress("");
      setChangesHappened(false);
    }
  };

  const handleBackBtn = () => {
    if (showEdit) {
      setShowEdit(false);
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    const hasChanges =
      user?.bio != userInfo?.bio ||
      user?.name != userInfo?.name ||
      user?.coverImg != userInfo?.coverImg ||
      user?.photoUrl != userInfo?.photoUrl;

    setChangesHappened(hasChanges);
  }, [user, userInfo]);

  return (
    <main className="relative h-full">
      <section className="h-full overflow-y-auto hide-scrollbar shadow-md bg-white lg:rounded-xl">
        <div className="relative">
          <img
            onClick={() =>
              userInfo?.coverImg && setShowPreview(userInfo?.coverImg)
            }
            className="cursor-pointer w-full max-h-56 md:max-h-60 object-cover rounded-b-xl lg:rounded-xl"
            src={userInfo?.coverImg ? userInfo?.coverImg : coverImgPlaceholder}
            alt="cover-img"
          />
          {showProgress === "cover" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <CircularProgress size={24} color="info" />
            </div>
          )}

          <div
            className={`${
              showEdit ? "opacity-100" : "opacity-0 -z-30"
            } transition-opacity duration-300 absolute bottom-5 right-5`}
          >
            <EditImg
              onUploadComplete={(url) => handleUploadComplete(url, "coverImg")}
              setShowProgress={setShowProgress}
              imageType="cover"
            />
          </div>

          <div className="absolute top-0 m-3 text-xl text-white flex items-center gap-1">
            <IoMdArrowRoundBack
              onClick={handleBackBtn}
              className="cursor-pointer"
            />
            <span className="font-Karla font-bold">Edit Profile</span>
          </div>
          <div className="absolute -bottom-12 left-6 md:left-12">
            <img
              onClick={() =>
                userInfo?.photoUrl && setShowPreview(userInfo?.photoUrl)
              }
              className="cursor-pointer rounded-full w-24 lg:w-28 h-24 lg:h-28 object-cover shadow-lg"
              src={userInfo?.photoUrl ? userInfo?.photoUrl : userPlaceholder}
              alt="profile-picture"
            />
            {showProgress === "profile" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <CircularProgress size={24} color="info" />
              </div>
            )}
            <div
              className={`${
                showEdit ? "opacity-100" : "opacity-0 -z-30"
              } transition-opacity duration-300 absolute bottom-0 right-0`}
            >
              <EditImg
                onUploadComplete={(url) =>
                  handleUploadComplete(url, "photoUrl")
                }
                setShowProgress={setShowProgress}
                imageType="profile"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end w-full">
          <button
            onClick={() => setShowEdit(true)}
            className={`${
              !showEdit ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300 p-1 mr-7 mt-1 w-1/2 cursor-pointer font-Karla font-bold text-lg border-2 border-black border-opacity-35 rounded-3xl`}
          >
            Edit Profile
          </button>
        </div>
        <section>
          {showEdit ? (
            <>
              <div className="flex flex-col gap-3 font-KSans px-4 py-8">
                <div>
                  <p>Name</p>
                  <input
                    onChange={(e) =>
                      handleInputChange(e.target.name as keyof User, e)
                    }
                    name="name"
                    value={userInfo?.name || ""}
                    className="text-lg font-semibold outline-none border-b-2 transition-all duration-300 focus:border-darkGray focus:border-opacity-50 bg-inherit py-2 w-full"
                  />
                </div>
                <div>
                  <p>Bio</p>
                  <input
                    onChange={(e) =>
                      handleInputChange(e.target.name as keyof User, e)
                    }
                    name="bio"
                    value={userInfo?.bio || ""}
                    className="text-lg font-semibold outline-none border-b-2 transition-all duration-300 focus:border-darkGray focus:border-opacity-50 bg-inherit py-2 w-full"
                  />
                </div>
              </div>
              <div className="absolute bottom-5 w-full flex justify-center">
                <button
                  disabled={!changesHappened}
                  onClick={handleUserInfoEdit}
                  className={` transition-colors w-3/4 mx-auto duration-300 ${
                    changesHappened
                      ? "bg-black text-white"
                      : "bg-lightGrayBg text-zinc-500"
                  }  font-Karla font-bold p-3 rounded-3xl`}
                >
                  {showProgress === "save" ? (
                    <CircularProgress color="inherit" size={17} />
                  ) : (
                    "SAVE"
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="px-4 py-8">
              <h2 className="text-xl lg:text-2xl font-Karla font-extrabold">
                {user?.name}
              </h2>
              <p className="my-2 lg:text-lg">{user?.bio}</p>
            </div>
          )}
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            theme="dark"
            pauseOnHover={false}
          />
        </section>
        {!showEdit && (
          <section className="px-4">
            <h2 className="text-lg font-Karla font-medium">My Posts</h2>
            <MyPosts userId={user?.uid} />
          </section>
        )}
        <div
          className={`${
            showEdit ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
        >
          <CreatePostFloatingBtn />
        </div>
        <ImagePreview url={showPreview} setShowPreview={setShowPreview} />
      </section>
    </main>
  );
};

export default Profile;
