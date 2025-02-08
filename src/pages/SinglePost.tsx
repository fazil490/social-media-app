import { useParams } from "react-router-dom";
import NavigateBack from "../components/NavigateBack";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Post from "../components/Post";

interface Post {
  id: string;
  description: string;
  media?: string[];
  createdAt: Timestamp | Date;
  likes: string[];
  mediaType: string;
  uid: string;
  userName: string;
  userProfilePicture: string;
}

const SinglePost = () => {
  const { post_id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!post_id) return;
      try {
        const postRef = doc(db, "posts", post_id);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
          setPost(postSnap.data() as Post);
        } else {
          console.log("Post not found!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [post_id]);

  return (
    <main className="p-5 relative bg-white lg:rounded-xl h-full overflow-hidden shadow-md">
      <div className="flex items-center gap-3">
        <NavigateBack />
        <span className="font-Karla font-extrabold text-xl">Post</span>
      </div>
      <div
        className={`h-[85%] ${
          loading && "items-center justify-center"
        } hide-scrollbar overflow-y-auto py-4 flex flex-col gap-4`}
      >
        {loading ? (
          <CircularProgress color="inherit" size={33} />
        ) : (
          post && <Post post={post} />
        )}
      </div>
    </main>
  );
};

export default SinglePost;
