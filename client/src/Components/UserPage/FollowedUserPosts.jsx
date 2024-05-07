import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import ButtonsGroup from "../ButtonsGroup/ButtonsGroup";
import verified from "/verified.png";
import moment from "moment";
import emoji from "/boredEmoji.png";
import MenuPost from "../MenuList/MenuPost";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import { dark } from "../../utils/ThemeColors";
import Spinner from "../../utils/Spinner";
import UserCardProfile from "../Card/UserCardProfile";

const FollowedUserPosts = ({replyModal,setReplyModal, confirmModal , authentication , setConfirmModal,id,userID , profilePic, bio, postTitle, postImage, username, likes, replies, createdAt , followers , following }) => {

  const RefDivClick = useRef(null);
  const [userLikes , setUserLikes] = useState(likes)
  const [menuList, setMenuList] = useState(false);
  const [showUserCardProfile, setShowUserCardProfile] = useState(false);

  const handleBlur = () => {
    setTimeout(() => {
      setMenuList(false);
    }, 300);
  };

  const MouseEnterShowUserCardProfile = () => {
  setTimeout(() => { setShowUserCardProfile(true) }, 300)
  }

  const MouseLeaveShowUserCardProfile = () => {
  setTimeout(() => { setShowUserCardProfile(false) }, 300)
  }



    return (
      <Container>
      <FlexContainer $display="flex" $gap="1rem">
        <Div $width="4rem" $position="relative">
          <Navlink to={`/${username}`}>
            <Image $width="4rem" $height="4rem" $objectfit="cover" src={profilePic} $br="50%" />
          </Navlink>

          <Div $position="absolute" $top="5rem" $left="50%" $transform="translateX(-50%)" $width="1px" $height="calc(100% - 5rem)" $bg="gray"></Div>
        </Div>

        <FlexContainer  $width='100%' $display="flex"   $gap="1rem"  >
          <FlexContainer $width='100%' $display="flex" $fd="column" $gap="1rem">
            <FlexContainer $display="flex" $jc="space-between" $position="relative">
              <Div $display="flex" $ai="center" $gap=".5rem" >
                  <Div $position='relative' onMouseEnter={MouseEnterShowUserCardProfile} onMouseLeave={MouseLeaveShowUserCardProfile} >
              {showUserCardProfile && (
                <UserCardProfile  userID={userID} authentication={authentication} username={username} profilePic={profilePic} followers={followers} following={following} bio={bio} />
                )}
                <Navlink to={`/${username}`} $td="none" $underline>
                     <Title4 >{username}</Title4>
                </Navlink>
                  </Div>
                <Div $padding='0 0 0 2rem' $width="auto" $display="flex" $ai="center" >                  
                  <Title5 $fs='0.9rem' >{moment(createdAt).endOf('day').fromNow()}</Title5>
                </Div>
              </Div>

              <Div $display="flex" $ai="center" $gap="1rem">
                {/* <Title5 >{moment(createdAt).startOf("day").fromNow()}</Title5> */}
                <ButtonScaleEffect onClick={() => setMenuList(!menuList)} onBlur={handleBlur} $padding="8px" $br="50%" $border="none" $display="flex" $jc="center" $ai="center">
                  <BsThreeDots size={25} color="gray" />
                </ButtonScaleEffect>
              </Div>

              {menuList && <MenuPost confirmModal={confirmModal} setConfirmModal={setConfirmModal} postID={id} username={username} />}
            </FlexContainer>

             <Navlink to={`/${username}/post/${id}`} $td='none'>
                 <Text>{postTitle}</Text>
              </Navlink>
  
            <Div $width="100%" $height="100%" ref={RefDivClick}>
              <Navlink to={`/${username}/post/${id}`}>
                <Image $width='100%' $height='100%' $display='flex' $br='15px' $objectfit='cover' src={postImage} />
              </Navlink>
            </Div>

            <ButtonsGroup replyModal={replyModal} setReplyModal={setReplyModal} likes={likes} id={id} userLikes={userLikes} setUserLikes={setUserLikes}/>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>

      <FlexContainer $display="flex" $gap="1rem" $padding="1rem 0 0 0">
        <Div $width="4rem" $height="4rem" $position="relative" $bg="transparent">

          {replies[0] ? (
            <Navlink to={`/${replies[0].username}`}>
              <Div $position="absolute" $top="12px" $right="50%" $transform="translate(50%)" $width="1.6rem" $height="1.6rem">
                <Image $br="50%" $width="100%" $height="100%" $objectfit="cover" src={replies[0].userProfilePic} />
              </Div>
            </Navlink>
          ) : (
            <Div $position="absolute" $top="12px" $right="50%" $transform="translate(50%)" $width="1.6rem" $height="1.6rem" $display="flex" $jc="center" $ai="center">
              <Image $width="100%" $bg="transparent" src={emoji} />
            </Div>
          )}
          {replies[1] && (
            <Navlink to={`/${replies[1].username}`}>
              <Div $position="absolute" $top="42px" $right="0" $width="1.6rem" $height="1.6rem">
                <Image $br="50%" $width="100%" $height="100%" $objectfit="cover" src={replies[1].userProfilePic} />
              </Div>
            </Navlink>
          )}
          {replies[2] && (
            <Navlink to={`/${replies[2].username}`}>
              <Div $position="absolute" $top="42px" $left="0" $width="1.6rem" $height="1.6rem">
                <Image $br="50%" $width="100%" $height="100%" $objectfit="cover" src={replies[2].userProfilePic} />
              </Div>
            </Navlink>
          )}
        </Div>
        <Div $display="flex" $ai="center">
          <Navlink to={`/${username}/post/${id}`} $td="none" $selectedColor="gray">
            <Text >{replies.length} Replies</Text>
          </Navlink>
          <Span $color="gray" $margin="0 .5rem">
            &#x2022;
          </Span>
          <Navlink $td="none" $selectedColor="gray">
            <Text $color="gray">{userLikes?.length || 0} likes</Text>
          </Navlink>
        </Div>
      </FlexContainer>
    </Container>
  );
};


export default FollowedUserPosts;

const Container = styled.div`
  height: ${({$height})=>$height};
  display: ${({$display})=>$display};
  justify-content: ${({$jc})=>$jc};
  align-items: ${({$ai})=>$ai};
  padding: 2rem 0;
  border-bottom: ${({ theme, $active }) => ($active ? `solid .5px ${theme.color === dark.color ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}` : "")};
`;
const FlexContainer = styled.div`
  width: ${({$width})=>$width};
  display: ${({ $display }) => $display};
  justify-content: ${({ $jc }) => $jc};
  align-items: ${({ $ai }) => $ai};
  flex-direction: ${({ $fd }) => $fd};
  gap: ${({ $gap }) => $gap};
  position: ${({ $position }) => $position};
  background-color: ${({$bg})=>$bg};
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
const Image = styled.img`
  display: ${({$display})=>$display};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: ${({ $br }) => $br};
  object-fit: ${({ $objectfit }) => $objectfit};
`;
const Navlink = styled(Link)`
  text-decoration: ${({ $td }) => $td};
  color: ${({ theme,$selectedColor }) => $selectedColor ? $selectedColor :  theme.color };
  &:hover {
    text-decoration: ${({$underline})=>$underline ? 'underline' : null};
    text-underline-offset: 4px;
  }
`;
const Text = styled.p`
  font-size: 1.1rem;
`;
const Title4 = styled.h4`
`;
const Title5 = styled.h5`
  color: gray;
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
