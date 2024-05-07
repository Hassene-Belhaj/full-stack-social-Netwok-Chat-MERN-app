import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dark } from "../../utils/ThemeColors";
import { Link } from "react-router-dom";
import axios from "axios";

const UserCardProfile = ({MouseLeaveShowUserCardProfile,userID, authentication, username, profilePic, bio, followers }) => {

  const [follow, setFollow] = useState(!followers?.includes(authentication?.id));
  const [followersNbr,setFollowersNbr] = useState([...followers]);

 console.log(followersNbr.length)
// console.log(authentication?.username === username)

const handleFollowUnfollow = async () => {
  try {
    const { data } = await axios.post(`/user/follow/${userID}`);
    console.log(data);
    setFollow(!follow);
    if (!follow) {
      followersNbr.pop();
      return;
    } else {
      followersNbr.push(authentication?.id);
      return;
    }
  } catch (error) {
    toast.error(error.response.data.msg);
    setTimeout(() => {
      navigate("/signin");
    }, 3000);
    console.log(error);
  }
};




  return (
    <Container onMouseLeave={MouseLeaveShowUserCardProfile}>
      <DivMenu>
        <FlexContainer>
          <Div>
          <Navlink to={`/${username}`} $td="none" $underline>
            <Title3>{username}</Title3>
          </Navlink>
          </Div>
          <Div $width="5rem" $height="5rem">
          <Navlink to={`/${username}`} $td="none" $underline>
            <Image src={profilePic} />
          </Navlink>
          </Div>
        </FlexContainer>
        <Div $padding="1rem">
          <Title3>{bio}</Title3>
          <Title4>{followersNbr.length} Followers</Title4>
        </Div>
        <Div $padding="1rem 1rem">
      <>
      {userID !== authentication?.id ? (
        <Div $padding="0rem 0">
          <ButtonTheme1 onClick={handleFollowUnfollow}  type="submit">
            {follow ? "follow" : "Unfollow"}
          </ButtonTheme1>
        </Div>
      )
      :
      null
    }
      </>
        </Div>
      </DivMenu>
    </Container>
  );
};

export default UserCardProfile;

const Container = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 0rem;
  cursor: pointer;
  z-index: 5000;
`;
const FlexContainer = styled.div`
  padding: 2rem 2rem 0 1rem;
  display: flex;
  justify-content: space-between;
`;
const DivMenu = styled.div`
  height: 100%;
  width: 400px;
  border-radius: 25px;
  overflow: hidden;
  background-color: ${({ theme }) => (theme.background === dark.background ? "#181818" : "#fff")};
  box-shadow: ${({ theme }) => (theme.background === dark.background ? "rgba(255,255,255, 0.1) 0px 0px 5px,rgba(255,255,255, 0.05) 0px 0px 5px" : "rgba(0, 0, 0, 0.1) 0px 0px 5px,rgba(0, 0, 0, 0.05) 0px 0px 5px")};
  @media screen and (max-width : 380px) {
    width: 240px;
  }
`;
const Div = styled.div`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  display: ${({ $display }) => $display};
  padding: ${({ $padding }) => $padding};
`;
const Title3 = styled.h3`
font-weight: 500;
`;
const Title4 = styled.h4`
color: gray;
padding: 1rem 0;
font-size: 1.1rem;
font-weight: 600;

`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;
const ButtonTheme1 = styled.button`
  font-size: 1rem;
  position: relative;
  width: 100%;
  height: 3rem;
  padding: 8px;
  font-weight: 600;
  background-color: ${({ theme }) => (theme.background === dark.background ? "#f1f5f9" : "#101010")};
  color: ${({ theme }) => (theme.background === dark.background ? "#0A0A0A" : "#f1f5f9")};
  border-radius: 10px;
  cursor: pointer;
  outline: none;
  border: none;
  border-top-left-radius: ${({ $right }) => ($right ? "15px" : "none")};
  border-bottom-left-radius: ${({ $right }) => ($right ? "15px" : "none")};
  border-top-right-radius: ${({ $left }) => ($left ? "15px" : "none")};
  border-bottom-right-radius: ${({ $left }) => ($left ? "15px" : "none")};
  &:hover {
    opacity: 0.9;
    transition: all ease-in-out 0.3s;
  }
`;
const Navlink = styled(Link)`
  text-decoration: ${({ $td }) => $td};
  color: ${({ theme,$selectedColor }) => $selectedColor ? $selectedColor :  theme.color };
  &:hover {
    text-decoration: ${({$underline})=>$underline ? 'underline' : null};
    text-underline-offset: 4px;
  }
`;