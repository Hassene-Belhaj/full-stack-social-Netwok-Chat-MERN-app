import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { dark } from "../../utils/ThemeColors";
import { FiSend } from "react-icons/fi";
import ConversationUi from "./ConversationUi";
const ChatPage = () => {
  const refChat = useRef(null);

  useEffect(() => {
    if (refChat.current) {
      refChat.current.scrollIntoView();
    }
  }, []);

  return (
    <Container>
      <Wrapper $display="flex">
        <Section1 $flex="2">
          Connected Users
          {Array(5)
            .fill(0)
            .map((item, i) => {
              return (
                <FlexContainer key={i}>
                  <Div $width="4rem" $height="4rem" $position="relative">
                    <Image src="/user.jpg" />
                    <Cercle></Cercle>
                  </Div>
                  <Div>
                    <Title3>@Marco</Title3>
                    <Text>Hello some message</Text>
                  </Div>
                </FlexContainer>
              );
            })}
        </Section1>
        <Section2 $flex="3">
          <DivMenu>
            <Section>
              <Wrapper $display="flex" $padding="1rem" $borderBottom>
                <Div $width="3rem" $height="3rem">
                  <Image src="/user.jpg" />
                </Div>
                <Div $display="flex" $jc="center" $ai="center">
                  <Title3>@Marco</Title3>
                </Div>
              </Wrapper>
                <ConversationUi ownMessage={true} />
                <ConversationUi ownMessage={false}/>
                <ConversationUi ownMessage={true}/>
                <ConversationUi ownMessage={false}/>
                <ConversationUi ownMessage={true}/>
            </Section>
            <div ref={refChat} />
            <Section>
              <Form $position="relative">
                <Div $width="100%" $padding="1rem">
                  <Input placeholder="Type a message" />
                </Div>
                <Button type="submit">
                  <IconFisend size={25} />
                </Button>
              </Form>
            </Section>
          </DivMenu>
        </Section2>
      </Wrapper>
    </Container>
  );
};

export default ChatPage;

const Container = styled.div`
  padding-top: 2rem;
  max-width: 820px;
  margin: auto;
`;
const Section = styled.section``;

const Section1 = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${({ $flex }) => $flex};
  gap: 1rem;
`;
const Section2 = styled.div`
  flex: ${({ $flex }) => $flex};
  gap: 1rem;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${({ $fd }) => $fd};
  gap: 1rem;
`;

const Wrapper = styled.div`
  display: ${({ $display }) => $display};
  padding: ${({ $padding }) => $padding};
  flex-direction: ${({ $fd }) => $fd};
  gap: 1rem;
  border-bottom: ${({ $borderBottom }) => ($borderBottom ? ".2px solid rgba(190,190,190,0.2)" : null)};
  @media screen and (max-width: 580px) {
    display: flex;
    flex-direction: column;
  }
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
  order: ${({ $order }) => $order};
`;
const Cercle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${({ $bg }) => (!$bg ? "#15803d" : "#f43f5e")};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.color};
`;

const Form = styled.form`
  position: ${({ $position }) => $position};
`;

const Input = styled.input`
  padding-left: 1rem;
  width: 100%;
  height: 3rem;
  background-color: ${({ theme }) => (theme.background === dark.background ? "#181818" : "#f1f5f9")};
  color: ${({ theme }) => theme};
  outline: none;
  border: 3px solid rgba(190, 190, 190, 0.2);
  border-radius: 10px;
  font-size: 1rem;
  &:focus {
    transition: ease-in-out 0.4s;
    border: 3px solid #8b5cf6;
  }
  &::placeholder {
    font-weight: 500;
    color: gray;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const DivMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 680px;
  border-radius: 5px;
  overflow-y: auto;
  background-color: ${({ theme }) => (theme.background === dark.background ? "#181818" : "#fff")};
`;

const Title3 = styled.h3`
  font-size: 0.9rem;
`;

const Text = styled.p`
  flex-wrap: wrap;
  padding: 0.5rem 0;
`;

const Button = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 5rem;
  height: 3rem;
  background-color: transparent;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const IconFisend = styled(FiSend)`
  color: gray;
  &:hover {
    color: #fff;
    transition: all ease-in-out 0.3s;
  }
`;
