import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChatCards } from "../../components/chat/ChatCards";
import { ChatUsers } from "../../components/chat/ChatUsers";
import { SearchForAllChatsOfUser } from "../../utils/SearchForAllChatsOfUser";
import Login from "../login/Login";

const Chat = () => {
  const { users } = useSelector((state) => state.instaReducer);
  const [fetchedChats, setFetchedChats] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [chatsLoading, setChatsLoading] = useState(true);

  // search for chats
  useEffect(() => {
    if (users) {
      SearchForAllChatsOfUser(
        users,
        setFetchedChats,
        setIsEmpty,
        setChatsLoading
      );
    }
  }, [users]);

  return (
    <>
      {!users ? (
        <Login />
      ) : (
        <Chats>
          <h4>select users to chat</h4>
          <ChatUsers />

          <hr />

          <h4 style={{ marginTop: "20px" }}>Your Chats</h4>

          {chatsLoading ? (
            <div
              className="itemNotFound text-center"
              style={{ marginTop: "200px" }}
            >
              Fetching Chats....
            </div>
          ) : isEmpty ? (
            <div
              className="itemNotFound text-center"
              style={{ marginTop: "200px" }}
            >
              No Chat Found
            </div>
          ) : (
            fetchedChats &&
            fetchedChats.map(
              ({
                user__profileImg,
                user__name,
                id,
                user__ref,
                timestamp,
                comment,
              }) => {
                return (
                  <ChatCards
                    key={id}
                    id={id}
                    user__name={user__name}
                    user__profileImg={user__profileImg}
                    user__ref={user__ref}
                    time={timestamp}
                    comment={comment}
                  />
                );
              }
            )
          )}
        </Chats>
      )}
    </>
  );
};

export default Chat;

const Chats = styled.section`
  width: 100%;
  height: 100%;
  background: #fff;
  color: #000;
  padding: 10px;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;

  > h4 {
    font-size: 1em;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    text-transform: capitalize;
    /* background-image: linear-gradient(
      to left,
      #405de6,
      #854fd5,
      #ac40bf,
      #c731a6,
      #d7298d,
      #e7377c,
      #f04b6c,
      #f5605f,
      #fd815b,
      #ffa15e,
      #ffbf6b,
      #ffdc80
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */
  }
`;
