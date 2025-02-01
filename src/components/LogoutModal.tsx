import { useHomeContext } from "../context/HomeContext";
import { logOut } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAll } from "../redux/postSlice";
const LogoutModal = () => {
  const { isLogoutModalOpen, closeModal } = useHomeContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(clearAll());
    navigate("/");
    closeModal();
  };
  return (
    <div
      className={`${
        isLogoutModalOpen ? "inset-0" : "-top-[1500px] right-0 left-0"
      } transition-all duration-300 absolute lg:rounded-x z-30 flex items-center justify-center bg-black w-full h-full bg-opacity-70`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-[80%] md:w-1/2 xl:w-[45%] text-center font-KSans">
        <h2 className="text-lg font-medium mb-4">
          Are you sure you want to log out?
        </h2>
        <div className="flex items-center justify-center text-sm gap-5 mt-4">
          <button
            onClick={closeModal}
            className="transition-colors duration-300 bg-darkGray hover:bg-zinc-700 text-white rounded px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleLogOut}
            className="transition-colors duration-300 bg-lightGrayBg hover:bg-zinc-400 hover:text-white rounded px-4 py-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
