import { useEffect, useState } from "react";
import Post from "./Post";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { CircularProgress } from "@mui/material";

export interface PostType {
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

const Feed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [progress, setProgress] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      setProgress(true);
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const postsArray: PostType[] = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();

          return {
            id: doc.id,
            description: data.description ?? "",
            media: data.media ?? [],
            createdAt: data.createdAt,
            likes: data.likes ?? [],
            mediaType: data.mediaType ?? "",
            uid: data.uid ?? "",
            userName: data.userName ?? "Unknown",
            userProfilePicture: data.userProfilePicture ?? "",
          };
        }
      );
      setPosts(postsArray);
    } catch (error) {
      console.error("Error fetching posts!", error);
    } finally {
      setProgress(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <h2 className="mt-4 font-Karla font-extrabold text-2xl">Feeds</h2>
      <div
        className={`h-[85%] ${
          progress && "items-center justify-center"
        } hide-scrollbar overflow-y-auto py-4 flex flex-col gap-4`}
      >
        {progress ? (
          <CircularProgress color="inherit" size={33} />
        ) : (
          <>
            {" "}
            {posts?.map((post, i) => (
              <Post key={i} post={post} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Feed;
