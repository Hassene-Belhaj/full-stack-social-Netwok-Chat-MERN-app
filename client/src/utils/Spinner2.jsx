import React from "react";
import styled, { keyframes } from "styled-components";

const Spinner2 = ({ width, height }) => {
  return (
    <Wrapper>
      <LoaderSpinner $width={width} $height={height}></LoaderSpinner>
    </Wrapper>
  );
};

export default Spinner2;

const rotate360 = keyframes`
from{
    transform : rotate(0deg); 
}
to {
    transform: rotate(360deg);
}
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const LoaderSpinner = styled.div`
  width: ${({ $width }) => ($width ? $width : "45px")};
  height: ${({ $height }) => ($height ? $height : "45px")};
  animation: ${rotate360} 0.8s infinite linear;
  border-right: ${({ theme }) => `3px solid ${theme.background}`};
  border-left: ${({ theme }) => `3px solid ${theme.background}`};
  border-top: ${({ theme }) => `3px solid ${theme.background}`};
  border-bottom: 3px solid rgba(0, 0, 0, 0);
  background-color: transparent;
  border-radius: 50%;
`;
