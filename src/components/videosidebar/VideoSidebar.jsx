import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import "./videosidebar.css";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "../Drawer";
import { Comments } from "../Comments";
import { db } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";

const VideoSidebar = ({ id, likes }) => {
  const [liked, setLiked] = useState(false);
  const { swipeableDrawer } = useSelector((state) => state.linkedinReducer);
  const dispatch = useDispatch();

  // fetching comments
  const [totalCommentsFetched, setTotalCommentsFetched] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    const fetchingTotalMessages = async () => {
      const q = query(collection(db, `reels/${id}/messages`));
      const docSnap = await getDocs(q);

      if (docSnap._snapshot.docs.size > 0) {
        setTotalCommentsFetched(docSnap._snapshot.docs.size);
      } else {
        setIsEmpty(true);
      }
    };
    fetchingTotalMessages();
  }, [id, dispatch, swipeableDrawer]);

  return (
    <>
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
          <InsertCommentIcon
            onClick={() => {
              dispatch({
                type: "setSwipeableDrawer",
                payload: true,
              });
              dispatch({
                type: "setCommentDrawerId",
                payload: id,
              });
            }}
            className="videoSidebar__svg"
          />
          {isEmpty ? 0 : totalCommentsFetched && totalCommentsFetched}
        </span>
      </section>

      <Drawer component={<Comments />} />
    </>
  );
};

export default VideoSidebar;
