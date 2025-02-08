import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { PostType } from "./Feed";
import { CircularProgress } from "@mui/material";
import { FaHeart, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface MyPostProps {
  userId: string;
}

const MyPosts: React.FC<MyPostProps> = ({ userId }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(posts);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const postRef = collection(db, "posts");
      const q = query(postRef, where("uid", "==", userId));
      const querySnapshot = await getDocs(q);

      const userPosts: PostType[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PostType[];

      setPosts(userPosts);
    } catch (error) {
      console.log("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToPost = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  return (
    <main className={`my-4 ${loading && "flex items-center justify-center"}`}>
      {loading ? (
        <CircularProgress className="my-4" color="inherit" size={24} />
      ) : posts.length > 0 ? (
        <div className="flex items-start justify-center gap-10 flex-wrap cursor-pointer">
          {posts?.map((post) => (
            <div
              onClick={() => handleNavigateToPost(post?.id)}
              className="relative w-full md:w-48"
            >
              {post?.media && post?.media?.length > 1 && (
                <div className="absolute top-2 right-2 bg-white rounded-lg px-2 text-xs font-medium font-KSans">
                  1/{post?.media?.length}
                </div>
              )}
              {post?.media && post.mediaType === "Photos" ? (
                <img
                  className="w-full h-48 object-cover rounded-lg"
                  src={post.media[0]}
                  alt="post_thumbnail"
                />
              ) : post?.media && post.mediaType === "Video" ? (
                <div className="relative w-full h-48 bg-black rounded-lg overflow-hidden">
                  <video
                    className="w-full h-48 object-cover"
                    src={post.media[0]}
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <FaPlay className="text-white text-2xl" />
                  </div>
                </div>
              ) : null}
              <div className="absolute z-10 left-3 bottom-3 text-sm flex flex-col items-start gap-1 text-white font-KSans">
                <span className="text-xs">{post?.description}</span>
                <span className="flex items-center gap-1">
                  <FaHeart />
                  {post?.likes?.length}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No posts found!</p>
      )}
    </main>
  );
};

export default MyPosts;
