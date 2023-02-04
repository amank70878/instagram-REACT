import styled from "@emotion/styled";
import { Avatar, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addComment } from "../utils/addComments";
import SendIcon from "@mui/icons-material/Send";
import { useEffect } from "react";
import { fetchCommentsOfReel } from "../utils/fetchCommentsOfReel";

export const Comments = () => {
  const { pageLoader } = useSelector((state) => state.instaReducer);
  const { commentDrawerId: id } = useSelector((state) => state.instaReducer);

  // adding comments
  const { users } = useSelector((state) => state.instaReducer);
  const [inputComment, setInputComment] = useState("");
  const [reload, setReload] = useState(false);

  // fetching comments
  const [fetchedComments, setFetchedComments] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCommentsOfReel(id, setFetchedComments, setIsEmpty, setLoading);
  }, [reload, id]);

  return (
    <>
      <CommentsSection>
        {fetchedComments ? (
          <header>
            total number of comments are : {fetchedComments.length}
          </header>
        ) : (
          ""
        )}

        {/* comments section */}
        <div className="comments_section">
          {loading
            ? "loading"
            : isEmpty
            ? "no comments"
            : fetchedComments &&
              fetchedComments.map(
                ({ user__profileImg, user__name, comment, timestamp, id }) => {
                  // setting time
                  // const _seconds = parseInt(timestamp.substring(18, 28));
                  // const newDate = new Date(
                  //   _seconds * 1000
                  // ).toLocaleDateString();
                  // const newTime = new Date(
                  //   _seconds * 1000
                  // ).toLocaleTimeString();
                  return (
                    <div className="comments_card" key={id}>
                      <Avatar src={user__profileImg} />
                      <div className="comments__details">
                        <span>
                          <h4>{user__name}</h4>
                          {/* {newDate} ({newTime}) */}
                          <p> 12/23/23</p>
                        </span>
                        <p>{comment}</p>
                      </div>
                    </div>
                  );
                }
              )}
        </div>

        {/* input section */}
        <div className="commentInput">
          <TextField
            disabled={!users}
            id="outlined-basic"
            fullWidth={true}
            label={users ? "your comment" : "please login to comment"}
            type="text"
            variant="outlined"
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
          />

          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() => {
              addComment(id, inputComment, pageLoader, users);
              setReload((state) => !state);
              setInputComment("");
            }}
            disabled={!users || inputComment.length < 2}
          >
            Send
          </Button>
        </div>
      </CommentsSection>
    </>
  );
};

const CommentsSection = styled.section`
  background-color: #ffffff;
  color: #000;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
  position: relative;

  > header {
    font-size: 1.2em;
    font-weight: 600;
    text-transform: capitalize;
    color: rgba(0, 0, 0, 0.8);
  }

  > .comments_section {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
    overflow-y: auto;
    gap: 10px;
    height: fit-content;
    margin-bottom: 80px;

    > .comments_card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      width: 100%;
      padding: 10px;
      border-radius: 20px;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
        transition: all 250ms;
        box-shadow: 1px 1px 14px 0px #00000018;
      }

      > div {
        width: 50px;
        height: 50px;
      }

      > .comments__details {
        display: inherit;
        flex-direction: column;
        align-items: flex-start;
        flex: 1;

        span {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;

          > h4 {
            font-size: 1.2em;
            color: rgba(0, 0, 0, 0.8);
            font-weight: 600;
          }
          > p {
            font-size: 0.8em;
            color: rgba(0, 0, 0, 0.6);
          }
        }
        p {
          font-size: 1.1em;
          color: rgba(0, 0, 0, 0.7);
          font-weight: 500;
        }
      }
    }
  }
  > .commentInput {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: row;
    padding: 10px;
    background: #fff;
  }
`;
