import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { dark } from "../../utils/ThemeColors";
import { getSinglePostAction } from "../../redux/actions/actions";
import { useState } from "react";
import Spinner from "../../utils/Spinner";
import verified from "/verified.png";
import moment from "moment";

const CommentModal = ({ commentModal, setCommentModal }) => {
  const [postComment, setPostComment] = useState("");

  const dispatch = useDispatch();
  const refModal = useRef(null);
  const refScroll = useRef(null);

  const { singlePost, loading } = useSelector((state) => state.posts);
  const { authentication } = useSelector((state) => state.auth);

  useEffect(() => {
    const handler = (e) => {
      if (!refModal.current.contains(e.target)) {
        setCommentModal(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const keypress = (e) => {
      if (e.key === "Escape") {
        setCommentModal({ ...commentModal, show: false });
      }
    };
    document.addEventListener("keydown", keypress);
    return () => document.removeEventListener("keydown", keypress);
  }, []);

  useEffect(() => {
    dispatch(getSinglePostAction(commentModal.postId));
  }, []);

  useEffect(() => {
    if(refScroll.current) {
      refScroll.current.scrollIntoView();
    }
  }, [commentModal.show,!loading]); // if showModal.show is true and loading is finished

  const maxLength = 500;

  const handleChangeComment = (e) => {
    if (postComment.length > maxLength) {
      let text = e.target.value;
      return setPostComment(text.slice(0, maxLength));
    } else {
      setPostComment(e.target.value);
    }
  };

  //   if(loading) return <Fixed><Container><DivMenu $jc='center' $ai='center'><Spinner Size={'8px'}/></DivMenu></Container></Fixed>
  // else {
  return (
    <Fixed>
      <Container>
        <DivMenu ref={refModal}>
          <Section $display="flex" $padding="2rem" $position="relative">
            <FlexContainer $position="relative">
              <DivLine></DivLine>
              <Div $width="5rem" $height="5rem">
                <Image $width="5rem" $height="5rem" $br="50%" $objectfit="cover" src={singlePost?.postedBy?.profilePic} />
              </Div>
            </FlexContainer>

            <Div $width="100%" $margin="0 0 0 1rem">
              <Div $display="flex" $jc="space-between">
                <FlexContainer $display="flex" $position="relative">
                  <Title4>{singlePost?.postedBy?.username}</Title4>
                  <Div $width="1.3rem" $display="flex" $jc="center" $ai="center" $margin="0 0 0 .5rem">
                    <Image $width="100%" src={verified} $br="15px" />
                  </Div>
                </FlexContainer>
                <Div>
                  <Title4 $color="gray" $fs="0.9rem">
                    {moment(singlePost.createdAt).startOf("day").fromNow()}
                  </Title4>
                </Div>
              </Div>
              <Text>{singlePost?.text}</Text>
              <Div $width="100%" $padding=".5rem 0">
                <Image $width="100%" $objectfit="cover" $br="15px" src={singlePost?.image} />
              </Div>
            </Div>
          </Section>

          <Section $display="flex" $padding="2rem">
            <FlexContainer $position="relative">
              <DivLine2></DivLine2> 
              <DivLine3></DivLine3>
              <Div $width="5rem" $height="5rem" $position="relative">
                <Image $width="5rem" $height="5rem" $br="50%" $objectfit="cover" src={authentication?.profilePic} />
              </Div>
            </FlexContainer>
            <Div $width="100%" $margin="0 0 0 1rem">
              <Div $display='flex'>
              <Title4>{authentication?.username}</Title4>
               <Div $width="1.3rem" $display="flex" $jc="center" $ai="center" $margin="0 0 0 .5rem">
                    <Image $width="100%" src={verified} $br="15px" />
                </Div>
              </Div>
              <Div $padding=".5rem 0">
                <TextArea name='Textarea' placeholder={`reply to ${singlePost?.postedBy?.username}`} autoComplete="off" value={postComment} onChange={handleChangeComment} />
                <Text $ta="right" $color={maxLength - postComment.length > 0 ? "gray" : "red"}>
                  {maxLength - postComment.length}
                </Text>
                <ButtonTheme2>Publish</ButtonTheme2>
              </Div>
            </Div>
          </Section>
          <div ref={refScroll} />
        </DivMenu>
      </Container>
    </Fixed>
  );
};
// }

export default CommentModal;

const Fixed = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 700;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
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

const DivMenu = styled.div`
  max-width: 620px;
  height: 700px;
  display: flex;
  justify-content: ${({ $jc }) => $jc};
  align-items: ${({ $ai }) => $ai};
  flex-direction: column;
  border-radius: 25px;
  overflow-y: auto;
  background-color: ${({ theme }) => (theme.background === dark.background ? "#181818" : "#fff")};
  box-shadow: ${({ theme }) => (theme.background === dark.background ? "rgba(255,255,255, 0.1) 0px 0px 5px,rgba(255,255,255, 0.05) 0px 0px 5px" : "rgba(0, 0, 0, 0.1) 0px 0px 5px,rgba(0, 0, 0, 0.05) 0px 0px 5px")};
  margin: auto;
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
  height: calc(100% - 3rem);
  width: 0.5px;
  background: gray;
`;

const DivLine2 = styled.div`
  position: absolute;
  top: 6rem;
  left: 50%;
  transform: translate(-50%);
  height: calc(100% - 8rem);
  width: 0.5px;
  background: gray;
  `;

const DivLine3 = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 50%;
  transform: translate(100%);
  height: .5px;
  width: 3rem;
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
  font-weight: 400;
  text-align: ${({ $ta }) => $ta};
  color: ${({ $color }) => $color};
`;

const Title4 = styled.h4`
  color: ${({ $color }) => $color};
  font-size: ${({ $fs }) => $fs};
`;

const Title3 = styled.h3`
  padding: ${({ $padding }) => $padding};
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  background: transparent;
  color: "#f1f1f1";
`;

const ButtonTheme2 = styled.button`
  margin: 1rem 0 0 0;
  position: relative;
  width: 100%;
  height: 3rem;
  padding: 8px;
  font-weight: 600;
  background-color: ${({ theme }) => (theme.background === dark.background ? "#101010" : "#f1f5f9")};
  color: ${({ theme }) => (theme.background === dark.background ? "#f1f5f9" : "#0A0A0A")};
  border-radius: 25px;
  cursor: pointer;
  outline: none;
  border: 2px solid gray;
  &:hover {
    opacity: 0.8;
  }
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  background: transparent;
  color: ${({ theme }) => theme.color};
  outline: none;
  border: 2px solid rgba(0, 0, 0, 0);
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 10rem;
  padding: 12px;
  outline: none;
  border-radius: 15px;
  resize: none;
  background-color: transparent;
  color: ${({ theme }) => theme.color};
  outline: none;
  border: ${({ theme }) => (theme.background === dark.background ? "3px solid rgba(255,255,255,0.05)" : "2px solid rgba(0,0,0,0.2)")};
  padding: ${({ $padding }) => $padding};
  height: ${({ $height }) => $height};
  font-size: 1rem;
  margin: auto;
  &:focus {
    /* border: ${({ theme }) => (theme.background === dark.background ? "3px solid rgba(255,255,255,0.5)" : "2px solid rgba(0,0,0,0.5)")}; */
    transition: ease-in-out 0.3s;
  }
  &::placeholder {
    font-weight: 500;
  }
`;
