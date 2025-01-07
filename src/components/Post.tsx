import { FaRegHeart } from "react-icons/fa";
import img1 from "../assets/splash-screen-bg.png";
import img2 from "../assets/splash-screen-bg2.jpg";
import { RiSendPlaneFill } from "react-icons/ri";
import { useHomeContext } from "../context/HomeContext";
const Post = () => {
  const { openShare } = useHomeContext();
  return (
    <section className="rounded-3xl bg-postBgLav p-4 flex flex-col items-start gap-3">
      <div className="flex items-center gap-2">
        <img
          className="w-10 h-10 rounded-full cursor-pointer"
          src="https://lh3.googleusercontent.com/a/ACg8ocK1zvELb8eOVIWcahi0YB19JkGygQMfaPq5F-gqS0t7Zb2Nu-I=s96-c"
          alt="user-profile-picture"
        />
        <div className="">
          <p className="font-semibold text-base md:text-lg font-Karla">Fazil</p>
          <p className="text-[10px] md:text-xs text-black text-opacity-50 font-KSans">
            2 hours ago
          </p>
        </div>
      </div>
      <div>
        <p className="text-xs md:text-sm font-KSans">
          Just arrived in New York City! Excited to explore the sights, sounds,
          and energy of this amazing place. 🗽 #NYC #Travel
        </p>
      </div>
      <div className="w-full h-[240px] flex gap-2 overflow-x-auto hide-scrollbar">
        <img
          className="w-[270px] object-cover rounded-xl"
          src={img1}
          alt="image1"
        />
        <img
          className="w-[270px] object-cover rounded-xl"
          src={img2}
          alt="image2"
        />
        <img
          className="w-[270px] object-cover rounded-xl"
          src={img1}
          alt="image1"
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <span className="text-likePink flex items-center text-sm gap-1 font-medium cursor-pointer">
          <FaRegHeart className="text-lg" />
          65
        </span>
        <div onClick={openShare} className="bg-black bg-opacity-[0.07] cursor-pointer px-2 py-1 flex items-center gap-1 rounded-3xl">
          <RiSendPlaneFill className="text-xl rounded-full" />
          <span className="text-sm font-Karla font-semibold">Share</span>
        </div>
      </div>
    </section>
  );
};

export default Post;
