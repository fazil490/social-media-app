import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
const HomeHeader = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user);
  console.log(user);

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {user.photoUrl && (
          <img
          onClick={() => navigate('/profile')}
            className="w-14 h-14 rounded-full cursor-pointer"
            src={user?.photoUrl}
            alt="user-profile-picture"
          />
        )}
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
