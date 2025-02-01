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

export interface PostType {
  id: string;
  description: string;
  media?: string[];
  createdAt: Timestamp | Date;
  likes: number;
  mediaType: string;
  uid: string;
  userName: string;
  userProfilePicture: string;
}

const Feed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const fetchPosts = async () => {
    try {
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
            likes: data.likes ?? 0,
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
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <h2 className="mt-4 font-Karla font-extrabold text-2xl">Feeds</h2>
      <div className="h-[85%] hide-scrollbar overflow-y-auto py-4 flex flex-col gap-4">
        {posts?.map((post, i) => (
          <Post key={i} post={post} />
        ))}
      </div>
    </>
  );
};

export default Feed;
