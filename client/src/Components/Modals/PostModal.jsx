import React, { useEffect, useRef, useState } from "react";
import { IconAiOutlineClose, IconIoIosImages } from "../../utils/Icons";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Spinner2 from "../../utils/Spinner2";
import { CreateNewPostAction } from "../../redux/actions/actions";
import styled from "styled-components";
import { dark } from "../../utils/ThemeColors";

const PostModal = ({ postModel, setPostModal }) => {
  const dispatch = useDispatch();
  const RefModal = useRef(null);
  const RefInputFile = useRef(null);
  const [postMessage, setPostMessage] = useState("");
  const [imagePost, setImagePost] = useState(null);
  // const [loading, setLoading] = useState(false);

  const {
    authentication: { id, username, profilePic },
  } = useSelector((state) => state.auth);
  const { posts, loading, isAdded, isDeleted } = useSelector((state) => state.posts);

  useEffect(() => {
    const keypress = (e) => {
      if (e.key === "Escape") {
        setPostModal(false);
      }
    };
    document.addEventListener("keydown", keypress);
    return () => document.removeEventListener("keydown", keypress);
  }, []);

  const handleChangePostMessage = (e) => {
    if (postMessage.length > MaxLength) {
      let text = e.target.value;
      setPostMessage(text.slice(0, MaxLength));
    } else {
      setPostMessage(e.target.value);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (!RefModal.current.contains(e.target)) {
        setPostModal(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const MaxLength = 500;

  const ImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file.type.startsWith("image")) {
      reader.onloadend = () => {
        setImagePost(reader.result);
        // toast.success("image added successfully");
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      toast.error("invalid file type");
      inputRef.current.value = "";
    }
  };

  // create new post //
  const handleCreatePost = async (e) => {
    e.preventDefault();
    dispatch(
      CreateNewPostAction({
        postedBy: id,
        text: postMessage,
        image: imagePost,
      })
    );
  };

  useEffect(() => {
    if (isAdded ) {
      setPostModal(false);
    } else {
      setPostModal(true)
    }
  }, [isAdded]);

  

  return (
    <Container>
      <Fixed >
        <Title3 $padding="0 0 .3rem 0" $fw="500" $ta="center" $bg="transparent" color="#f1f1f1">
          New Thread
        </Title3>

        <DivMenu ref={RefModal} >
          <Section $height="100%">
            <FlexContainer>
              <Section $padding="2rem" $width="100%" $margin="auto" $display="flex" $ai="center" $gap="1rem">
                <Div $width="4rem" $height="4rem">
                  <Image $width="100%" $height="100%" src={profilePic} $br="50%" $objectfit="cover" />
                </Div>
                <Div>
                  <Title4>{username}</Title4>
                </Div>
              </Section>
            </FlexContainer>

            <Section $padding=".5rem 2rem" $width="100%" $display="flex" $jc="space-between" $ai="center">
              <Div $ta="left" $cursor="pointer">
                <Input type="file" hidden ref={RefInputFile} onChange={ImageHandler} />
                {!imagePost && <IconIoIosImages size={30} onClick={() => RefInputFile.current.click()} />}
              </Div>
              {imagePost && (
                <Div $position='relative' $width='100%' $height='1rem'>
                  <Button onClick={() => setImagePost("")}>
                    <IconAiOutlineClose $color="theme.color" />
                  </Button>
                </Div>
              )}
            </Section>
            {imagePost && (
              <Div $padding="1rem 2rem" $display="flex" $jc="center" $width="100%" $margin="auto">
                <Image $width="100%" $height="20rem" $objectfit="cover" src={imagePost} $br="15px" />
              </Div>
            )}

            <Form $display="flex" $fd="column" onSubmit={handleCreatePost}>
              <TextArea name="post" placeholder="Start A New Thread" value={postMessage} onChange={handleChangePostMessage} />

              <Div $padding=".5rem 2rem" $width="100%" $ta="right" $margin="auto">
                <Text $color={MaxLength - postMessage.length < 0 ? "red" : "gray"}>{MaxLength - postMessage.length}</Text>
              </Div>
              <Div $padding="1rem" $display="flex" $gap="2rem">
                <ButtonTheme2 onClick={() => setPostModal(false)} $padding=".5rem 2rem">
                  Close
                </ButtonTheme2>

                <ButtonTheme1 type="submit" $padding=".5rem 2rem">
                  {loading ? <Spinner2 width={"1.5rem"} height={"1.5rem"} /> : "Submit"}
                </ButtonTheme1>
              </Div>
            </Form>
          </Section>
        </DivMenu>
      </Fixed>
    </Container>
  );
};

export default PostModal;


const Container = styled.div`
position: fixed;
inset: 0;
background: rgba(0,0,0,0.8);
`
const Section = styled.section`
height: ${({$height})=>$height};
padding: ${({$padding})=>$padding};
width: ${({$width})=>$width};
margin: ${({$margin})=>$margin};
display: ${({$display})=>$display};
align-items: ${({$ai})=>$ai};
gap: ${({$gap})=>$gap};
`
const Fixed = styled.div`
width: 620px;
display: flex;
flex-direction: column;
margin: auto;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
z-index: 400;
`
const DivMenu = styled.div`
  border-radius: 25px;
  overflow: hidden;
  background-color: ${({ theme }) => (theme.background === dark.background ? "#181818" : "#fff")};
  box-shadow: ${({ theme }) => (theme.background === dark.background ? "rgba(255,255,255, 0.1) 0px 0px 5px,rgba(255,255,255, 0.05) 0px 0px 5px" : "rgba(0, 0, 0, 0.1) 0px 0px 5px,rgba(0, 0, 0, 0.05) 0px 0px 5px")};
`;
const Div = styled.div`
  padding: ${({$padding})=>$padding};
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
  text-align: ${({$ta})=>$ta};
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
  color: ${({$color})=>$color};
  text-align: right;
`;
const Title4 = styled.h4``;

const Title3 = styled.h3`
 padding: 0 0 0.3rem 0 ;
 font-weight: 500;
 text-align: center;
 background: transparent;
 color: "#f1f1f1";
`;
const ButtonTheme2 = styled.button`
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
  border: none;
  &:hover {
    opacity: 0.8;
  }
`;
const ButtonTheme1 = styled.button`
  position: relative;
  width: 100%;
  height: 3rem;
  padding: 8px;
  font-weight: 600;
  background-color: ${({ theme }) => (theme.background === dark.background ? "#f1f5f9" : "#101010")};
  color: ${({ theme }) => (theme.background === dark.background ? "#0A0A0A" : "#f1f5f9")};
  border-radius: 25px;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    opacity: 0.8;
  }
`;
const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.background};
`;
 const Form = styled.form`
 display: flex;
 flex-direction: column;
 `
 const Input = styled.input`
 `
  const TextArea = styled.textarea`
  width: 90%;
  height: 10rem;
  padding: 1rem;
  outline: none;
  border-radius: 15px;
  resize: none;
  background-color: transparent;
  color: ${({ theme }) => theme.color};
  outline: none;
  border: ${({ theme }) => (theme.background === dark.background ? "2px solid rgba(255,255,255,0.05)" : "2px solid rgba(0,0,0,0.2)")};
  padding: ${({ $padding }) => $padding};
  height: ${({ $height }) => $height};
  font-size: 1rem;
  margin: auto;
  &:focus {
    border: ${({ theme }) => (theme.background === dark.background ? "2px solid rgba(255,255,255,0.5)" : "2px solid rgba(0,0,0,0.5)")};
    transition: ease-in-out 0.3s;
  }
`;
