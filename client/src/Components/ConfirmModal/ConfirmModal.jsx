import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeletePostAction } from "../../redux/actions/actions";
import Spinner2 from "../../utils/Spinner2";
import styled from "styled-components";
import { dark } from "../../utils/ThemeColors";

const ConfirmModal = ({ confirmModal, setConfirmModal }) => {
  const dispatch = useDispatch();
  const { posts, loading, error, isDeleted } = useSelector((state) => state.posts);
  const RefModal = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!RefModal.current.contains(e.target)) {
        setConfirmModal(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  console.log(posts);

  const handleDeletePost = () => {
    dispatch(DeletePostAction(confirmModal?.postId));
  };

  useEffect(() => {
    if (isDeleted) {
      setConfirmModal({ type: "", show: false, postedId: null });
    }
  }, [isDeleted]);

  return (
    <Fixed>
      <FlexContainer ref={RefModal}>
        <DivMenu>
          {/* <ItemDiv  $height='3rem' $width='100%' $display='flex' $jc='center' $ai='center'> */}
          <Title4 $fw="500" $tt="capitalize">
            Are You sure You Want to Delete This Post
          </Title4>
          {/* </ItemDiv> */}
          <Div $width="100%" $heigh="100%" $display="flex" $ai="center" $gap="1rem" $padding="2rem 0 0 0">
            <ButtonTheme2 onClick={() => setConfirmModal(false)}>Cancel</ButtonTheme2>
            <ButtonTheme1 onClick={handleDeletePost}>{loading ? <Spinner2 width={"1.5rem"} height={"1.5rem"} /> : "Submit"}</ButtonTheme1>
          </Div>
        </DivMenu>
      </FlexContainer>
    </Fixed>
  );
};

export default ConfirmModal;

const Fixed = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 500;
`;

const FlexContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DivMenu = styled.div`
  padding: 2rem;
  max-width: 620px;
  height: auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${({ theme }) => (theme.background === dark.background ? "#181818" : "#fff")};
  box-shadow: ${({ theme }) => (theme.background === dark.background ? "rgba(255,255,255, 0.1) 0px 0px 5px,rgba(255,255,255, 0.05) 0px 0px 5px" : "rgba(0, 0, 0, 0.1) 0px 0px 5px,rgba(0, 0, 0, 0.05) 0px 0px 5px")};
`;
const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0 0 0;
`;

const Title4 = styled.h4`
  font-weight: 500;
  text-transform: capitalize;
`;

const ButtonTheme1 = styled.button`
  position: relative;
  width: 100%;
  height: 2.5rem;
  padding: 8px;
  font-weight: 600;
  background-color: ${({ theme }) => (theme.background === dark.background ? "#f1f5f9" : "#101010")};
  color: ${({ theme }) => (theme.background === dark.background ? "#0A0A0A" : "#f1f5f9")};
  border-radius: 10px;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    opacity: 0.8;
  }
`;

const ButtonTheme2 = styled.button`
  position: relative;
  width: 100%;
  height: 2.5rem;
  padding: 8px;
  font-weight: 600;
  background-color: ${({ theme }) => (theme.background === dark.background ? "#101010" : "#f1f5f9")};
  color: ${({ theme }) => (theme.background === dark.background ? "#f1f5f9" : "#0A0A0A")};
  border-radius: 10px;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    opacity: 0.8;
  }
`;
