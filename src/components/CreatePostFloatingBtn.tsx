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
      className="bg-darkGray rounded-full w-fit p-3 cursor-pointer absolute bottom-16 right-7"
    >
      <IoAdd className="text-white text-4xl" />
    </div>
  );
};

export default CreatePostFloatingBtn;
