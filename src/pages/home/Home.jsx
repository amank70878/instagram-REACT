import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar, FormControl, MenuItem, Modal, Select } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByLocalToken } from "../../utils/checkUserByToken";
import PageLoader from "../pageloader/PageLoader";
import Login from "../login/Login";
import Posts from "../../components/Posts";
import Sharepost from "../../components/Sharepost";
import { fetchArticleOfUser } from "../../utils/FetchArticleOfUser";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "../../components/Loader";
import VideoPosts from "../../components/VideoPosts";

const Home = () => {
  // to clear the token id
  var hours = 2;
  var now = new Date().getTime();
  var setupTime = localStorage.getItem("instaLoginTime");
  if (setupTime == null) {
    localStorage.setItem("instaLoginTime", now);
  } else {
    if (now - setupTime > hours * 60 * 60 * 1000) {
      localStorage.clear();
      localStorage.setItem("instaLoginTime", now);
    }
  }

  // variables
  const { profileid } = useParams();
  const dispatch = useDispatch();
  let [searchedUser, setSearchedUser] = useState([]);
  const navigate = useNavigate();

  //redux
  const { pageLoader } = useSelector((state) => state.linkedinReducer);
  const { users } = useSelector((state) => state.linkedinReducer);

  // search for current logged user with local token
  useEffect(() => {
    dispatch({
      type: "setPageLoader",
      payload: true,
    });
    fetchUserByLocalToken(setSearchedUser, navigate, dispatch);

    // eslint-disable-next-line
  }, [navigate]);

  // dispatching the current logged user
  useEffect(() => {
    dispatch({
      type: "setUser",
      payload: searchedUser[0],
    });
  }, [searchedUser, dispatch]);

  // fetching articles to displaying in the profile page
  const [fetchedArticles, setFetchedArticles] = useState("");
  const [Loading, setLoading] = useState(true);
  const [articleType, setArticleType] = useState("image");
  const [emptyArticles, setEmptyArticles] = useState(false);

  useEffect(() => {
    fetchArticleOfUser(
      query,
      collection,
      where,
      getDocs,
      db,
      setFetchedArticles,
      setLoading,
      articleType,
      setEmptyArticles,
      profileid
    );
  }, [articleType, setArticleType, pageLoader, profileid]);

  return (
    <>
      {!users ? (
        <Login />
      ) : (
        <Wrap>
          <header>
            <SettingsIcon />
          </header>
          <main>
            <Avatar src={users.profileImg} />
            <h4>{users.user__name}</h4>
          </main>
          <Sharepost />

          <div className="home__filter">
            <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
              <Select
                value={articleType}
                onChange={(e) => setArticleType(e.target.value)}
                label="Article Types"
              >
                <MenuItem value="video">Videos</MenuItem>
                <MenuItem value="image">Images</MenuItem>
              </Select>
            </FormControl>
          </div>
          <section className="home__postsDiv">
            {articleType === "image" &&
              (Loading ? (
                <Loader title="fetching post images....." />
              ) : emptyArticles ? (
                <div className="itemNotFound">no images are available</div>
              ) : (
                fetchedArticles.map((items, index) => {
                  return (
                    <div className="profile__cards" key={`${index}`}>
                      <Posts
                        id={`${items.id}`}
                        user__name={`${items.user__name}`}
                        user__email={`${items.user__email}`}
                        user__profileImg={`${items.user__profileImg}`}
                        post__title={`${items.post__title}`}
                        post__videoSrc={`${items.post__src}`}
                        post__mediaType={`${items.post__mediaType}`}
                        post__likes={`${items.post__likes}`}
                        post__comments={`${items.post__comments}`}
                        post__reposts={`${items.post__reposts}`}
                        time={`${items.time}`}
                      />
                    </div>
                  );
                })
              ))}

            {articleType === "video" &&
              (Loading ? (
                <Loader title="fetching post videos ....." />
              ) : emptyArticles ? (
                <div className="itemNotFound">no videos are available</div>
              ) : (
                fetchedArticles.map((items, index) => {
                  return (
                    <div className="profile__cards" key={`${index}`}>
                      <VideoPosts
                        id={`${items.id}`}
                        user__name={`${items.user__name}`}
                        user__email={`${items.user__email}`}
                        user__profileImg={`${items.user__profileImg}`}
                        post__title={`${items.post__title}`}
                        post__videoSrc={`${items.post__src}`}
                        post__mediaType={`${items.post__mediaType}`}
                        post__likes={`${items.post__likes}`}
                        post__comments={`${items.post__comments}`}
                        post__reposts={`${items.post__reposts}`}
                        time={`${items.time}`}
                      />
                    </div>
                  );
                })
              ))}
          </section>
        </Wrap>
      )}
      <Modal
        open={pageLoader === "app" ? true : false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <PageLoader title="fetching user data from database......." />
        </div>
      </Modal>
      <Modal
        open={pageLoader === "input" ? true : false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <PageLoader title="your post is uploading to our database......." />
        </div>
      </Modal>
    </>
  );
};

export default Home;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  color: #000;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px 10px;
  position: relative;
  padding-bottom: 20px;

  > header {
    padding: 10px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    > svg {
      font-size: 1.7em;
      color: rgba(0, 0, 0, 0.8);
    }
  }

  > main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    padding: 10px;
    > div {
      width: 70px;
      height: 70px;
    }
    > h4 {
      font-size: 1.6em;
      font-weight: 400;
      letter-spacing: 2px;
      color: rgba(0, 0, 0, 0.7);
    }
  }
  > .home__postsDiv {
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px 10px;
  }
`;
