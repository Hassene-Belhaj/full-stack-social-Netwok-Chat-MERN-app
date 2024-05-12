import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { dark } from "../../utils/ThemeColors";
import { FiSend } from "react-icons/fi";
import { BiConversation } from "react-icons/bi";
import { BiCheckDouble } from "react-icons/bi";
import ConversationUi from "./ConversationUi";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinner2 from "../../utils/Spinner2";

const ChatPage = () => {
  const refChat = useRef(null);
  const { authentication } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [conversationData, setConversationData] = useState(null);

  const [conversationId, setConversationId] = useState(null);
  const [messagesData, setMessagesData] = useState(null);
  const [active, setActive] = useState(true);
  const [inputMessage, setInputMessage] = useState({ recipientID: "", text: "" });
  const [index, setIndex] = useState(null);

  console.log(conversationData);

  const getConversation = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/chat/conversations");
      setConversationData(data.conversations);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getMessage = async (id, i) => {
    setIndex(i);
    setInputMessage({ ...inputMessage, recipientID: id });
    setConversationId(null);
    try {
      setLoadingMessages(true);
      const { data } = await axios.get(`/chat/${id}`);
      setMessagesData(data.allMessages);
      setConversationId(data.conversationId);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.text) return;
    try {
      const { data } = await axios.post("/chat/messages", {
        recipientID: inputMessage.recipientID,
        message: inputMessage.text,
      });
      setMessagesData([...messagesData, data.newMsg]);

      setConversationData((prev) => {
        const updateConversation = prev.map((conversation) => {
          if (conversation._id === conversationId) {
            return {
              ...conversation,
              lastMessage: {
                sender: { _id: authentication.id, username: authentication.username, email: authentication.email, profilePic: authentication.profilePic },
                text: inputMessage.text,
              },
            };
          } else {
            return conversation;
          }
        });
        return updateConversation;
      });
    } catch (error) {
      console.log(error);
    }
    setInputMessage({ ...inputMessage, text: "" });
  };

  useEffect(() => {
    getConversation();
  }, []);

  useEffect(() => {
    if (refChat.current) {
      refChat.current.scrollIntoView();
    }
  }, [index, sendMessage]);

  return (
    <Container>
      <Wrapper $display="flex">
        <Section1 $flex="2">
          {!loading && (
            <>
              Connected Users
              {conversationData &&
                conversationData.map(({ lastMessage, participants }, i) => {
                  return (
                    <FlexContainer $active={active && index === i} key={i} onClick={() => getMessage(participants[0]._id, i)}>
                      <Div $width="4rem" $height="4rem" $position="relative">
                        <Image src={participants[0].profilePic} />
                        {/* <Cercle></Cercle> */}
                      </Div>
                      <Div>
                        <Title3>{participants[0].username}</Title3>
                        <Div $display="flex" $ai="center" $gap=".5rem">
                          {lastMessage.sender._id !== authentication.id && <BiCheckDouble />}
                          <Text>{lastMessage.text.length > 24 ? lastMessage.text.substring(0, 24) + "..." : lastMessage.text}</Text>
                        </Div>
                      </Div>
                    </FlexContainer>
                  );
                })}
            </>
          )}
          {loading && (
            <>
              Connected Users
              {Array(5)
                .fill(0)
                .map((item, i) => {
                  return (
                    <FlexContainerFrames key={i}>
                      <Div $width="4rem" $height="4rem" $position="relative">
                        <LoadingAvatar $width="4rem" $height="4rem" $bg="gray"></LoadingAvatar>
                      </Div>
                      <Div $display="flex" $fd="column" $jc="space-between" $gap="1rem">
                        <LoadingAvatar $width="4rem" $height="1rem" $bg="gray"></LoadingAvatar>
                        <LoadingAvatar $width="10rem" $height="1rem" $bg="gray"></LoadingAvatar>
                      </Div>
                    </FlexContainerFrames>
                  );
                })}
            </>
          )}
        </Section1>
        <Section2 $flex="3">
          <DivMenu>
            <Section>
              <Wrapper $display="flex" $padding="1rem" $borderBottom>
                <Div $width="3rem" $height="3rem">
                  <Image src={authentication.profilePic} />
                </Div>
                <Div $display="flex" $jc="center" $ai="center">
                  <Title3>{authentication.username}</Title3>
                </Div>
              </Wrapper>
              {!loadingMessages ? (
                <Div $padding="10rem 0">
                  <Spinner2 />
                </Div>
              ) : (
                <>
                  {!messagesData?.length ? (
                    <Div $height="500px" $display="flex" $jc="center" $ai="center">
                      <BiConversation size="50" />
                    </Div>
                  ) : (
                    <>
                      {messagesData.map((messages, i) => {
                        return <ConversationUi key={i} messages={messages} ownMessage={messages.sender._id === authentication.id ? true : false} />;
                      })}
                    </>
                  )}
                </>
              )}
            </Section>
            <div ref={refChat} />
            {messagesData?.length && (
              <Section>
                <Form onSubmit={sendMessage}>
                  <Div $display="flex" $width="100%" $padding="1rem">
                    <Input placeholder="Type a message" value={inputMessage.text} onChange={(e) => setInputMessage({ ...inputMessage, text: e.target.value })} />
                    <Button type="submit">
                      <IconFisend color="gray" size={25} />
                    </Button>
                  </Div>
                </Form>
              </Section>
            )}
          </DivMenu>
        </Section2>
      </Wrapper>
    </Container>
  );
};

export default ChatPage;

const Container = styled.div`
  padding: 2rem 0;
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
  align-items: center;
  flex-direction: ${({ $fd }) => $fd};
  gap: 1rem;
  padding: 1rem;
  background: ${({ $active }) => ($active ? "rgba(170, 170, 170, 0.1)" : null)};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: rgba(170, 170, 170, 0.1);
    transition: all ease-in-out 0.3s;
    border-radius: 5px;
  }
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
  flex-direction: ${({ $fd }) => $fd};
  justify-content: ${({ $jc }) => $jc};
  align-items: ${({ $ai }) => $ai};
  height: ${({ $height }) => $height};
  position: ${({ $position }) => $position};
  padding: ${({ $padding }) => $padding};
  background-color: ${({ $bg }) => $bg};
  border-radius: ${({ $br }) => $br};
  color: ${({ $color }) => ($color ? $color : "")};
  order: ${({ $order }) => $order};
  gap: ${({ $gap }) => $gap};
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
  display: flex;
`;
const Input = styled.input`
  padding-left: 1rem;
  width: calc(100% - 5rem);
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
  box-shadow: ${({ theme }) => (theme.background === dark.background ? "rgba(255,255,255, 0.1) 0px 0px 5px,rgba(255,255,255, 0.05) 0px 0px 5px" : "rgba(0, 0, 0, 0.1) 0px 0px 5px,rgba(0, 0, 0, 0.05) 0px 0px 5px")};
`;
const Title3 = styled.h3`
  font-size: 0.9rem;
`;
const Text = styled.p`
  flex-wrap: wrap;
  padding: 0.5rem 0;
`;
const Button = styled.button`
  width: 5rem;
  height: 3rem;
  background-color: transparent;
  outline: none;
  border: none;
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
const LoadingAvatar = styled.div`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  background-color: ${({ $bg }) => $bg};
  padding: ${({ $padding }) => $padding};
`;
const FadeIn = keyframes`
from {
  opacity: 0.8;
  transition: all  ease-in-out 0.3s;
}
to {
  opacity : 0.4;
  transition: all  ease-in-out 0.3s;
}

`;
const FlexContainerFrames = styled.div`
  animation-name: ${FadeIn};
  animation-duration: 700ms;
  animation-delay: 100ms;
  animation-iteration-count: infinite;
  display: flex;
  gap: 1rem;
`;

// const TextColor = styled.p`
//   ${({ $color }) => {
//     switch ($color) {
//       case "lightRed":
//         return css`
//           color: #FF6864;
//         `;
//       case "yellow":
//         return css`
//           color: #FFCA28;
//         `;
//       case "black":
//         return css`
//           color: #181E1E;
//         `;
//       case "red":
//         return css`
//           color: #E63946;
//         `;
//     }
//   }}
// `;