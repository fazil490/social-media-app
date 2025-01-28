import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const NavigateBack = () => {
  const navigate = useNavigate();
  return (
    <IoMdArrowRoundBack
      onClick={() => navigate(-1)}
      className="cursor-pointer text-xl"
    />
  );
};

export default NavigateBack;
