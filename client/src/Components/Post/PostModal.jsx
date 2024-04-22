import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ButtonTheme1,
  ButtonTheme2,
  Container,
  Div,
  DivMenu,
  FlexContainer,
  Form,
  Image,
  Input,
  Navlink,
  Section,
  Text,
  TextArea,
  Title3,
  Title4,
  Wrapper,
} from "../Global/GlobalStyle";
import { IconAiOutlineClose, IconIoIosImages } from "../Global/Icons";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Spinner2 from "../../utils/Spinner2";

const PostModal = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const RefModal = useRef();
  const RefInputFile = useRef();
  const [postMessage, setPostMessage] = useState("");
  const [imagePost, setImagePost] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    authentication: { id, username, profilePic },
  } = useSelector((state) => state.auth);
  // const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    const keypress = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
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

  const MaxLength = 500;

  const ImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file.type.startsWith("image")) {
      reader.onloadend = () => {
        setImagePost(reader.result);
        toast.success("image added successfully");
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      toast.error("invalid file type");
      inputRef.current.value = "";
    }
  };

  // create new post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/posts/new", {
        postedBy: id,
        text: postMessage,
        image: imagePost,
      });
      if (data.success) {
        toast.success("post created with success");
        setImagePost(null);
        setPostMessage("");
        setShowModal(false);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };

  console.log(profilePic);

  return (
    <Container $position="fixed" $inset="0" $bg="rgba(0,0,0,0.8)">
      <Wrapper
        $width="620px"
        $display="flex"
        $fd="column"
        $margin="auto"
        $position="absolute"
        $top="50%"
        $left="50%"
        $transform="translate(-50%,-50%)"
      >
        <Title3
          $padding="0 0 .3rem 0"
          $fw="500"
          $ta="center"
          $bg="transparent"
          $color="#f1f1f1"
        >
          New Thread
        </Title3>

        <DivMenu $br="25px" $padding="0rem">
          <Section ref={RefModal} $height="100%">
            <FlexContainer>
              <Section
                $padding="2rem"
                $width="100%"
                $margin="auto"
                $display="flex"
                $ai="center"
                $gap="1rem"
              >
                <Div $width="4rem" $height="4rem">
                  <Image
                    $width="100%"
                    $height="100%"
                    src={profilePic}
                    $br="50%"
                    $objectfit="cover"
                  />
                </Div>
                <Div>
                  <Title4>{username}</Title4>
                </Div>
              </Section>
            </FlexContainer>

            <Section
              $padding=".5rem 2rem"
              $width="100%"
              $display="flex"
              $jc="space-between"
              $ai="center"
            >
              <Div $ta="left" $cursor="pointer">
                <Input
                  type="file"
                  hidden
                  ref={RefInputFile}
                  onChange={ImageHandler}
                />
                {!imagePost && (
                  <IconIoIosImages
                    size={30}
                    onClick={() => RefInputFile.current.click()}
                  />
                )}
              </Div>
              {imagePost && (
                <Div>
                  <Button
                    $width="1.5rem"
                    $height="1.5rem"
                    $br="50%"
                    $border="none"
                    $outline="none"
                    $display="flex"
                    $jc="center"
                    $ai="center"
                    onClick={() => setImagePost("")}
                  >
                    <IconAiOutlineClose $color="theme.color" />
                  </Button>
                </Div>
              )}
            </Section>
            {imagePost && (
              <Div
                $padding="1rem 2rem"
                $display="flex"
                $jc="center"
                $width="100%"
                $margin="auto"
              >
                <Image
                  $width="100%"
                  $height="18rem"
                  $objectfit="cover"
                  src={imagePost}
                  $br="15px"
                />
              </Div>
            )}

            <Form $display="flex" $fd="column" onSubmit={handleCreatePost}>
              <TextArea
                $width="90%"
                $padding="1rem"
                $height="10rem"
                $bg="transparent"
                $outline="none"
                $borderRadius="15px"
                $resize="none"
                name="post"
                placeholder="Start A New Thread"
                value={postMessage}
                onChange={handleChangePostMessage}
              />

              <Div
                $padding=".5rem 2rem"
                $width="100%"
                $ta="right"
                $margin="auto"
              >
                <Text $color={MaxLength - postMessage.length < 0 ? "red" : ""}>
                  {MaxLength - postMessage.length}
                </Text>
              </Div>
              <Div $padding="1rem" $display="flex" $gap="2rem">
                <ButtonTheme2
                  onClick={() => setShowModal(false)}
                  $padding=".5rem 2rem"
                >
                  Close
                </ButtonTheme2>

                <ButtonTheme1 type="submit" $padding=".5rem 2rem">
                  {loading ? (
                    <Spinner2 width={"1.5rem"} height={"1.5rem"} />
                  ) : (
                    "Submit"
                  )}
                </ButtonTheme1>
              </Div>
            </Form>
          </Section>
        </DivMenu>
      </Wrapper>
    </Container>
  );
};

export default PostModal;
