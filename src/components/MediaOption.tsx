import { CircularProgress } from "@mui/material";

interface MediaOptionProps {
  iconSrc: string;
  label: string;
  showProgress: string;
}

const MediaOption: React.FC<MediaOptionProps> = ({
  showProgress,
  iconSrc,
  label,
}) => {
  return (
    <div
      className={`${
        showProgress && showProgress !== label ? "hidden" : ""
      } flex items-center gap-2 cursor-pointer font-bold font-KSans`}
    >
      <img className="object-cover" src={iconSrc} alt="icon" />
      <span>{label}</span>
      <span
        className={`${
          showProgress === label ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <CircularProgress size={13} />
      </span>
    </div>
  );
};

export default MediaOption;
