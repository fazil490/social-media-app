import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CreatePostFloatingBtn = () => {
  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate("/new-post");
  };
  return (
    <div
      onClick={handleCreatePost}
      className="bg-darkGray rounded-full w-fit p-2 cursor-pointer absolute bottom-11 right-11"
    >
      <IoAdd className="text-white text-2xl" />
    </div>
  );
};

export default CreatePostFloatingBtn;
