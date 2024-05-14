import React from "react";
import styled from "styled-components";

const ConversationUi = ({ownMessage,messages}) => {
   
  if(messages.text.length === 0) return ;
  else  {
    return (
      <Container>
      <Wrapper $display="flex" $padding="1rem">
          <Div $order={ownMessage} $color="#fff" $width="calc(100% - 2rem)" $height="100%" $bg={ownMessage ? "#65636D" : "#3A5BC7"} $br="10px">
            <TextChat>{messages.text}</TextChat>
          </Div>
        <Div $color="#fff" $width="2rem" $height="2rem">
          <Image src={messages.sender.profilePic} />
        </Div>
      </Wrapper>
      {/* <Div $width='100%' $display='flex' $jc='end'>11</Div> */}
    </Container>
  );
};
} ;

export default ConversationUi;

const Container = styled.div`
`;
const Wrapper = styled.div`
  display: ${({ $display }) => $display};
  align-items: center;
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
