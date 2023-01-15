import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import styled from "@emotion/styled";
import { Instagram } from "@mui/icons-material";

const Login = () => {
  const signInFunc = () => {
    signInWithPopup(auth, provider).then((data) => {
      localStorage.setItem("loggedInInstagramCloneEmail", data.user.email);
      localStorage.setItem("loggedInInstagramCloneUser", data.user.displayName);
      localStorage.setItem("loggedInInstagramCloneImg", data.user.photoURL);
      window.location.reload();
    });
  };

  return (
    <LOGINWRAP>
      <LOGINBG>
        <div className="bg-div">
          <span className="login-span">
            <Instagram />
          </span>
          <p className="login-p">Instagram Web</p>
        </div>
      </LOGINBG>
      <LOGINDIV>
        <div>
          <h1>
            Click the <p>Log-in</p> Button to logged in the{" "}
            <p>Instagram Clone</p>
          </h1>
          <button onClick={signInFunc}>Sign-In</button>
        </div>
      </LOGINDIV>
    </LOGINWRAP>
  );
};

export default Login;

const LOGINWRAP = styled.section`
  width: 400px;
  height: 800px;
  background-color: rgb(37, 37, 37);
  overflow: hidden;
  position: relative;
  @media screen and (max-width: 500px) {
    width: 100vw;
    min-height: 100vh;
    background-color: #d8a961;
  }
`;
const LOGINBG = styled.div`
  padding-top: 40px;
  height: 100%;
  background-color: #d8a961;
  .bg-div {
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .login-span {
      display: grid;
      align-items: center;
      svg {
        width: 38px;
        height: 38px;
        @media (max-width: 700px) {
          width: 30px;
          height: 30px;
        }
      }
    }
    .login-p {
      font-size: 1em;
      color: #fff;
      font-weight: 500;
      margin: 0 15px;
      letter-spacing: 0.2px;
      @media (max-width: 700px) {
        font-size: 0.85em;
      }
    }
  }
`;
const LOGINDIV = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 0 20px 20px;
  padding: 50px;
  background-color: #f6f6f6;
  width: 100%;
  position: absolute;
  top: 14%;
  left: 50%;
  transform: translate(-50%);
  box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.75);
  @media (max-width: 950px) {
    padding: 40px;
    width: 100%;
  }
  @media (max-width: 730px) {
    padding: 50px 20px;
    width: 100%;
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  & > div > h1 {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 1em;
    font-weight: 400;
    letter-spacing: 0.5px;
    line-height: 2;
    @media (max-width: 1292px) {
      font-size: 0.86em;
    }
    @media (max-width: 730px) {
      font-size: 0.8em;
    }
  }
  & > div > h1 > p {
    font-size: 0.95em;
    font-weight: 700;
    margin: 0 5px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: grey;
      bottom: 2px;
    }
  }
  & > div > button {
    width: 100%;
    padding: 8px 10px;
    margin: 0 20px;
    margin-top: 50px;
    background-color: #cf8d2b;
    border-radius: 10px;
    color: #e4e4e4;
    border: none;
    outline: none;
    font-size: 1.03em;
    font-weight: 500;
    letter-spacing: 0.2px;
    cursor: pointer;
    @media (max-width: 1292px) {
      font-size: 1em;
    }
    @media (max-width: 700px) {
      font-size: 0.85em;
    }
    &:hover,
    &:active {
      background-color: #be914d;
    }
  }
`;
