import React from "react";
import { FaInstagram } from "react-icons/fa";
import { PiDotsThreeCircle } from "react-icons/pi";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { dark } from "../../utils/ThemeColors";

const UserHeader = ({ user, authentication, active, setActive }) => {
  const [menuList, setMenuList] = useState(false);
  const [follow, setFollow] = useState(!user?.followers?.includes(authentication?.id));
  const [followersNbr, _setFollowersNbr] = useState([...user.followers]);
  const navigate = useNavigate();

  const get_url = () => {
    toast.dismiss();
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success("url copied to your clipboard");
    });
  };

  const handleBlurMenu = () => {
    setTimeout(() => {
      setMenuList(false);
    }, 300);
  };

  const handleFollowUnfollow = async () => {
    try {
      const { data } = await axios.post(`/user/follow/${user._id}`);
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
    <Section>
      <FlexContainer $width="100%" $display="flex" $jc="space-between" $padding="4rem 0 0 0">
        <Div $display="flex" $fd="column" $flex="1">
          <Title2>{user?.name}</Title2>
          <Div $display="flex" $ai="center" $padding="4px 0" $gap="1rem">
            <Text>{user?.username}</Text>
            {/* <Button1 $border='none' $padding='4px 12px' $br='25px'>threads.net</Button1> */}
          </Div>
        </Div>
        <Div $flex="1" $display="flex" $jc="end">
          <Image src={user.profilePic || "user.jpg"} />
        </Div>
      </FlexContainer>

      <Container $display="flex" $fd="column" $padding="1rem 0" $gap="1rem">
        <Text>{user?.bio}</Text>

        <FlexContainer $display="flex" $jc="space-between" $ai="center">
          <Div>
            <Text $color="gray">{followersNbr.length} followers &#x2022; instagram.com</Text>
          </Div>

          <Div $display="flex" $ai="center" $jc="center" $gap="1rem" $position="relative">
            <Navlink to={`https://www.instagram.com`} target="_blank">
              <ButtonScaleEffect>
                <FaInstagram size={30} />
              </ButtonScaleEffect>
            </Navlink>

            <ButtonScaleEffect onBlur={handleBlurMenu} onClick={() => setMenuList(!menuList)}>
              <PiDotsThreeCircle size={30} />
            </ButtonScaleEffect>

            {menuList && (
              <DivMenu>
                <Span>
                  <Title4 onClick={get_url}>Copy link</Title4>
                </Span>
              </DivMenu>
            )}
          </Div>
        </FlexContainer>
      </Container>

      {user._id === authentication?.id && (
        <Navlink to={`/update/${user.username}`}>
          <Div $width="50%" $padding="1.5rem 0">
            <ButtonTheme1 type="submit"> Update Profile </ButtonTheme1>
          </Div>
        </Navlink>
      )}
      {user._id !== authentication?.id && (
        <Div $width="50%" $padding="1.5rem 0">
          <ButtonTheme1 onClick={handleFollowUnfollow} type="submit">
            {follow ? "follow" : "Unfollow"}
          </ButtonTheme1>
        </Div>
      )}

      <ContainerBorderBottom $height="2.5rem" $display="flex" $gap=".5rem" $active>
        <Navlink to="threads">
          <ButtonUserHeaderSection $active={active === "Threads" ? true : false} onClick={() => setActive("Threads")}>
            Threads
          </ButtonUserHeaderSection>
        </Navlink>
        <Navlink to="replies">
          <ButtonUserHeaderSection $active={active === "Replies" ? true : false} onClick={() => setActive("Replies")}>
            Replies
          </ButtonUserHeaderSection>
        </Navlink>
      </ContainerBorderBottom>
    </Section>
  );
};

export default UserHeader;

const Section = styled.section``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  gap: 1rem;
`;
const FlexContainer = styled.div`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  display: ${({ $display }) => $display};
  justify-content: ${({ $jc }) => $jc};
  align-items: ${({ $ai }) => $ai};
  flex-direction: ${({ $fd }) => $fd};
  gap: ${({ $gap }) => $gap};
  padding: ${({ $padding }) => $padding};
  margin: ${({ $margin }) => $margin};
  background: ${({ $selected }) => $selected};
  @media (max-width: 760px) {
    /* display: ${({ $Selected }) => ($Selected ? "none" : "flex")}; */
  }
`;
const ContainerBorderBottom = styled.div`
  height: ${({ $height }) => $height};
  display: ${({ $display }) => $display};
  border-bottom: ${({ theme, $active }) => ($active ? `solid .5px ${theme.color === dark.color ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}` : "")};
  gap: ${({ $gap }) => $gap};
`;
const Div = styled.div`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  display: ${({ $display }) => $display};
  justify-content: ${({ $jc }) => $jc};
  align-items: ${({ $ai }) => $ai};
  flex-direction: ${({ $fd }) => $fd};
  gap: ${({ $gap }) => $gap};
  position: ${({ $position }) => $position};
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  right: ${({ $right }) => $right};
  transform: ${({ $transform }) => $transform};
  background: ${({ $bg }) => $bg};
  flex: ${({ $flex }) => $flex};
  padding: ${({ $padding }) => $padding};
`;
const DivMenu = styled.div`
  position: absolute;
  bottom: -0.5rem;
  transform: translateY(100%);
  right: 0rem;
  padding: 1rem;
  width: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 15px;
  background-color: ${({ theme }) => (theme.background === dark.background ? "#181818" : "#fff")};
  box-shadow: ${({ theme }) => (theme.background === dark.background ? "rgba(255,255,255, 0.1) 0px 0px 5px,rgba(255,255,255, 0.05) 0px 0px 5px" : "rgba(0, 0, 0, 0.1) 0px 0px 5px,rgba(0, 0, 0, 0.05) 0px 0px 5px")};
`;
const Image = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
`;
const ButtonUserHeaderSection = styled.button`
  height: 100%;
  width: 100%;
  flex: 1;
  border: ${({ theme }) => `1px solid ${theme.background}`};
  cursor: pointer;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
  border-bottom: ${({ theme, $active }) => ($active ? `1px solid ${theme.color}` : "1px solid rgba(0,0,0,0)")};
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
  border-top-left-radius: ${({ $right }) => ($right ? "15px" : "none")};
  border-bottom-left-radius: ${({ $right }) => ($right ? "15px" : "none")};
  border-top-right-radius: ${({ $left }) => ($left ? "15px" : "none")};
  border-bottom-right-radius: ${({ $left }) => ($left ? "15px" : "none")};
  &:hover {
    opacity: 0.8;
  }
`;
const Text = styled.p`
  color: ${({ $color }) => $color};
`;
const Title2 = styled.h2`
  font-weight: 500;
`;
const Title4 = styled.h4`
  width: 100%;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  background: transparent;
`;
const ButtonScaleEffect = styled.button`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.background};
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 50%;
  &:hover {
    background-color: ${({ theme }) => (theme.background === dark.background ? "#262626" : "#e5e7eb")};
  }
  &:active {
    scale: 0.9;
  }
`;
const Span = styled.span`
  height: 3rem;
`;
const Navlink = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: ${({ theme }) => theme.color};
`;
