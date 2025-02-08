import { IoClose, IoCopyOutline } from "react-icons/io5";
import { useHomeContext } from "../context/HomeContext";
import {
  FaDiscord,
  FaFacebook,
  FaFacebookMessenger,
  FaInstagram,
  FaRedditAlien,
  FaTelegramPlane,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import Social from "./Social";

const socialLinks = [
  {
    name: "Twitter",
    icon: <FaTwitter />,
    bgColor: "#E9F6FB",
    color: "#03A9F4",
  },
  {
    name: "Facebook",
    icon: <FaFacebook />,
    bgColor: "#E7F1FD",
    color: "#1877F2",
  },
  {
    name: "Reddit",
    icon: <FaRedditAlien />,
    bgColor: "#FDECE7",
    color: "#FF5722",
  },
  {
    name: "Discord",
    icon: <FaDiscord />,
    bgColor: "#ECF5FA",
    color: "#6665D2",
  },
  {
    name: "WhatsApp",
    icon: <FaWhatsapp />,
    bgColor: "#E7FBF0",
    color: "#67C15E",
  },
  {
    name: "Messenger",
    icon: <FaFacebookMessenger />,
    bgColor: "#E5F3FE",
    color: "#1E88E5",
  },
  {
    name: "Telegram",
    icon: <FaTelegramPlane />,
    bgColor: "#E6F3FB",
    color: "#1B92D1",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    bgColor: "#fce7f3",
    color: "#f43f5e",
  },
];

const Share = () => {
  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard!");
    });
  };
  const { closeShare, postUrl } = useHomeContext();
  const link = `https://postify-mif.vercel.app/post/${postUrl}`;
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[80%] md:w-1/2 xl:w-[45%] font-KSans">
      <div className="flex items-center justify-between">
        <h2 className="text-lg lg:text-xl font-bold">Share Post</h2>
        <span
          onClick={closeShare}
          className="p-1 hover:bg-lightGrayBg transition-colors duration-300 rounded-full text-2xl cursor-pointer "
        >
          <IoClose />
        </span>
      </div>
      <div className="grid grid-cols-4 my-4 gap-4">
        {socialLinks.map((item, i) => (
          <Social key={i} item={item} link={link} />
        ))}
      </div>
      <div>
        <h3 className="mt-6 mb-3 font-Karla font-semibold">Page Link</h3>
        <div className="bg-zinc-100 font-KSans p-4 rounded-xl flex items-center gap-4">
          <p className="text-xs lg:text-sm truncate">{link}</p>
          <span
            onClick={() => copyToClipboard(link)}
            className="cursor-pointer"
          >
            <IoCopyOutline className="text-xl" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Share;
