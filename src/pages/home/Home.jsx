import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByLocalToken } from "../../utils/checkUserByToken";
import PageLoader from "../pageloader/PageLoader";
import Login from "../login/Login";
import ProfileReelsListView from "../../components/ProfileReelsListView";
import Sharepost from "../../components/Sharepost";
import { FetchReelsOfUser } from "../../utils/FetchReelsOfUser";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import WindowIcon from "@mui/icons-material/Window";
import ProfileReelsGridView from "../../components/ProfileReelsGridView";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Bio } from "../../components/Bio";
import { UpdateUser } from "../../components/UpdateUser";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

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
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();

  //redux
  const { pageLoader } = useSelector((state) => state.linkedinReducer);
  const { users } = useSelector((state) => state.linkedinReducer);
  const { userModal } = useSelector((state) => state.linkedinReducer);

  // search for current logged user with local token
  useEffect(() => {
    dispatch({
      type: "setPageLoader",
      payload: true,
    });
    fetchUserByLocalToken(setSearchedUser, navigate, dispatch);

    // eslint-disable-next-line
  }, [navigate, reload]);

  // dispatching the current logged user
  useEffect(() => {
    dispatch({
      type: "setUser",
      payload: searchedUser[0],
    });
  }, [searchedUser, dispatch]);

  // fetching articles to displaying in the profile page
  const [fetchedReels, setFetchedReels] = useState("");
  const [emptyArticles, setEmptyArticles] = useState(false);
  const [loading, setLoading] = useState(true);
  const [grid, setGrid] = useState(true);

  // fetching reels
  useEffect(() => {
    FetchReelsOfUser(
      query,
      collection,
      where,
      getDocs,
      db,
      setFetchedReels,
      setEmptyArticles,
      profileid,
      setLoading
    );
  }, [pageLoader, profileid]);

  return (
    <>
      {!users ? (
        <Login />
      ) : (
        <Wrap>
          <header>
            <IconButton onClick={() => navigate(-1)}>
              <ChevronLeftIcon />
            </IconButton>

            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button {...bindTrigger(popupState)}>
                    <SettingsIcon />
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem
                      onClick={() => {
                        popupState.close();

                        dispatch({
                          type: "setUserModal",
                          payload: true,
                        });
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        popupState.close();
                        localStorage.removeItem("insta-by-aman-id");
                        window.location.reload();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </header>

          <main>
            <Avatar src={users.profileImg} />
            <h4>{users.user__name}</h4>
          </main>

          <Bio user={searchedUser[0]} />

          <Sharepost />

          <Box>
            <Paper elevation={2}>
              <BottomNavigation>
                <BottomNavigationAction
                  onClick={() => setGrid(true)}
                  icon={<WindowIcon />}
                />
                <BottomNavigationAction
                  onClick={() => setGrid(false)}
                  icon={<FormatListBulletedIcon />}
                />
              </BottomNavigation>
            </Paper>
          </Box>

          <section className="home__postsDiv">
            {loading ? (
              "loading"
            ) : emptyArticles ? (
              <div className="itemNotFound text-center">
                no reels are available
              </div>
            ) : grid ? (
              fetchedReels.map((items, index) => {
                return (
                  <ProfileReelsGridView
                    key={`${index}`}
                    id={`${items.id}`}
                    reel__src={`${items.reel__src}`}
                    reel__likes={`${items.reel__likes}`}
                    reel__comments={`${items.reel__comments}`}
                  />
                );
              })
            ) : (
              fetchedReels.map((items, index) => {
                return (
                  <ProfileReelsListView
                    key={`${index}`}
                    id={`${items.id}`}
                    user__name={`${items.user__name}`}
                    user__email={`${items.user__email}`}
                    user__profileImg={`${items.user__profileImg}`}
                    reel__title={`${items.reel__title}`}
                    reel__location={`${items.reel__location}`}
                    reel__src={`${items.reel__src}`}
                    reel__likes={`${items.reel__likes}`}
                    reel__comments={`${items.reel__comments}`}
                    time={`${items.time}`}
                  />
                );
              })
            )}
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

      <Modal
        open={userModal}
        onClose={() =>
          dispatch({
            type: "setUserModal",
            payload: false,
          })
        }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <UpdateUser userDetails={searchedUser[0]} setReload={setReload} />
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

  > header {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
  }
`;
