import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import "./videosidebar.css";

const VideoSidebar = ({ likes, comments }) => {
  const [liked, setLiked] = useState(false);

  return (
    <section className="videoSidebar__section">
      <span className="videoSidebar__span">
        {liked ? (
          <FavoriteIcon
            className="videoSidebar__svg"
            onClick={() => setLiked(false)}
          />
        ) : (
          <FavoriteBorderIcon
            className="videoSidebar__svg"
            onClick={() => setLiked(true)}
          />
        )}
        {likes}
      </span>
      <span className="videoSidebar__span">
        <InsertCommentIcon className="videoSidebar__svg" />
        {comments}
      </span>
    </section>
  );
};

export default VideoSidebar;
