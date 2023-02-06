import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import "./videosidebar.css";
import { useDispatch, useSelector } from "react-redux";
import LoginIcon from "@mui/icons-material/Login";
import Drawer from "../../Drawer";
import { Comments } from "../../Comments";
import { db } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { addlike } from "../../../utils/addlike";
import { useNavigate } from "react-router-dom";

const VideoSidebar = ({ id }) => {
  // redux
  const { swipeableDrawer } = useSelector((state) => state.instaReducer);
  const { users } = useSelector((state) => state.instaReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // fetching likes
  const [totalLikes, setTotalLikes] = useState("");
  const [reload, setReload] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchAllLikes();
  }, [id, dispatch, reload, setReload]);

  const fetchAllLikes = async () => {
    // fetch all likes
    const q = query(collection(db, `reels/${id}/likes`));
    const docSnap = await getDocs(q);
    setTotalLikes(docSnap._snapshot.docs.size);

    // fetch current user like
    if (users) {
      const docSnap1 = await getDocs(
        query(
          collection(db, `reels/${id}/likes`),
          where("likedBy__email", "==", `${users.user__email}`)
        )
      );
      if (docSnap1._snapshot.docs.size > 0) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  };

  return (
    <>
      <section className="videoSidebar__section">
        <span className="videoSidebar__span">
          {!users ? (
            <LoginIcon
              className="videoSidebar__svg"
              onClick={() => {
                navigate("login");
              }}
            />
          ) : isLiked ? (
            <FavoriteIcon
              style={{ color: "red" }}
              className="videoSidebar__svg"
              onClick={() => {
                addlike(id, users, setReload, fetchAllLikes);
              }}
            />
          ) : (
            <FavoriteBorderIcon
              className="videoSidebar__svg"
              onClick={() => {
                addlike(id, users, setReload, fetchAllLikes);
              }}
            />
          )}
          {!users ? "login" : totalLikes}
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
