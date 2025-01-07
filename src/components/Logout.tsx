import { IoMdLogOut } from "react-icons/io";
import { useHomeContext } from "../context/HomeContext";

const Logout = () => {
  const { openModal } = useHomeContext();

  return (
    <>
      <button onClick={openModal}>
        <IoMdLogOut className="text-2xl hover:text-red-700" />
      </button>
    </>
  );
};

export default Logout;
