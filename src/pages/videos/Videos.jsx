import React, { useState, useEffect } from "react";
import VideoCard from "../../components/video/videocard/VideoCard";
import "./videos.css";
import { fetchReels } from "../../utils/fetchReels";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    fetchReels(setVideos, setLoadingVideos, setIsEmpty);
  }, []);

  return (
    <>
      <section className="videosSection__body">
        {loadingVideos ? (
          <div
            className="itemNotFound text-center"
            style={{ paddingTop: "400px" }}
          >
            Fetching Reels....
          </div>
        ) : isEmpty ? (
          <div
            className="itemNotFound text-center"
            style={{ paddingTop: "400px" }}
          >
            no reels are available
          </div>
        ) : (
          videos.map(
            ({
              id,
              user__name,
              user__profileImg,
              reel__title,
              reel__src,
              reel__likes,
              time,
              reel__userLoginId,
              reel__location,
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
                reel__userLoginId={reel__userLoginId}
                reel__location={reel__location}
              />
            )
          )
        )}
      </section>
    </>
  );
};

export default Videos;
