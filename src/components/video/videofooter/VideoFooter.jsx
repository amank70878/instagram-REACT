import React from "react";
import { Avatar } from "@mui/material";
import "./videofooter.css";
import { Link } from "react-router-dom";

const VideoFooter = ({
  user__profileImg,
  user__name,
  reel__title,
  reel__userLoginId,
  reel__location,
}) => {
  return (
    <section className="videofooter__section">
      <Link to={`/home/${reel__userLoginId}`}>
        <Avatar className="videoFooter__avatar" src={user__profileImg} />
      </Link>
      <div className="videoFooter__Details">
        <Link to={`/home/${reel__userLoginId}`}>
          <span className="videoFooter__name">
            {user__name}{" "}
            <span className="videoFooter__location">({reel__location})</span>
          </span>
        </Link>
        <span className="videoFooter__title">{reel__title}</span>
      </div>
    </section>
  );
};

export default VideoFooter;
