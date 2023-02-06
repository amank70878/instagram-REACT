import styled from "@emotion/styled";
import { Avatar, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUser } from "../../utils/searchUser";

export const ChatUsers = () => {
  const { users } = useSelector((state) => state.instaReducer);
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  // search for all the users
  useEffect(() => {
    if (users) {
      searchUser(setAllUser, setLoading, setIsEmpty);
    }
  }, [users]);

  return (
    <>
      <ChatUser>
        {loading ? (
          <div className="chatusers">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
          </div>
        ) : isEmpty ? (
          <div className="itemNotFound text-center">
            No User Found (other than you)
          </div>
        ) : (
          allUser && (
            <div className="chatusers">
              {allUser.map(
                ({
                  user__profileImg,
                  user__name,
                  user__loginId,
                  user__email,
                  id,
                }) => {
                  return (
                    <Link key={id} to={`/chats/${user__loginId}`}>
                      <Avatar src={user__profileImg} />
                    </Link>
                  );
                }
              )}
            </div>
          )
        )}
      </ChatUser>
    </>
  );
};

const ChatUser = styled.section`
  padding: 10px 10px 10px 0;
  .chatusers {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 10px;

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
  }
`;
