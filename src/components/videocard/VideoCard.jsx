import React, { useRef, useState } from "react";
import VideoFooter from "../videofooter/VideoFooter";
import VideoSidebar from "../videosidebar/VideoSidebar";
import "./videocard.css";

const VideoCard = ({
  url,
  user__name,
  song__name,
  shares,
  likes,
  comments,
}) => {
  const playRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

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
        src={url}
        onClick={toggleVideoPlayingFunc}
        ref={playRef}
      />

      <VideoSidebar likes={likes} comments={comments} shares={shares} />
      <VideoFooter song__name={song__name} user__name={user__name} />
    </div>
  );
};

export default VideoCard;
