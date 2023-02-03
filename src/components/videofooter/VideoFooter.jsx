import React from "react";
import { Avatar } from "@mui/material";
import "./videofooter.css";

const VideoFooter = ({ user__profileImg, user__name, reel__title }) => {
  return (
    <section className="videofooter__section">
      <Avatar className="videoFooter__avatar" src={user__profileImg} />
      <div className="videoFooter__Details">
        <span className="videoFooter__name">{user__name}</span>
        <span className="videoFooter__title">{reel__title}</span>
      </div>
    </section>
  );
};

export default VideoFooter;
