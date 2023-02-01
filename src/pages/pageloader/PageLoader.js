import styled from "@emotion/styled";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const PageLoader = ({ title }) => {
  return (
    <>
      <PageLoaderSection>
        <div>
          <span>{title}</span>
          <CircularProgress className="circularProgress" />
        </div>
      </PageLoaderSection>
    </>
  );
};

export default PageLoader;

const PageLoaderSection = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  > div {
    width: 380px;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 20px;
    > span {
      font-size: 1em;
      text-transform: capitalize;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
    }
  }
`;
