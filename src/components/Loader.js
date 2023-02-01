import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "@emotion/styled";

const Loader = ({ title, textcolor }) => {
  return (
    <LoaderDiv textcolor={textcolor}>
      <span>{title}</span>
      <CircularProgress className="loader__svg" />
    </LoaderDiv>
  );
};

export default Loader;

const LoaderDiv = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  > span {
    font-size: 1.2em;
    color: ${(props) =>
      `${props.textColor === "white" ? "white" : "rgba(0,0,0,0.8)"}`};
    font-weight: ${(props) => `${props.textColor === "white" ? "400" : "600"}`};
    text-transform: capitalize;
  }
  > .loader__svg {
    width: 30px !important;
    height: 30px !important;
    color: ${(props) =>
      `${props.textColor === "white" ? "white" : " rgba(0, 0, 0, 0.7)"}`};
    fill: currentColor;
  }
`;
