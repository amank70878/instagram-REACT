import styled from "@emotion/styled";
import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const ChatCards = ({
  id,
  user__name,
  user__profileImg,
  user__ref,
  time,
  comment,
}) => {
  // setting time
  const newDate = new Date(time.seconds * 1000).toLocaleDateString();
  const newTime = new Date(time.seconds * 1000).toLocaleTimeString();
  return (
    <>
      <Link to={`/chats/${user__ref}`}>
        <ChatCardsSection>
          <Cards>
            <Avatar className="cards__avatar" src={user__profileImg} />
            <div className="cards_details">
              <div>
                <h4>{user__name}</h4>
                <p>
                  {newDate} {newTime}
                </p>
              </div>
              <h5>
                {comment.length > 35 ? comment.slice(0, 35) + "..." : comment}
              </h5>
            </div>
          </Cards>
        </ChatCardsSection>
      </Link>
    </>
  );
};

const ChatCardsSection = styled.section`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const Cards = styled.div`
  width: 100%;
  padding: 10px;

  display: flex;
  gap: 15px;
  border-radius: 12px;
  box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #bfc7cab1;
  }

  > .cards__avatar {
    width: 45px;
    height: 45px;
  }

  > .cards_details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    flex: 1;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      > h4 {
        font-size: 1.12rem;
        font-weight: 600;
        text-transform: capitalize;
        color: rgba(0, 0, 0, 0.9);
        line-height: 30px;
      }
      > p {
        font-size: 0.7rem;
        color: rgba(0, 0, 0, 0.45);
      }
    }

    > h5 {
      font-size: 0.9rem;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.7);
    }
  }
`;
