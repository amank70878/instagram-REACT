import React, { useState } from "react";
import styled from "@emotion/styled";
import { Avatar, Box, Button, IconButton, TextField } from "@mui/material";
import VideoSidebar from "../video/videosidebar/VideoSidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

const ProfileReelsListView = ({
  id,
  user__name,
  user__email,
  user__profileImg,
  reel__title,
  reel__location,
  reel__src,
  reel__likes,
  reel__comments,
  time,
}) => {
  // setting time
  const _seconds = parseInt(time.substring(18, 28));
  const newDate = new Date(_seconds * 1000).toLocaleDateString();
  const newTime = new Date(_seconds * 1000).toLocaleTimeString();

  const { reloadRedux } = useSelector((state) => state.instaReducer);
  const dispatch = useDispatch();

  const deletePostFunc = async (id) => {
    let reply = window.confirm("are you sure you want to delete the post");
    if (reply) {
      const userDoc = doc(db, "reels", id);
      await deleteDoc(userDoc);
      dispatch({
        type: "setReloadRedux",
        payload: !reloadRedux,
      });
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalLocation, setModalLocation] = useState("");

  const updatePostFunc = async () => {
    const noteDoc = doc(db, "reels", modalId);
    const newFields = {
      reel__title: modalTitle,
      reel__location: modalLocation,
    };
    await updateDoc(noteDoc, newFields);
  };

  return (
    <>
      <PostsSection>
        <Title>
          <Avatar src={user__profileImg} className="images__imgProfile" />
          <div className="tcb-ri">
            <div className="tcb-t">
              <span>
                {user__name} ({reel__location})
              </span>
              <p>
                {newDate} ({newTime})
              </p>
            </div>
            <div>
              <IconButton
                onClick={() => {
                  setModalOpen(true);
                  setModalId(id);
                  setModalTitle(reel__title);
                  setModalLocation(reel__location);
                }}
              >
                <DriveFileRenameOutlineIcon />
              </IconButton>
              <IconButton onClick={() => deletePostFunc(id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </Title>
        <Reel>
          <video src={reel__src} controls />
        </Reel>
        <Desc>{reel__title}</Desc>

        <VideoSidebar id={id} likes={reel__likes} />
      </PostsSection>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction={"row"}
            justifyContent="space-between"
            alignItems="center"
          >
            <div />
            <Typography
              variant="caption"
              color="grey"
              fontSize="17px"
              textAlign="center"
            >
              Update the post
            </Typography>
            <IconButton
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <TextField
            id="outlined-basic"
            label="id"
            variant="outlined"
            style={{ display: "none" }}
            value={modalId}
            onChange={(e) => setModalId(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="title"
            variant="outlined"
            style={{ width: "100%", marginBottom: 5 }}
            value={modalTitle}
            onChange={(e) => setModalTitle(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="location"
            variant="outlined"
            style={{ width: "100%" }}
            value={modalLocation}
            onChange={(e) => setModalLocation(e.target.value)}
          />
          <Stack
            direction={"row"}
            justifyContent="flex-end"
            gap="5"
            marginTop="20px"
          >
            <Button
              variant="contained"
              sx={{ margin: "0 10px" }}
              onClick={() => {
                setModalOpen(false);
                setModalId("");
                setModalTitle("");
                setModalLocation("");
                updatePostFunc();
              }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              sx={{ margin: "0 10px" }}
              onClick={() => {
                setModalOpen(false);
                setModalId("");
                setModalTitle("");
                setModalLocation("");
              }}
            >
              close
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileReelsListView;

const PostsSection = styled.div`
  overflow: hidden;
  background: #fff;
  padding: 0;
  border-radius: 10px;
  width: 100%;
  min-height: 600px;
  position: relative;
  margin-bottom: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;
const Title = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: flex-start;
  background-color: #d1d1d1ac;
  > .images__imgProfile {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .tcb-ri {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    margin-left: 10px;
    font-size: 0.71em;
    letter-spacing: 0.5px;
    color: rgba(0, 0, 0, 0.85);
    .tcb-t {
      font-size: 1.4em;
      font-weight: 600;
      letter-spacing: 0.2px;

      > span {
        font-size: 0.9em;
        font-weight: 600;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }

      > p {
        font-size: 0.7em;
        font-weight: 500;
        cursor: pointer;
      }
    }
  }
`;
const Desc = styled.div`
  font-size: 1em;
  padding: 5px 10px;
  color: rgba(0, 0, 0, 0.81);
  font-weight: 600;
`;
const Reel = styled.div`
  width: 100%;
  min-height: 100%;
  background: #000000;
  > video {
    width: 100%;
    background: #000000;
    min-height: 530px;
    height: 100%;
    object-fit: cover;
  }
`;
