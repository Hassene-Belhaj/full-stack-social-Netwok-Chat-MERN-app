import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { TbMessageCircle } from "react-icons/tb";
import { GrSync } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import { dark } from "../../utils/ThemeColors";

const ButtonsGroup = ({ likes, padding, id, userLikes, setUserLikes }) => {
  const { authentication } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  // console.log(authentication.id)

  const likeunlike = async () => {
    try {
      const { data } = await axios.post(`posts/post/like/${id}`);
      console.log(data.resp.likes);
      if (!userLikes.includes(authentication.id)) {
        setUserLikes([...userLikes, authentication.id]);
      } else {
        const unlike = userLikes.filter((id) => id !== authentication.id);
        setUserLikes(unlike);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FlexContainer $padding={padding ? padding : null}>
      <ButtonScaleEffect onClick={likeunlike}>{!userLikes?.includes(authentication.id) ? <FaRegHeart size={25} /> : <FaHeart color="#ef4444" size={25} />}</ButtonScaleEffect>

      <ButtonScaleEffect>
        <TbMessageCircle size={25} />
      </ButtonScaleEffect>

      <ButtonScaleEffect>
        <GrSync size={25} />
      </ButtonScaleEffect>

      <ButtonScaleEffect>
        <FiSend size={25} />
      </ButtonScaleEffect>
    </FlexContainer>
  );
};

export default ButtonsGroup;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: ${({ $padding }) => $padding};
`;
const ButtonScaleEffect = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 50%;
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
