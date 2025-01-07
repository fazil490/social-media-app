import Post from "./Post";

const Feed = () => {
  return (
    <>
      <h2 className="mt-4 font-Karla font-extrabold text-2xl">Feeds</h2>
      <div className="h-[85%] hide-scrollbar overflow-y-auto py-4 flex flex-col gap-4">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </>
  );
};

export default Feed;
