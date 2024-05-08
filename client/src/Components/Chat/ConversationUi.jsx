import React from "react";
import styled from "styled-components";

const ConversationUi = ({ownMessage}) => {
  return (
    <>
      <Wrapper $display="flex" $padding="1rem">
        <Div $order={ownMessage} $color="#fff" $width="calc(100% - 2rem)" $height="100%" $bg={ownMessage ? "gray" : "#38bdf8"} $br="10px">
          <TextChat>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis vero nobis et facere soluta at iure, sit maiores ad ratione.</TextChat>
        </Div>
        <Div $color="#fff" $width="2rem" $height="2rem">
          <Image src="/user.jpg" />
        </Div>
      </Wrapper>
    </>
  );
};

export default ConversationUi;

const Wrapper = styled.div`
  display: ${({ $display }) => $display};
  padding: ${({ $padding }) => $padding};
  flex-direction: ${({ $fd }) => $fd};
  gap: 1rem;
  border-bottom: ${({ $borderBottom }) => ($borderBottom ? ".2px solid rgba(190,190,190,0.2)" : null)};
`;

const Div = styled.div`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  display: ${({ $display }) => $display};
  justify-content: ${({ $jc }) => $jc};
  align-items: ${({ $ai }) => $ai};
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
  position: ${({ $position }) => $position};
  padding: ${({ $padding }) => $padding};
  background-color: ${({ $bg }) => $bg};
  border-radius: ${({ $br }) => $br};
  color: ${({ $color }) => ($color ? $color : "")};
  order: ${({ $order }) => $order ? 2 : ''};
`;



const TextChat = styled.p`
  flex-wrap: wrap;
  padding: 1rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;
