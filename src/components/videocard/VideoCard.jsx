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
  reel__comments,
  time,
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

      <VideoSidebar likes={reel__likes} comments={reel__comments} />
      <VideoFooter
        user__profileImg={user__profileImg}
        user__name={user__name}
        reel__title={reel__title}
      />
    </div>
  );
};

export default VideoCard;
