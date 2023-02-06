import React, { useRef, useState } from "react";
import VideoFooter from "../videofooter/VideoFooter";
import VideoSidebar from "../videosidebar/VideoSidebar";
import "./videocard.css";

const VideoCard = ({
  id,
  user__name,
  user__profileImg,
  reel__title,
  reel__src,
  reel__likes,
  time,
  reel__userLoginId,
  reel__location,
}) => {
  const playRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(true);

  const toggleVideoPlayingFunc = () => {
    if (videoPlaying) {
      playRef.current.pause();
      setVideoPlaying(false);
    } else {
      playRef.current.play();
      setVideoPlaying(true);
    }
  };
  return (
    <div className="videoCard__section">
      <video
        className="videoCard__video"
        src={reel__src}
        onClick={toggleVideoPlayingFunc}
        ref={playRef}
      />

      <VideoSidebar id={id} />
      <VideoFooter
        reel__userLoginId={reel__userLoginId}
        user__profileImg={user__profileImg}
        user__name={user__name}
        reel__title={reel__title}
        reel__location={reel__location}
      />
    </div>
  );
};

export default VideoCard;
