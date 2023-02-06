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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import WindowIcon from "@mui/icons-material/Window";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import PageLoader from "../pageloader/PageLoader";
import Login from "../login/Login";
import Sharepost from "../../components/home/Sharepost";
import { FetchReelsOfUser } from "../../utils/FetchReelsOfUser";
import ProfileReelsListView from "../../components/home/ProfileReelsListView";
import ProfileReelsGridView from "../../components/home/ProfileReelsGridView";
import { Bio } from "../../components/home/Bio";
import { UpdateUser } from "../../components/home/UpdateUser";
import { fetchUserById } from "../../utils/fetchUserById";

const Home = () => {
  //redux
  const { pageLoader } = useSelector((state) => state.instaReducer);
  const { users } = useSelector((state) => state.instaReducer);
  const { userModal } = useSelector((state) => state.instaReducer);
  const { swipeableDrawer } = useSelector((state) => state.instaReducer);
  const { reloadRedux } = useSelector((state) => state.instaReducer);

  // variables
  const { profileid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [homeUser, setHomeUser] = useState([]);
  const [reload, setReload] = useState(false);

  // search for current logged user with profileid
  useEffect(() => {
    fetchUserById(setHomeUser, profileid);
  }, [profileid, reloadRedux]);

  // fetching reels to displaying in the profile page
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
  }, [
    pageLoader,
    profileid,
    dispatch,
    navigate,
    swipeableDrawer,
    reload,
    reloadRedux,
  ]);

  if (!homeUser.length) return "";

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
            {profileid === localStorage.getItem("insta-by-aman-id") ? (
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
            ) : (
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
                          navigate(`/chats/${profileid}`);
                        }}
                      >
                        message
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            )}
          </header>

          {homeUser && (
            <>
              <main>
                <Avatar src={homeUser[0].user__profileImg} />
                <h4>{homeUser[0].user__name}</h4>
              </main>

              <Bio user={homeUser[0]} />
              <div></div>
            </>
          )}

          {profileid === localStorage.getItem("insta-by-aman-id") && (
            <Sharepost />
          )}

          <Box marginTop={"30px"}>
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
              <div className="itemNotFound text-center">Fetching reels....</div>
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
          <UpdateUser user__details={users} set__reload={setReload} />
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
  padding: 10px 0px;
  position: relative;

  > header {
    padding: 0 10px;
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
    padding: 0 10px;
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
    gap: 10px;
    padding: 0 5px;
    margin-top: 20px;

    @media screen and (max-width: 500px) {
      justify-content: center;
    }
  }
`;
