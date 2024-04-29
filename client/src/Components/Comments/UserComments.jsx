import React from "react";
import { useState } from "react";
import MenuList from "../MenuList/MenuPost";
import { BsThreeDots } from "react-icons/bs";
import ButtonsGroup from "../ButtonsGroup/ButtonsGroup";
import styled from "styled-components";
import { dark } from "../../utils/ThemeColors";

const UserComments = ({ id, lastPost, userProfilePic, createdAt, comment, username, text, likes }) => {
  const [menuList, setMenuList] = useState(false);

  const handleBlur = () => {
    setTimeout(() => {
      setMenuList(false);
    }, 300);
  };

  // console.log(lastPost === id)

  return (
    <ContainerBorderBottom $active={lastPost !== id}>
      <Section1>
        <FlexContainer1>
          <Div $width="3rem" $height="3rem">
            <Image src={userProfilePic} />
          </Div>
          <Div $display="flex" $ai="center">
            <Title5>{username}</Title5>
          </Div>
        </FlexContainer1>

        <FlexContainer2>
          <Div $display="flex" $ai="center" $gap="1rem">
            <Title5 $color="gray">{}</Title5>
            <ButtonScaleEffect onClick={() => setMenuList(!menuList)} onBlur={handleBlur}>
              <BsThreeDots size={15} color="gray" />
            </ButtonScaleEffect>
          </Div>
          {menuList && <MenuList />}
        </FlexContainer2>
      </Section1>
      <Section2>
        <Text>{text}</Text>
        {/* <ButtonsGroup padding="0 0 0 .5rem" like={like} handleClickLike={handleClickLike} /> */}
        <Div $display="flex" $padding="0 0 0 1rem" $ai="center">
          <Text $color="gray">
            {" "}
            mentions <Span> &#x2022; </Span>
            {likes.length} likes
          </Text>
        </Div>
      </Section2>
    </ContainerBorderBottom>
  );
};

export default UserComments;

const ContainerBorderBottom = styled.div`
  padding: 1rem 0;
  border-bottom: ${({ theme, $active }) => ($active ? `solid .5px ${theme.color === dark.color ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}` : "")};
`;

const Section1 = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Section2 = styled.section`
  padding: 0 0 0 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FlexContainer1 = styled.div`
  display: flex;
  gap: 1rem;
`;
const FlexContainer2 = styled.div`
  position: relative;
  display: flex;
`;

const Div = styled.div`
  padding: ${({ $padding }) => $padding};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  position: ${({ $position }) => $position};
  display: ${({ $display }) => $display};
  justify-content: ${({ $jc }) => $jc};
  align-items: ${({ $ai }) => $ai};
  gap: ${({ $gap }) => $gap};
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const Text = styled.p`
  padding: 0 0 0 1rem;
  color: ${({ $color }) => $color};
`;
const Span = styled.span`
  margin: 0 0.5rem;
`;

const Title5 = styled.h5``;

const ButtonScaleEffect = styled.button`
  padding: 8px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.background};
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    background-color: ${({ theme }) => (theme.background === dark.background ? "#262626" : "#e5e7eb")};
  }
  &:active {
    scale: 0.9;
  }
`;
