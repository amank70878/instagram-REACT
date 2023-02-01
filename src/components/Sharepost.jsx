import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ModalInput from "./ModalInput";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const Sharepost = () => {
  const dispatch = useDispatch();
  const { modalValue } = useSelector((state) => state.linkedinReducer);
  const [open, setOpen] = useState(modalValue);

  const handleModalStateFunc = (type) => {
    dispatch({
      type: "setModalValue",
      payload: type,
    });
    setOpen(type);
  };

  useEffect(() => {
    setOpen(modalValue);
  }, [modalValue]);

  return (
    <>
      <Wrap>
        <button onClick={(e) => handleModalStateFunc(true)}>
          Start a post
        </button>

        <Modal
          open={open}
          onClose={(e) => handleModalStateFunc(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <>
            <ModalInput />
          </>
        </Modal>
      </Wrap>
    </>
  );
};

export default Sharepost;

const Wrap = styled.div`
  margin: 20px 0;
  position: relative;
  > button {
    padding: 12px 30px;
    width: 100%;
    background: #ffffff;
    color: rgb(255, 255, 255);
    color: #000;
    font-size: 0.85em;
    letter-spacing: 2px;
    font-weight: 500;
    text-transform: uppercase;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid #000;
    outline: none;

    &:hover {
      background: #000;
      color: #fff;
    }
  }
`;
