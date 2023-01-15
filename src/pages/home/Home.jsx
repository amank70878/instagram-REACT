import React from "react";
import styled from "@emotion/styled";
import {
  AiOutlineSetting,
  AiOutlineTwitter,
  AiFillFacebook,
} from "react-icons/ai";
import { Avatar } from "@mui/material";

const Home = () => {
  const email = localStorage.getItem("loggedInInstagramCloneEmail");
  const user = localStorage.getItem("loggedInInstagramCloneUser");
  const pic = localStorage.getItem("loggedInInstagramCloneImg");

  return (
    <>
      <Wrap>
        <Header>
          <div></div>
          <div className="right">
            <AiOutlineSetting />
          </div>
        </Header>
        <InfoDiv>
          <Info>
            <Personal>
              <div className="img">
                <Avatar src={pic} />
              </div>
              <div className="name">{user}</div>
              <div className="account">{email}</div>
              <div className="account">@__a.m.a.n.___</div>
              <div className="following">
                <h4>0</h4>
                <p className="spe">followers</p>
                <h4>0</h4>
                <p>following</p>
              </div>
            </Personal>
            <Bio>
              Add a bio
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus similique omnis unde minima necessitatibus corporis
                nostrum itaque dignissimos? Culpa, quia?
              </p>
            </Bio>
            <Joined>
              <span className="Jright">
                <AiOutlineTwitter />
                Add Twitter
              </span>
              <span>
                <AiFillFacebook />
                Add Facebook
              </span>
            </Joined>
            <Nomination>
              <div className="textN">
                <h3>Joined 14-July-2020</h3>
                <h4>
                  Nominated by <b>Anton Alarcon</b>
                </h4>
              </div>
            </Nomination>
            <Member>
              <div>Member of</div>
              <button>+</button>
            </Member>
          </Info>
        </InfoDiv>
      </Wrap>
    </>
  );
};

export default Home;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(42, 42, 42);
  overflow-x: hidden;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  @media screen and (max-width: 400px) {
    padding: 13px 20px;
  }
  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .right {
    svg {
      width: 30px;
      height: 30px;
      margin: 0 15px;
      color: #dfdfdf;
      fill: currentColor;
      @media screen and (max-width: 600px) {
        width: 26px;
        height: 26px;
        margin: 0;
        margin-left: 20px;
      }
    }
  }
`;
const InfoDiv = styled.div`
  padding: 20px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const Personal = styled.div`
  color: #dfdfdf;
  .img {
  }

  .name {
    font-size: 1.2em;
    font-weight: 600;
    margin: 10px 0 0 0;
  }
  .account {
    font-size: 1em;
  }
  .following {
    margin: 10px 0 0 0;
    display: flex;
    align-items: center;
    h4 {
      font-size: 1.3em;
      margin: 0 2px;
      font-weight: 600;
    }
    p {
      margin: 0 2px;
      font-size: 1.2 em;
      letter-spacing: 1px;
    }
    .spe {
      margin-right: 20px;
    }
  }
`;
const Bio = styled.div`
  margin-top: 30px;
  color: #dfdfdf;
  font-size: 1.2em;
  font-weight: 500;
  cursor: pointer;
  p {
    width: 300px;
    font-size: 0.75em;
    color: #dfdfdf;
  }
`;
const Joined = styled.div`
  margin-top: 30px;
  color: #dfdfdf;
  font-weight: 600;
  display: flex;
  align-items: center;
  span {
    font-size: 1.1em;
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
      color: #dfdfdf;
      margin-right: 5px;
    }
  }
  .Jright {
    margin-right: 20px;
  }
`;
const Nomination = styled.div`
  color: #dfdfdf;
  margin-top: 10px;
  margin-left: 30px;
  display: flex;
  align-items: center;
  .textN {
    h3 {
      font-size: 1em;
      font-weight: 500;
    }
    h4 {
      font-weight: 500;
      font-size: 1em;
      line-height: 0.8;
    }
  }
`;
const Member = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  color: #dfdfdf;
  div {
    margin-right: 10px;
    font-size: 1.2em;
    font-weight: 6002;
  }
  button {
    font-size: 1.4em;
    padding: 1px 10px;
    border-radius: 5px;
    background: lightblue;
    border: none;
    font-weight: 600;
    cursor: pointer;
  }
`;
