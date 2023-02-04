import React, { useState, useEffect } from "react";
import VideoCard from "../../components/video/videocard/VideoCard";
import "./videos.css";
import { fetchReels } from "../../utils/fetchReels";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  useEffect(() => {
    fetchReels(setVideos, setLoadingVideos);
  }, []);

  return (
    <>
      <section className="videosSection__body">
        {loadingVideos
          ? "loading..."
          : videos.map(
              ({
                id,
                user__name,
                user__profileImg,
                reel__title,
                reel__src,
                reel__likes,
                time,
              }) => (
                <VideoCard
                  key={id}
                  id={id}
                  user__name={user__name}
                  user__profileImg={user__profileImg}
                  reel__title={reel__title}
                  reel__src={reel__src}
                  reel__likes={reel__likes}
                  time={time}
                />
              )
            )}
      </section>
    </>
  );
};

export default Videos;
