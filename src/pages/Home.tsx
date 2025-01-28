import HomeHeader from "../components/HomeHeader";
import LogoutModal from "../components/LogoutModal";
import Feed from "../components/Feed";
import ShareModal from "../components/ShareModal";
import CreatePostFloatingBtn from "../components/CreatePostFloatingBtn";

const Home = () => {
  return (
    <main className="p-5 relative bg-white lg:rounded-xl h-full overflow-hidden shadow-md">
      <HomeHeader />
      <CreatePostFloatingBtn />
      <LogoutModal />
      <ShareModal />
      <Feed />
    </main>
  );
};

export default Home;
