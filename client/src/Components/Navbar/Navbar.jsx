import React, { useEffect, useRef } from "react";
import logo1 from "/light-logo.svg";
import logo2 from "/dark-logo.svg";
import { BiMenuAltRight } from "react-icons/bi";
import { LuUser2 } from "react-icons/lu";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuNavbar from "../MenuList/MenuNavbar";
import { LogOutAction } from "../../redux/actions/actions";
import { Link, useNavigate } from "react-router-dom";
import { LiaEdit } from "react-icons/lia";
import { RiSearch2Line } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import { dark } from "../../utils/ThemeColors";


const Navbar = ({ theme, setTheme, setPostModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authentication, isLoggedIn } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const [toggleTheme, setToggleTheme] = useState(false);
  const menuRef = useRef(null);
  const navBtnRef = useRef(null);
  const Items = ["Theme", "Profile", "Settings", "Records", "Your Likes", "To report a Problem", "Sign out"];

  const handleClickShowMenu = () => {
    setShowMenu(!showMenu);
    setToggleTheme(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef?.current?.contains(e.target) && !navBtnRef?.current?.contains(e.target)) {
        setShowMenu(false);
        setToggleTheme(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogOut = (e) => {
    if (e.target.innerText === "Sign out") {
      dispatch(LogOutAction());
      setShowMenu(false);
    } else if (e.target.innerText === "Theme") {
      setToggleTheme(true);
    } else if (e.target.innerText === "Profile") {
      navigate(`/update/${authentication.username}`);
      setShowMenu(false);
    }
  };

  const handleClickShowModal = () => {
    if (authentication) {
      setPostModal(true);
    } else {
      return toast.error("sign in Before");
    }
  };

  return (
    <Nav>
      {showMenu && (
        <Div ref={menuRef}>
          <MenuNavbar theme={theme} setTheme={setTheme} type="navbar" handleLogOut={handleLogOut} Items={Items} toggleTheme={toggleTheme} setToggleTheme={setToggleTheme} />
        </Div>
      )}
      <Navlink to="/">
        <Image src={theme === "dark" ? logo1 : logo2} />
      </Navlink>

      <>
        {isLoggedIn ? (
          <ButtonScaleEffect ref={navBtnRef} onClick={handleClickShowMenu}>
            <BiMenuAltRight size={25} />
          </ButtonScaleEffect>
        ) : (
          <Navlink to="/signin">
            <ButtonScaleEffect >
              <LuUser2 size={20} />
            </ButtonScaleEffect>
          </Navlink>
        )}
      </>
      <Section>
        <Navlink to="/">
          <ButtonNavMenu >
            <IoMdHome size={30} />
          </ButtonNavMenu>
        </Navlink>

        <ButtonNavMenu >
          <RiSearch2Line size={30} />
        </ButtonNavMenu>

        <ButtonNavMenu  onClick={handleClickShowModal}>
          <LiaEdit size={30} />
        </ButtonNavMenu>

        <ButtonNavMenu >
          <FaRegHeart size={25} />
        </ButtonNavMenu>

        <Navlink to={`/${authentication?.username}`}>
          <ButtonNavMenu >
            <FaUser size={25} />
          </ButtonNavMenu>
        </Navlink>
      </Section>
    </Nav>
  );
};

export default Navbar;


const Nav = styled.nav`
position: relative;
max-width: 1200px;
height: 80px;
display: flex;
justify-content: center;
align-items: center;
margin: auto;
`
  
const Div= styled.div`

`
  
const Navlink = styled(Link)`
text-decoration: none;
`
const Image = styled.img`
position: absolute;
top: 50%;
left: 0rem;
width: 2rem;
height: 2rem;
transform: translateY(-50%);
cursor: pointer;
`
const Section = styled.section`
height: 100%;
max-width: 620px;
display: flex;
align-items: center;
padding: 4px 0;
`

const ButtonScaleEffect = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  padding: 4px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
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

const ButtonNavMenu = styled.button`
  border: none;
  height: 5rem;
  width: 5rem;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.background};
  cursor: pointer;
  outline: none;
  border-radius: 15px;
  &:hover {
    background-color: ${({ theme }) => (theme.background === dark.background ? "#262626" : "#e5e7eb")};
  }
  &:active {
    scale: 0.9;
  }
`;
