import { RootState } from "../redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

interface PostContent {
  description: string;
  media: (string | File)[];
  uid: string | undefined | null;
  userName: string | undefined | null;
  userProfilePicture: string | undefined | null;
  likes: number;
}

const NewPost = () => {
  const user = useSelector((state: RootState) => state.user);

  const [postContent, setPostContent] = useState<PostContent>({
    description: "",
    media: [],
    uid: user?.uid,
    userName: user?.name,
    userProfilePicture: user?.photoUrl,
    likes: 0,
  });
  console.log("content", postContent);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostContent((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video"
  ) => {
    const files = e.target.files;
    if (files) {
      console.log(files);

      const fileArray = Array.from(files);
      console.log(fileArray);
    }
  };
  return (
    <div>
      <input
        onChange={handleDescriptionChange}
        type="text"
        placeholder="Write a post..."
      />
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFileChange(e, "image")}
      />
      <input
        multiple
        type="file"
        accept="video/*"
        onChange={(e) => handleFileChange(e, "video")}
      />
    </div>
  );
};

export default NewPost;
