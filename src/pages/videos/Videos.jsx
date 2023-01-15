import React, { useState, useEffect } from "react";
import VideoCard from "../../components/videocard/VideoCard";
import "./videos.css";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  useEffect(() => {
    const fetchMessagesFunc = async () => {
      const result = await getDocs(collection(db, `videos/`));
      setVideos(
        result.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setLoadingVideos(false);
    };
    fetchMessagesFunc();
  }, []);

  return (
    <>
      <section className="videosSection__body">
        {loadingVideos
          ? "loading..."
          : videos.map(
              ({
                user__name,
                url,
                song__name,
                shares,
                likes,
                id,
                comments,
              }) => (
                <VideoCard
                  key={id}
                  url={url}
                  user__name={user__name}
                  song__name={song__name}
                  shares={shares}
                  likes={likes}
                  id={id}
                  comments={comments}
                />
              )
            )}
      </section>
    </>
  );
};

export default Videos;
