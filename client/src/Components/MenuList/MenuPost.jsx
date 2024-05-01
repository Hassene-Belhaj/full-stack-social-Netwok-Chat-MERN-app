import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { dark } from "../../utils/ThemeColors";

const MenuPost = ({setConfirmModal, postID, username }) => {
  const { authentication } = useSelector((state) => state.auth);

  console.log(postID);
  console.log(username);

//   if (typeof window != 'undefined' && window.document) {
//     document.body.style.overflow = 'hidden';
// }

  const handleClickModal = () => {
    setTimeout(() => {
      setConfirmModal({ type: "delete", show: true, postId: postID });
    }, 300);
  };

  return (
    <DivMenu>
      {username === authentication?.username && (
        <ItemDiv onClick={() => handleClickModal(postID)}>
          <Title4>Delete</Title4>
        </ItemDiv>
      )}
      <ItemDiv>
        <Title4>Lorem</Title4>
      </ItemDiv>

      <ItemDiv>
        <Title4>Lorem</Title4>
      </ItemDiv>

      <ItemDiv>
        <Title4>Lorem</Title4>
      </ItemDiv>
    </DivMenu>
  );
};

export default MenuPost;

const DivMenu = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateY(100%);
  width: 15rem;
  height: auto;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  transition: ${({ $transition }) => ($transition ? "all ease-in-out 0.2s" : null)};
  overflow: hidden;
  background-color: ${({ theme }) => (theme.background === dark.background ? "#181818" : "#fff")};
  box-shadow: ${({ theme }) => (theme.background === dark.background ? "rgba(255,255,255, 0.1) 0px 0px 5px,rgba(255,255,255, 0.05) 0px 0px 5px" : "rgba(0, 0, 0, 0.1) 0px 0px 5px,rgba(0, 0, 0, 0.05) 0px 0px 5px")};
`;
const ItemDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 100%;
  transition: all ease-in-out 0.2s;
  border-bottom: ${({ theme }) => `solid .5px ${theme.color === dark.color ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}`};
  z-index: 100;
  &:last-child {
    border-bottom: none;
  }
`;
const Title4 = styled.div`
  text-align: center;
  cursor: pointer;
  background: transparent;
  width: 100%;
  font-weight: 600;
`;
