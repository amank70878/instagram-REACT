import styled from "@emotion/styled";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { searchUser } from "../utils/searchUser";

export const ChatUsers = () => {
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    searchUser(setAllUser);
  }, []);

  return (
    <>
      <ChatUser>
        {allUser &&
          allUser.map(({ user__profileImg }) => {
            return <Avatar key={user__profileImg} src={user__profileImg} />;
          })}
      </ChatUser>
    </>
  );
};

const ChatUser = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;

  padding: 10px 0 10px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);

  overflow-y: hidden;
  overflow-x: auto;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;
