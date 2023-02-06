import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "../Drawer";
import { Comments } from "../Comments";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { addlike } from "../../utils/addlike";
import styled from "@emotion/styled";

const ProfileReelsGridView = ({
  id,
  reel__src,
  reel__likes,
  reel__comments,
}) => {
  const dispatch = useDispatch();
  const [totalLikes, setTotalLikes] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [reload, setReload] = useState(true);
  const { users } = useSelector((state) => state.instaReducer);

  useEffect(() => {
    fetchAllLikes();
  }, [id, reload, setReload]);

  const fetchAllLikes = async () => {
    // fetch all likes
    const q = query(collection(db, `reels/${id}/likes`));
    const docSnap = await getDocs(q);
    setTotalLikes(docSnap._snapshot.docs.size);

    // fetch current user like
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
  };
  return (
    <>
      <PostsSection>
        <video src={reel__src} />
        <Buttons className="buttons__gridview">
          <span>
            {isLiked ? (
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
            <p>{totalLikes}</p>
          </span>
          <span>
            <svg
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
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="currentColor"
              className="mercado-match"
              width="24"
              height="24"
              focusable="false"
            >
              <path d="M7 9h10v1H7zm0 4h7v-1H7zm16-2a6.78 6.78 0 01-2.84 5.61L12 22v-4H8A7 7 0 018 4h8a7 7 0 017 7zm-2 0a5 5 0 00-5-5H8a5 5 0 000 10h6v2.28L19 15a4.79 4.79 0 002-4z"></path>
            </svg>
            <p>{reel__comments}</p>
          </span>
        </Buttons>
      </PostsSection>

      <Drawer component={<Comments />} />
    </>
  );
};

export default ProfileReelsGridView;

const PostsSection = styled.div`
  overflow: hidden;
  background: #fff;
  padding: 0;
  border-radius: 10px;
  width: 178px;
  height: 200px;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;

  @media screen and (max-width: 500px) {
    width: 170px;
  }

  > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    .buttons__gridview {
      background-color: rgba(0, 0, 0, 0.667);
      bottom: 0%;
      transition: all 400ms;
      cursor: pointer;
    }
  }
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 0 10px 10px;

  width: 100%;
  position: absolute;
  bottom: -100%;
  left: 0;
  right: 0;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 10px 10px;
    color: #fff;

    svg {
      margin-right: 5px;
      width: 20;
      height: 20px;
    }

    > p {
      font-size: 1em;
      font-weight: 500;
    }
  }
`;
