import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Link, useParams } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem, TextField } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useSelector } from "react-redux";
import { fetchUserById } from "../../utils/fetchUserById";
import { addChat } from "../../utils/addChat";
import { fetchchat } from "../../utils/fetchchat";
import { deleteChat } from "../../utils/deleteChat";
import { useRef } from "react";

export const ChatBox = () => {
  // redux and variables
  const { chatprofileid } = useParams();
  const { users } = useSelector((state) => state.instaReducer);
  const [otherUser, setOtherUser] = useState([]);
  const [reload, setReload] = useState(false);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const scrollTo = useRef();

  // fetching other user data
  useEffect(() => {
    fetchUserById(setOtherUser, chatprofileid);
  }, [chatprofileid]);

  // fetch chats from our id
  useEffect(() => {
    if (users) {
      fetchchat(
        setChats,
        setChatsLoading,
        setIsEmpty,
        otherUser,
        users,
        scrollTo
      );
    }
  }, [chatprofileid, users, reload, setReload]);

  return (
    <>
      {otherUser.length && (
        <ChatBoxSection>
          <div>
            <header>
              <Link to={`/home/${otherUser[0].user__loginId}`}>
                <Avatar
                  className="chatHeader1"
                  src={otherUser[0].user__profileImg}
                />
              </Link>
              <div className="chatHeader2">
                <Link to={`/home/${otherUser[0].user__loginId}`}>
                  <h3>{otherUser[0].user__name}</h3>
                </Link>

                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <Button {...bindTrigger(popupState)}>
                        <MoreVertIcon />
                      </Button>
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem
                          onClick={() => {
                            popupState.close();
                            deleteChat(users, otherUser, chats, setReload);
                          }}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </div>
            </header>

            <main>
              {chatsLoading ? (
                <div
                  className="itemNotFound text-center"
                  style={{ marginTop: "200px" }}
                >
                  Fetching Messages....
                </div>
              ) : isEmpty ? (
                <div
                  className="itemNotFound text-center"
                  style={{ marginTop: "200px" }}
                >
                  No chat Found....
                </div>
              ) : (
                chats.map(
                  ({
                    id,
                    user__profileImg,
                    user__name,
                    user__email,
                    timestamp,
                    comment,
                  }) => {
                    const newDate = new Date(
                      timestamp.seconds * 1000
                    ).toLocaleDateString();
                    const newTime = new Date(
                      timestamp.seconds * 1000
                    ).toLocaleTimeString();
                    return (
                      <div
                        className={`dms ${
                          users.user__email === user__email ? "right" : "left"
                        }`}
                        key={id}
                      >
                        <div className="firstChildChats">{user__name}</div>
                        <div className="secondChildChats">{comment}</div>
                        <div className="thirdChildChats">
                          {newDate} {newTime}
                        </div>
                      </div>
                    );
                  }
                )
              )}
              <div ref={scrollTo}></div>
            </main>

            <footer>
              <TextField
                disabled={!users}
                id="outlined-basic"
                fullWidth={true}
                label={users ? "Text Here" : "Please Login First To Text"}
                type="text"
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <Button
                variant="contained"
                disabled={!users || input.length < 1}
                endIcon={<SendIcon />}
                onClick={() => {
                  addChat(input, users, otherUser, setReload, scrollTo);
                  setInput("");
                }}
              >
                Send
              </Button>
            </footer>
          </div>
        </ChatBoxSection>
      )}
    </>
  );
};

const ChatBoxSection = styled.section`
  width: 100%;
  height: 100%;
  background: #fff;
  color: #000;
  position: relative;
  overflow: hidden;

  header {
    padding: 10px;
    width: 100%;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);

    display: flex;
    align-items: center;
    gap: 10px;

    > .chatHeader1 {
      width: 40px;
      height: 40px;
    }
    > .chatHeader2 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;

      h3 {
        font-size: 1rem;
        text-transform: capitalize;
        font-weight: 600;
      }
    }
  }

  main {
    width: 100%;
    max-height: 690px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px;

    overflow-x: hidden;
    overflow-y: auto;
    display: block;

    @media screen and (max-width: 500px) {
      max-height: 670px;
    }

    > .dms {
      position: relative;
      max-width: 78%;
      padding: 15px;
      gap: 10px;
      margin: 10px 0;
      overflow: hidden;
      color: #fff;

      > .firstChildChats {
        font-size: 1em;
        color: #06c097;
        font-weight: 500;

        > div {
          width: 25px;
          height: 25px;
        }
      }
      > .secondChildChats {
        font-size: 0.85rem;
        font-weight: 400;
        color: rgba(225, 225, 225, 0.95);
        margin: 5px 0;
        line-height: 20px;
      }
      > .thirdChildChats {
        color: rgba(225, 225, 225, 0.75);
        font-size: 0.65rem;
        font-weight: 400;
        text-align: right;
      }
    }

    .left {
      background-color: #202c33;
      border-radius: 20px 20px 20px 0;
      margin-right: auto;
    }
    .right {
      background-color: #005c4b;
      border-radius: 20px 20px 0 20px;
      margin-left: auto;
    }
  }

  footer {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;

    display: flex;
    flex-direction: row;
    background: #fff;

    .css-8je8zh-MuiTouchRipple-root {
      height: 100% !important;
    }
  }
`;
