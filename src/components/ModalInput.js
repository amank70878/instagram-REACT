import React, { useState } from "react";
import styled from "@emotion/styled";
import { Avatar, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "../firebase";
import { addVideo } from "../utils/addVideo";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import { getImagesUrl } from "../utils/getImagesUrl";
import { getVideosUrl } from "../utils/getVideosUrl";
import { addImage } from "../utils/addImage";

const ModalInput = () => {
  // redux here
  const { users: user } = useSelector((state) => state.linkedinReducer);
  const dispatch = useDispatch();

  // inputs variables
  const [title, setTitle] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [inputType, setInputType] = useState("image");
  const changeInputFunc = (type) => {
    if (type === "image") {
      setInputType("image");
    } else {
      setInputType("video");
    }
  };
  const handleModalStateFunc = (type) => {
    dispatch({
      type: "setModalValue",
      payload: type,
    });
  };

  // firebase storage
  const uploadFile = async () => {
    if (inputType === "video") {
      const _videoUrl = await getVideosUrl(
        ref,
        firebaseStorage,
        getDownloadURL,
        videoSrc,
        uploadBytes,
        uuidv4(),
        dispatch
      );
      addVideo(
        user,
        addDoc,
        collection,
        serverTimestamp,
        db,
        _videoUrl,
        title,
        dispatch
      );
    } else if (inputType === "image") {
      const getImageUrl = await getImagesUrl(
        ref,
        firebaseStorage,
        getDownloadURL,
        imageUpload,
        uploadBytes,
        uuidv4(),
        dispatch
      );
      await addImage(
        user,
        addDoc,
        collection,
        serverTimestamp,
        db,
        getImageUrl,
        title,
        dispatch
      );
    }
  };

  return (
    <>
      <ModalBox inputType={inputType}>
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
            placeholder="Please fill your post's title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="image">
            <input
              type="file"
              accept="image/gif, image/jpeg, image/png"
              id="modal__imageInput"
              style={{ display: "none" }}
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
            {!imageUpload && (
              <label
                htmlFor="modal__imageInput"
                className="modal__imageInputLabel"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="currentColor"
                  width="24"
                  height="24"
                  focusable="false"
                >
                  <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
                </svg>
                <p> Select a Image</p>
              </label>
            )}

            {imageUpload && (
              <>
                <div className="modalimg__div">
                  <img
                    src={URL.createObjectURL(imageUpload)}
                    className="modal__imageSrc"
                    alt=""
                  />
                  <IconButton
                    className="modal__imageSrcBtn"
                    onClick={(e) => setImageUpload(null)}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </>
            )}
          </div>
          <div className="video">
            <input
              type="file"
              className="modal__videoInput"
              accept="video/mp4,video/x-m4v,video/*"
              id="modal__videoInput"
              style={{ display: "none" }}
              onChange={(e) => setVideoSrc(e.target.files[0])}
            />
            {!videoSrc && (
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
            )}
            {videoSrc && (
              <>
                <div className="modalvideo__div">
                  <div className="modal__videoSrc">{videoSrc.name}</div>

                  <IconButton
                    className="modal__videoSrcBtn"
                    onClick={() => setVideoSrc(null)}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="modal__footer">
          <div className="modal__footerLeft">
            <IconButton
              className="modal__photo"
              onClick={() => {
                changeInputFunc("image");
                setVideoSrc("");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-supported-dps="24x24"
                fill="currentColor"
                width="24"
                height="24"
                focusable="false"
              >
                <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
              </svg>
              <p>Photo</p>
            </IconButton>
            <IconButton
              className="modal__video"
              onClick={() => {
                changeInputFunc("video");
                setImageUpload("");
              }}
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
              <p>Video</p>
            </IconButton>
          </div>
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
      color: rgba(0, 0, 0, 0.4);
      font-size: 1.1em;
      font-weight: 600;
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.4);
      outline: none;

      &::placeholder {
        color: #000000b3;
        font-weight: 500;
      }
    }
    & > .image {
      display: ${(props) =>
        `${props.inputType === "image" ? "block" : "none"}`};
      > .modalimg__div {
        position: relative;
        & > .modal__imageSrc {
          margin: 10px 0;
          width: 100%;
          height: 320px;
          object-fit: contain;
        }
        > .modal__imageSrcBtn {
          position: absolute;
          top: 0px;
          right: -10px;
          background-color: lightgrey;
        }
      }
      & > .modal__imageInputLabel {
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
          @media (max-width: 550px) {
            width: 20px;
            height: 20px;
          }
        }

        p {
          font-size: 1em;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.87);
        }
      }
    }
    > .video {
      display: ${(props) =>
        `${props.inputType === "video" ? "block" : "none"}`};
      & > .modal__videoInput {
        padding: 0px 0px 5px 0px;
        margin: 10px auto;
        width: 100%;
        color: #000000;
        font-size: 1em;
        font-weight: 500;
        border: none;
        border-bottom: 2px solid #00000048;
        outline: none;
        &::placeholder {
          color: #000000b3;
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
    }
  }
  .modal__footer {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(0, 0, 0, 0.3);

    .modal__footerLeft {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;

      & > .modal__photo,
      .modal__video {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        cursor: pointer;
        background: #4094e875;
        padding: 5px 12px;
        border-radius: 8px;

        & > svg {
          color: #257bd0;
          width: 22px;
          height: 22px;
        }

        p {
          color: rgba(0, 0, 0, 0.65);
          font-size: 0.6em;
          font-weight: 700;
        }
      }

      & > .modal__photo {
        border: ${(props) =>
          `${
            props.inputType === "image"
              ? "3px solid #4094e8"
              : "3px solid  #4094e816"
          }`};
      }
      & > .modal__video {
        background: #75c24e5e;
        border: ${(props) =>
          `${
            props.inputType === "video"
              ? "3px solid #75c24e"
              : "3px solid #75c24e2a"
          }`};
        & > svg {
          color: #5f9b41;
        }
      }
    }
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
