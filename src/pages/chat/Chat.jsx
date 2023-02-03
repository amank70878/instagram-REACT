import styled from "@emotion/styled";
import { Modal } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { ChatUsers } from "../../components/ChatUsers";
import Login from "../login/Login";
import PageLoader from "../pageloader/PageLoader";

const Chat = () => {
  const { pageLoader } = useSelector((state) => state.linkedinReducer);
  const { users } = useSelector((state) => state.linkedinReducer);

  return (
    <>
      {!users ? (
        <Login />
      ) : (
        <Chats>
          <h4>select users to chat</h4>
          <ChatUsers />
        </Chats>
      )}
      <Modal
        open={pageLoader === "app" ? true : false}
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

export default Chat;

const Chats = styled.section`
  width: 100%;
  height: 100%;
  background: #fff;
  color: #000;
  padding: 10px 0px;
  position: relative;
  overflow: hidden;

  > h4 {
    font-size: 1.2em;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    padding: 10px 10px 0 10px;
    text-transform: capitalize;

    background-image: linear-gradient(
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
    -webkit-text-fill-color: transparent;
  }
`;
