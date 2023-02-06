import styled from "@emotion/styled";
import React from "react";

export const Bio = ({ user }) => {
  return (
    <>
      {user && (
        <BioSection>
          <li>
            {user.user__Bio1.length < 31
              ? user.user__Bio1
              : user.user__Bio1.slice(0, 31) + "..."}
          </li>
          <li>
            {user.user__Bio2.length < 31
              ? user.user__Bio2
              : user.user__Bio2.slice(0, 31) + "...."}
          </li>
          <li>
            {user.user__Bio3.length < 31
              ? user.user__Bio3
              : user.user__Bio3.slice(0, 31) + "...."}
          </li>
          <li>
            {user.user__Bio4.length < 31
              ? user.user__Bio4
              : user.user__Bio4.slice(0, 31) + "...."}
          </li>
        </BioSection>
      )}
    </>
  );
};

const BioSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 94%;
  margin: 0 auto;
  margin-top: 10px;

  > li {
    font-size: 1.12em;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 500;
    line-height: 25px;
  }
`;
