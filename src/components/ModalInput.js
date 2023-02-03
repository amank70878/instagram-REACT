import React, { useState } from "react";
import styled from "@emotion/styled";
import { Avatar, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import { getVideosUrl } from "../utils/getVideosUrl";
import { addReels } from "../utils/addReels";

const ModalInput = () => {
  // redux here
  const { users: user } = useSelector((state) => state.linkedinReducer);
  const dispatch = useDispatch();

  // inputs variables
  const [title, setTitle] = useState("");
  const [reel, setReel] = useState("");
  const [location, setLocation] = useState("");

  const handleModalStateFunc = (type) => {
    dispatch({
      type: "setModalValue",
      payload: type,
    });
  };

  // firebase storage
  const uploadFile = async () => {
    const _videoUrl = await getVideosUrl(
      ref,
      firebaseStorage,
      getDownloadURL,
      reel,
      uploadBytes,
      uuidv4(),
      dispatch
    );
    addReels(
      user,
      addDoc,
      collection,
      serverTimestamp,
      db,
      _videoUrl,
      title,
      location,
      dispatch
    );
  };

  return (
    <>
      <ModalBox>
        <div className="modal__header">
          <Avatar className="modal__headerAvatar" src={user.user__profileImg} />
          <p>{user && user.user__name}</p>
          <IconButton
            className="modal__headerCloseBtn"
            onClick={(e) => handleModalStateFunc(false)}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className="modal__body">
          <input
            className="modal__titleInput"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="modal__titleInput"
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <div className="video">
            <input
              type="file"
              className="modal__videoInput"
              accept="video/mp4,video/x-m4v,video/*"
              id="modal__videoInput"
              style={{ display: "none" }}
              onChange={(e) => setReel(e.target.files[0])}
            />

            <label
              htmlFor="modal__videoInput"
              className="modal__videoInputLabel"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-supported-dps="24x24"
                fill="currentColor"
                className="mercado-match"
                width="24"
                height="24"
                focusable="false"
              >
                <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12V8l6 4z"></path>
              </svg>
              <p> Select a Video</p>
            </label>

            {reel && (
              <>
                <div className="modalvideo__div">
                  <div className="modal__videoSrc">{reel.name}</div>

                  <IconButton
                    className="modal__videoSrcBtn"
                    onClick={() => setReel(null)}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="modal__footer">
          <button
            onClick={(e) => {
              handleModalStateFunc(false);
              uploadFile();
            }}
            className="modal__footerRightBtn"
          >
            POST
          </button>
        </div>
      </ModalBox>
    </>
  );
};

export default ModalInput;

const ModalBox = styled.div`
  width: 390px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  padding: 10px 0;

  .modal__header {
    display: flex;
    padding: 10px 20px;
    align-items: center;
    justify-content: flex-start;
    gap: 15px;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);

    & > .modal__headerAvatar {
      width: 35px;
      height: 35px;
    }
    & > p {
      font-size: 1em;
      font-weight: 500;
      text-transform: capitalize;
    }
    & > .modal__headerCloseBtn {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
  .modal__body {
    width: 100%;
    padding: 10px 20px;

    & > .modal__titleInput {
      padding: 0px 0px 5px 0px;
      margin: 10px auto;
      width: 100%;
      color: rgba(0, 0, 0, 0.8);
      font-size: 1.1em;
      font-weight: 500;
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.4);
      outline: none;

      &::placeholder {
        color: rgba(0, 0, 0, 0.8);
        font-weight: 500;
      }
    }
    > .video {
      display: block;
      & > .modal__videoInputLabel {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        cursor: pointer;
        background: #4e97e058;
        padding: 7px 12px;
        border-radius: 8px;
        margin: 10px 0;

        & > svg {
          color: #378fe9;
          width: 25px;
          height: 25px;
        }
        p {
          font-size: 1em;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.87);
        }
      }
      > .modalvideo__div {
        margin: 10px auto;
        position: relative;
        width: 100%;
        border: 2px solid #00000048;
        border-radius: 10px;
        padding: 5px;
        background-color: #e8e8e8;
        & > .modal__videoSrc {
          font-size: 1.1em;
          font-weight: 500;
          text-align: center;
          color: rgba(0, 0, 0, 0.9);
        }
        > .modal__videoSrcBtn {
          position: absolute;
          top: -10px;
          right: -10px;
          background-color: #cacaca;
          & > svg {
            width: 15px !important;
            height: 15px !important;
          }
        }
        p {
          font-size: 1em;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.87);
        }
      }
    }
  }
  .modal__footer {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid rgba(0, 0, 0, 0.3);

    .modal__footerRightBtn {
      cursor: pointer;
      background: #3790e9;
      padding: 10px 15px;
      border-radius: 8px;
      border: none;
      outline: none;
      color: #ffffff;
      font-size: 0.9em;
      font-weight: 500;
      letter-spacing: 0.3px;

      &:hover {
        background: #3790e9e0;
      }
    }
  }
`;
