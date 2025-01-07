import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../components/HomeHeader";
import LogoutModal from "../components/LogoutModal";
import Feed from "../components/Feed";
import ShareModal from "../components/ShareModal";

const Home = () => {
  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate("/new-post");
  };

  return (
    <main className="p-5 relative bg-white lg:rounded-xl h-full overflow-hidden">
      <HomeHeader />
      <div
        onClick={handleCreatePost}
        className="bg-darkGray rounded-full w-fit p-2 cursor-pointer absolute bottom-7 right-7"
      >
        <IoAdd className="text-white text-2xl" />
      </div>
      <LogoutModal />
      <ShareModal />
      <Feed />
    </main>
  );
};

export default Home;
