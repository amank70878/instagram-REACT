import React from "react";
import "./videofooter.css";
import { MusicNote } from "@mui/icons-material";
import { Avatar } from "@mui/material";

const VideoFooter = ({ song__name, user__name }) => {
  return (
    <section className="videofooter__section">
      <div className="videoFooter__nameDiv">
        <Avatar className="videoFooter__avatar" />
        <span className="videoFooter__name">{user__name}</span>
      </div>
      <div className="videoFooter__tickerDiv">
        <MusicNote className="videoFooter__musicSvg" />
        <span className="videoFooter__musicName">{song__name}</span>
      </div>
    </section>
  );
};

export default VideoFooter;
