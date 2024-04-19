import React, { useEffect, useRef } from "react";
import {
  ButtonScaleEffect,
  Button6,
  Div,
  Image,
  Nav,
  Section,
  Navlink,
} from "../Global/GlobalStyle";
import logo1 from "/light-logo.svg";
import logo2 from "/dark-logo.svg";
import { BiMenuAltRight } from "react-icons/bi";
import { LuUser2 } from "react-icons/lu";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuNavbar from "../MenuList/MenuNavbar";
import { LogOutAction } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { LiaEdit } from "react-icons/lia";
import { RiSearch2Line } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { toast } from "react-hot-toast";

const Navbar = ({ theme, setTheme, setShowModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authentication, isLoggedIn } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const [toggleTheme, setToggleTheme] = useState(false);
  const menuRef = useRef(null);
  const navBtnRef = useRef(null);
  const Items = [
    "Theme",
    "Profile",
    "Settings",
    "Records",
    "Your Likes",
    "To report a Problem",
    "Sign out",
  ];

  const handleClickShowMenu = () => {
    setShowMenu(!showMenu);
    setToggleTheme(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (
        !menuRef?.current?.contains(e.target) &&
        !navBtnRef?.current?.contains(e.target)
      ) {
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
      setShowModal(true);
    } else {
      return toast.error("sign in Before");
    }
  };

  return (
    <Nav
      $position="relative"
      $maxWidth="1200px"
      $height="80px"
      $display="flex"
      $jc="center"
      $ai="center"
      $margin="auto"
    >
      {showMenu && (
        <Div ref={menuRef}>
          <MenuNavbar
            theme={theme}
            setTheme={setTheme}
            type="navbar"
            handleLogOut={handleLogOut}
            Items={Items}
            toggleTheme={toggleTheme}
            setToggleTheme={setToggleTheme}
          />
        </Div>
      )}
      <Navlink to="/">
        <Image
          $position="absolute"
          $top="50%"
          $left="0rem"
          $width="2rem"
          $height="2rem"
          $transform="translateY(-50%)"
          $cursor="pointer"
          alt="logo"
          src={theme === "dark" ? logo1 : logo2}
        />
      </Navlink>

      <>
        {isLoggedIn ? (
          <ButtonScaleEffect
            ref={navBtnRef}
            $position="absolute"
            $top="50%"
            $transform="translateY(-50%)"
            $right="0"
            $padding="4px"
            $br="50%"
            $border="none"
            $display="flex"
            $jc="center"
            $ai="center"
            onClick={handleClickShowMenu}
          >
            <BiMenuAltRight size={25} />
          </ButtonScaleEffect>
        ) : (
          <Navlink to="/signin">
            <ButtonScaleEffect
              $position="absolute"
              $top="50%"
              $transform="translateY(-50%)"
              $right="0"
              $padding="12px"
              $br="50%"
              $border="none"
              $display="flex"
              $jc="center"
              $ai="center"
            >
              <LuUser2 size={20} />
            </ButtonScaleEffect>
          </Navlink>
        )}
      </>
      <Section
        $height="100%"
        $maxWidth="620px"
        $display="flex"
        $ai="center"
        $padding="4px 0"
      >
        <Navlink to="/">
          <Button6 $border="none" $height="5rem" $width="5rem">
            <IoMdHome size={30} />
          </Button6>
        </Navlink>

        <Button6 $border="none" $height="5rem" $width="5rem">
          <RiSearch2Line size={30} />
        </Button6>

        <Button6
          $border="none"
          $height="5rem"
          $width="5rem"
          onClick={handleClickShowModal}
        >
          <LiaEdit size={30} />
        </Button6>

        <Button6 $border="none" $height="5rem" $width="5rem">
          <FaRegHeart size={25} />
        </Button6>

        <Navlink to={`/${authentication?.username}`}>
          <Button6 $border="none" $height="5rem" $width="5rem">
            <FaUser size={25} />
          </Button6>
        </Navlink>
      </Section>
    </Nav>
  );
};

export default Navbar;
