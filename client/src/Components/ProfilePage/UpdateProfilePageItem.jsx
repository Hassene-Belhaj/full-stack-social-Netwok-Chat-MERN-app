import React from "react";
import { useState } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Spinner2 from "../../utils/Spinner2";
import { IconFaEye, IconFaEyeSlash, IconIoIosInformationCircleOutline, IconIoKeyOutline, IconLuUser2, IconOutlineEmail } from "../../utils/Icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { dark } from "../../utils/ThemeColors";

const UpdateProfilePageItem = ({ userProfile }) => {
  const [loadingData, setLoadingData] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [preview, setPreview] = useState(null);
  const [userInfo, setUserInfo] = useState(userProfile);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const ImageHandler = (e) => {
    let File = e.target.files[0];
    if (File.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        toast.success("image added successfully");
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      toast.error("invalid file type");
      inputRef.current.value = "";
    }
  };

  const handleUpdateUser = async (e) => {
    toast.dismiss();
    e.preventDefault();
    try {
      setLoadingData(true);
      const data = await axios.put(`/user/update/${userInfo._id}`, {
        name: userInfo.name,
        username: userInfo.username,
        email: userInfo.email,
        bio: userInfo.bio,
        profilePic: preview,
      });
      if (data.status === 200) {
        // const { data: { info }, } = data;
        // localStorage.setItem("info",JSON.stringify(info))
        toast.success("user profile updated successfully");
        setLoadingData(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    navigate(`/${userInfo.username}`);
  };

  return (
    <DivMenu $padding="2rem" $width="500px">
      <Title3 $margin="0 0 1rem 0" $ta="center">
        User Profile Edit
      </Title3>
      <Div $display="flex" $jc="center" $ai="center" $gap="1rem" $padding="0 0 1rem 0">
        <Div $flex="1">
          <Image $width="8rem" $height="8rem" src={preview || userInfo.profilePic} $objectfit="cover" $br="50%" />
        </Div>

        <Div $flex="3">
          <ButtonTheme2 onClick={(e) => inputRef.current.click()}>
            Change Avatar
          </ButtonTheme2>
          <Input onChange={ImageHandler} ref={inputRef} type="file" hidden />
        </Div>
      </Div>

      <Form $padding="3rem 0 0 0" $display="flex" $fd="column" $ai="start" $margin="auto" $gap="2rem" onSubmit={handleUpdateUser}>
        <Div $width="100%" $position="relative">
          <InputEditProfile value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} name="name" placeholder="Name" autoComplete="off" />
          <IconLuUser2 size="20" />
        </Div>

        <Div $width="100%" $position="relative">
          <InputEditProfile value={userInfo.username} onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })} name="username" placeholder="Username" autoComplete="off" />
          <IconLuUser2 size="20" />
        </Div>

        <Div $width="100%" $position="relative">
          <InputEditProfile disabled value={userInfo.email} name="email" placeholder="Email" autoComplete="off" onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
          <IconOutlineEmail size="20" />
        </Div>

        <Div $width="100%" $position="relative">
          <InputEditProfile value={userInfo.bio} name="bio" placeholder="Bio" autoComplete="off" onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })} />
          <IconIoIosInformationCircleOutline size="20" />
        </Div>

        <Div $width="100%" $position="relative">
          <InputEditProfile name="password" type={toggle ? "text" : "password"} autoComplete="off" placeholder="Password" onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })} />
          <IconIoKeyOutline size="20" />
          {!toggle ? <IconFaEye onClick={() => setToggle(!toggle)} /> : <IconFaEyeSlash onClick={() => setToggle(!toggle)} />}
        </Div>

        <Div $display="flex" $width="100%" $gap="1rem">
          <ButtonTheme2 type="reset" onClick={handleClick}>
            Close
          </ButtonTheme2>

          <ButtonTheme1 type="submit">{loadingData ? <Spinner2 width={"1.5rem"} height={"1.5rem"} /> : "Submit"}</ButtonTheme1>
        </Div>
      </Form>
    </DivMenu>
  );
};

export default UpdateProfilePageItem;

const Div = styled.div`
  width: ${({ $width }) => $width};
  display: ${({ $display }) => $display};
  justify-content: ${({ $jc }) => $jc};
  align-items: ${({ $ai }) => $ai};
  flex: ${({ $flex }) => $flex};
  position: ${({ $position }) => $position};
  gap: ${({ $gap }) => $gap};
  padding: ${({ $padding }) => $padding};
`;
const Image = styled.img`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  object-fit: ${({ $objectfit }) => $objectfit};
  border-radius: ${({ $br }) => $br};
`;
const Title3 = styled.h3`
  margin-bottom:1rem;
  text-align: center;
`;
const DivMenu = styled.span`
  width: ${({ $width }) => $width};
  padding: ${({ $padding }) => $padding};
  overflow: hidden;
  background-color: ${({ theme }) => (theme.background === dark.background ? "#181818" : "#fff")};
  box-shadow: ${({ theme }) => (theme.background === dark.background ? "rgba(255,255,255, 0.1) 0px 0px 5px,rgba(255,255,255, 0.05) 0px 0px 5px" : "rgba(0, 0, 0, 0.1) 0px 0px 5px,rgba(0, 0, 0, 0.05) 0px 0px 5px")};
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
const InputEditProfile = styled.input`
  padding-left: 3.5rem;
  width: 100%;
  height: 3rem;
  background-color: ${({ theme }) => (theme.background === dark.background ? "#101010" : "#f1f5f9")};
  color: ${({ theme }) => theme};
  outline: none;
  border: 3px solid rgba(0, 0, 0, 0);
  border-radius: 10px;
  &:focus {
    transition: ease-in-out 0.4s;
    border: 3px solid #8b5cf6;
  }
  &::placeholder {
    font-size: 1rem;
    font-weight: 500;
    color: gray;
  }
`;
const Input = styled.input``;
const Form = styled.form`
  display: ${({ $display }) => $display};
  flex-direction: ${({ $fd }) => $fd};
  align-items: ${({ $ai }) => $ai};
  margin: ${({ $margin }) => $margin};
  gap: ${({ $gap }) => $gap};
`;
