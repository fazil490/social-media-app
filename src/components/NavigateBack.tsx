import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

const NavigateBack = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = () => {
    if (location.pathname.includes("/post")) {
      navigate("/home");
    } else {
      navigate(-1);
    }
  };
  return (
    <IoMdArrowRoundBack
      onClick={handleNavigate}
      className="cursor-pointer text-xl"
    />
  );
};

export default NavigateBack;
