const Social: React.FC<{
  item: { name: string; icon: JSX.Element; bgColor: string; color: string };
  link: string;
}> = ({ item, link }) => {
    const handleRedirect = () => {
    let shareUrl = "";

    switch (item?.name?.toLowerCase()) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          link
        )}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          link
        )}`;
        break;
      case "reddit":
        shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(link)}`;
        break;
      case "discord":
        // Discord doesn't have a direct share link mechanism; you can leave this case empty or add a default action.
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          link
        )}`;
        break;
      case "messenger":
        shareUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
          link
        )}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}`;
        break;
      case "instagram":
        // Instagram doesn't support direct link sharing like this; you may provide a placeholder.
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <div
      onClick={handleRedirect}
      className="flex flex-col items-center justify-center gap-2 cursor-pointer"
    >
      <div
        style={{ backgroundColor: item?.bgColor, color: item?.color }}
        className={`rounded-full p-[14px] w-fit text-3xl`}
      >
        {item?.icon}
      </div>
      <span className="font-KSans text-xs">{item?.name}</span>
    </div>
  );
};

export default Social;
