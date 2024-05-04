import React from "react";
import styled from "styled-components";
import verified from "/verified.png";
import { dark } from "../../utils/ThemeColors";
import ButtonsGroup from "../ButtonsGroup/ButtonsGroup";
import moment from 'moment'
import { useParams } from "react-router-dom";

const RepliesUserPost = ({user,id,createdAt,image,likes,postedBy,replies,text}) => {

  return (
    <Container $active>
      <Section $display="flex" $padding="2rem 0" $position="relative">
        <FlexContainer $position="relative">
          <DivLine></DivLine>
          <Div $width="4rem" $height="4rem">
            <Image $width="100%" $height="100%" $br="50%" $objectfit="cover" src={postedBy?.profilePic} />
          </Div>
        </FlexContainer>
        <Div $width="100%" $margin="0 0 0 1rem">
          <Div $display="flex" $jc="space-between">
            <FlexContainer $display="flex" $position="relative">
              <Title4>{postedBy.username}</Title4>
              <Div $width="1.3rem" $display="flex" $jc="center" $ai="center" $margin="0 0 0 .5rem">
                <Image $width="100%" src={verified} $br="15px" />
              </Div>
            </FlexContainer>
            <Div>
              <Title4 $color="gray" $fs="0.9rem">
                {moment(createdAt).startOf("day").fromNow()}
              </Title4>
            </Div>
          </Div>
          <Div $padding='.5rem 0'>
              <Text>{text}</Text>
          </Div>
          <Div $width="100%" $padding=".5rem 0">
            <Image $width="100%" $objectfit="cover" $br="15px" src={image} />
            <Div $padding='.5rem 0 0 0'>
                <ButtonsGroup />
            </Div>
          </Div>
        </Div>
      </Section>

       {replies.map(({userID,text,userProfilePic,username,_id},i) => {
        if(userID === user._id) {
          return (
        <Section key={i} $display="flex" $padding="2rem 0">
              <FlexContainer $position="relative">
                <DivLine2></DivLine2>
                <Div $width="4rem" $height="4rem" $position="relative">
                  
                  <Image $width="100%" $height="100%" $br="50%" $objectfit="cover" src={userProfilePic} />

                </Div>
              </FlexContainer>
              <Div $width="100%" $margin="0 0 0 1rem">
                <Div $display="flex">
                  <Title4>{username}</Title4>
                  <Div $width="1.3rem" $display="flex" $jc="center" $ai="center" $margin="0 0 0 .5rem">
                    <Image $width="100%" src={verified} $br="15px" />
                  </Div>
                </Div>
                <Text>{text}</Text>
                <Div $padding='.5rem 0 0 0'>
                      <ButtonsGroup />
                  </Div>
              </Div>
            </Section>
          )
        }
       })} 
   
      
    </Container>
  );
};

export default RepliesUserPost;



const Container = styled.div`
padding: 0 0 1rem 0;
border-bottom: ${({ theme, $active }) => ($active ? `solid .5px ${theme.color === dark.color ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}` : "")};
`;

const Section = styled.section`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: ${({ $padding }) => $padding};
  margin: ${({ $margin }) => $margin};
  display: ${({ $display }) => $display};
  align-items: ${({ $ai }) => $ai};
  gap: ${({ $gap }) => $gap};
`;

const Div = styled.div`
  padding: ${({ $padding }) => $padding};
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
  text-align: ${({ $ta }) => $ta};
  flex: ${({ $flex }) => $flex};
  background: ${({ $bg }) => $bg};
  margin: ${({ $margin }) => $margin};
`;

const DivLine = styled.div`
  position: absolute;
  top: 6rem;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  height: calc(100% - 4rem);
  width: 1px;
  background: gray;
`;

const DivLine2 = styled.div`
  position: absolute;
  top: 4rem;
  left: 50%;
  transform: translate(-50%);
  height: calc(100% - 9rem);
  width: 2px;
  background: gray;
`;

const FlexContainer = styled.div`
  display: ${({ $display }) => $display};
  justify-content: ${({ $jc }) => $jc};
  align-items: ${({ $ai }) => $ai};
  flex-direction: ${({ $fd }) => $fd};
  gap: ${({ $gap }) => $gap};
  position: ${({ $position }) => $position};
  padding: ${({ $padding }) => $padding};
  background: ${({ $bg }) => $bg};
  flex: ${({ $flex }) => $flex};
  height: ${({ $height }) => $height};
`;

const Image = styled.img`
  display: ${({ $display }) => $display};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: ${({ $br }) => $br};
  object-fit: ${({ $objectfit }) => $objectfit};
`;

const Text = styled.p`
    padding: 0.5rem 0;
    font-size : 1.1rem; 
    text-align: ${({ $ta }) => $ta};
    color: ${({ $color }) => $color};
`;

const Title4 = styled.h4`
  color: ${({ $color }) => $color};
  font-size: ${({ $fs }) => $fs};
`;
