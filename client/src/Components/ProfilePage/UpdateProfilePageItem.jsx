import React from "react";
import {ButtonTheme1,ButtonTheme2,Div,DivMenu,Form,Image,Input,InputEditProfile,Navlink,Title3} from "../Global/GlobalStyle";
import { useState } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Spinner2 from "../../utils/Spinner2";
import { IconFaEye, IconFaEyeSlash, IconIoIosInformationCircleOutline, IconIoKeyOutline, IconLuUser2, IconOutlineEmail } from "../Global/Icons";
import { useNavigate } from "react-router-dom";




const UpdateProfilePageItem = ({ userProfile }) => {
  const [loadingData, setLoadingData] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [preview, setPreview] = useState(null);
  const [userInfo, setUserInfo] = useState(userProfile);
  const inputRef = useRef(null);
  const navigate = useNavigate()

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
        const {
          data: { info },
        } = data;
        // localStorage.setItem("info",JSON.stringify(info))
        toast.success("user profile updated successfully");
        setLoadingData(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

const handleClick = () => {
  navigate(`/${userInfo.username}`)
}

  return (
    <DivMenu $padding="2rem" $width="500px">
      <Title3 $margin="0 0 2rem 0" $ta="center">
        User Profile Edit
      </Title3>
      <Div $display="flex" $jc="center" $ai="center" $gap="1rem">
        <Div $flex="1">
          <Image
          $width="8rem"
          $height="8rem"
          src={preview || userInfo.profilePic}
          $objectfit="cover"
          $br="50%"
          />
        </Div>

        <Div $flex="3">
          <ButtonTheme2
            $width="100%"
            $height="3rem"
            onClick={(e) => inputRef.current.click()}
          >
            Change Avatar
          </ButtonTheme2>
          <Input onChange={ImageHandler} ref={inputRef} type="file" hidden />
        </Div>
      </Div>

      <Form  
           $padding='3rem 0 0 0'
           $display='flex'
           $fd='column'
           $ai='start'
           $margin='auto'
           $gap='2rem'
           onSubmit={handleUpdateUser}>
            
        <Div $width="100%" $position="relative">
          <InputEditProfile
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            name="name"
            placeholder="Name"
            autoComplete="off"
          />
          <IconLuUser2 size="20" />
        </Div>

        <Div $width="100%" $position="relative">
          <InputEditProfile
            value={userInfo.username}
            onChange={(e) =>
              setUserInfo({ ...userInfo, username: e.target.value })
            }
            name="username"
            placeholder="Username"
            autoComplete="off"
          />
          <IconLuUser2 size="20" />
        </Div>

        <Div $width="100%" $position="relative">
          <InputEditProfile
            disabled
            value={userInfo.email}
            name="email"
            placeholder="Email"
            autoComplete="off"
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
          <IconOutlineEmail size="20" />
        </Div>

        <Div $width="100%" $position="relative">
          <InputEditProfile
            value={userInfo.bio}
            name="bio"
            placeholder="Bio"
            autoComplete="off"
            onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
          />
          <IconIoIosInformationCircleOutline size="20" />
        </Div>

        <Div $width="100%" $position="relative">
          <InputEditProfile
            name="password"
            type={toggle ? "text" : "password"}
            autoComplete="off"
            placeholder="Password"
            onChange={(e) =>setUserInfo({ ...userInfo, password: e.target.value })}
          />
          <IconIoKeyOutline size="20" />
          {!toggle ? (
            <IconFaEye onClick={() => setToggle(!toggle)} />
          ) : (
            <IconFaEyeSlash onClick={() => setToggle(!toggle)} />
          )}
        </Div>

        <Div $display="flex" $width="100%" $gap="1rem">
              <ButtonTheme2 type="reset" $flex="1" onClick={handleClick}>
                        Close
              </ButtonTheme2>

          <ButtonTheme1 type="submit" $flex="1">
            {loadingData ? (
              <Spinner2 width={"1.5rem"} height={"1.5rem"} />
            ) : (
              "Submit"
            )}
          </ButtonTheme1>
        </Div>
      </Form>
    </DivMenu>
  );
};

export default UpdateProfilePageItem;
