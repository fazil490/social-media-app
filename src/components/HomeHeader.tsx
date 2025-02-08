import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import userPlaceholder from "../assets/userPlaceholder.jpg";

const HomeHeader = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  console.log(user);

  return (
    <header className="flex items-center justify-between">
      <div
        onClick={() => navigate("/profile")}
        className="flex items-center gap-2"
      >
        <img
          className="w-14 h-14 rounded-full cursor-pointer object-cover"
          src={user?.photoUrl ? user?.photoUrl : userPlaceholder}
          alt="user-profile"
        />
        <div className="font-KSans">
          <p className="text-xs md:text-sm text-black text-opacity-50">
            Welcome Back,
          </p>
          <p className="font-semibold text-base md:text-lg">{user?.name}</p>
        </div>
      </div>
      <Logout />
    </header>
  );
};

export default HomeHeader;
