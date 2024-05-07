import React, { useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import ButtonsGroup from "../ButtonsGroup/ButtonsGroup";
import moment from "moment";
import verified from "/verified.png";
import MenuPost from "../MenuList/MenuPost";
import styled from "styled-components";
import { dark } from "../../utils/ThemeColors";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const PostPage = ({replyModal , setReplyModal, confirmModal, setConfirmModal, id, username, postedBy, profilePic, text, image, likes, replies, createdAt }) => {
  const [menuList, setMenuList] = useState(false);
  const [userLikes , setUserLikes] = useState(likes)

  console.log(username)

  const handleBlur = () => {
    setTimeout(() => {
      setMenuList(false);
    }, 300);
  };



  return (
    <ContainerBorderBottom $active>
      <FlexContainer $display="flex" $gap=".5rem" $jc="space-between" $width="100%">
        <FlexContainer $display="flex" $gap="1rem">
          <Div $width="4rem" $height="4rem">
            <Image $width="100%" $height="100%" src={profilePic} $br="50%" $objectfit="cover" />
          </Div>

          <Div $display="flex" $ai="center" $gap=".5rem">
            <Title4>{postedBy?.username}</Title4>
            <Div $padding='0 0 0 2rem' $width="auto" $display="flex" $jc="center" $ai="center">
              <Title5 $fs='0.9rem'>{moment(createdAt).startOf("day").fromNow()}</Title5>
            </Div>
          </Div>
        </FlexContainer>

        <FlexContainer $display="flex" $position="relative">
          <Div $display="flex" $ai="center" $gap="1rem">
            <ButtonScaleEffect onClick={() => setMenuList(!menuList)} onBlur={handleBlur} $padding="8px" $br="50%" $border="none" $display="flex" $jc="center" $ai="center">
              <BsThreeDots size={25} color="gray" />
            </ButtonScaleEffect>
          </Div>
          {menuList && <MenuPost confirmModal={confirmModal} setConfirmModal={setConfirmModal} postID={id} username={username} />}

        </FlexContainer>
      </FlexContainer>

      <FlexContainer $display="flex" $fd="column" $gap="1rem">
        <Title3>{text}</Title3>
        <Div $width="100%">
          <Image $width="100%" $br="15px" src={image} />
        </Div>
        <ButtonsGroup replyModal={replyModal} setReplyModal={setReplyModal} likes={likes} id={id} userLikes={userLikes} setUserLikes={setUserLikes} />
      </FlexContainer>

      <FlexContainer $display="flex" $gap="1rem" $padding="1rem 0 0 0">
        <Div $display="flex" $ai="center">
          <Text $color="gray">
            {replies?.length} replies 
            <Span $margin="0 .5rem"> &#x2022; </Span>
            {userLikes?.length} likes
          </Text>
        </Div>
      </FlexContainer>
    </ContainerBorderBottom>
  );
};

export default PostPage;

const ContainerBorderBottom = styled.div`
  padding: 1rem 0;
  border-bottom: ${({ theme, $active }) => ($active ? `solid .5px ${theme.color === dark.color ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}` : "")};
`;
const Div = styled.div`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  display: ${({ $display }) => $display};
  justify-content: ${({ $jc }) => $jc};
  align-items: ${({ $ai }) => $ai};
  gap: ${({ $gap }) => $gap};
  position: ${({ $position }) => $position};
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  right: ${({ $right }) => $right};
  transform: ${({ $transform }) => $transform};
  background: ${({ $bg }) => $bg};
  padding: ${({$padding})=>$padding};
`;
const FlexContainer = styled.div`
  display: ${({ $display }) => $display};
  justify-content: ${({ $jc }) => $jc};
  align-items: ${({ $ai }) => $ai};
  flex-direction: ${({ $fd }) => $fd};
  gap: ${({ $gap }) => $gap};
  position: ${({ $position }) => $position};
  padding: ${({ $padding }) => $padding};
`;
const Image = styled.img`
  display: ${({ $display }) => $display};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: ${({ $br }) => $br};
  object-fit: ${({ $objectfit }) => $objectfit};
`;
const Text = styled.p`
  padding: 1rem 0 0 0.5rem;
  color: gray;
  font-size: 1.1rem;
`;
const Title3 = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  padding: 1rem 0 0 0.5rem;
`;
const Title4 = styled.h4`
`;
const Title5 = styled.h5`
  color: gray;
  text-transform: capitalize;
  font-size: ${({$fs})=>$fs};
`;
const Span = styled.span`
  color: ${({ $color }) => $color};
  margin: ${({ $margin }) => $margin};
`;
const ButtonScaleEffect = styled.button`
  padding: ${({ $padding }) => $padding};
  display: ${({ $display }) => $display};
  justify-content: ${({ $jc }) => $jc};
  align-items: ${({ $ai }) => $ai};
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.background};
  border: ${({ $border }) => $border};
  border-radius: ${({ $br }) => $br};
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: ${({ theme }) => (theme.background === dark.background ? "#262626" : "#e5e7eb")};
  }
  &:active {
    scale: 0.9;
  }
`;
