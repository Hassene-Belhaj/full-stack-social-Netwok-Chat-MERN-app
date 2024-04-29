import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IconMdOutlineDarkMode, IconMdOutlineLightMode } from "../../utils/Icons";
import { dark } from "../../utils/ThemeColors";

const MenuNavbar = ({ handleLogOut, Items, toggleTheme, setToggleTheme, theme, setTheme }) => {
  const [active, setActive] = useState(false);
  const [menuTransition, setMenuTransition] = useState(true);

  const refBtn = useRef();

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    setActive(!active);
  };

  useEffect(() => {
    const handler = (e) => {
      if (refBtn?.current?.contains(e.target)) {
        setMenuTransition(false);
      } else {
        setMenuTransition(true);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [handleToggleTheme]);

  return (
    <DivMenu $width={toggleTheme ? "20rem" : "15rem"} $transition={menuTransition ? "all ease-in-out 0.2s" : null}>
      {!toggleTheme ? (
        <>
          {Items.map((item, i) => {
            return (
              <ItemDiv key={i} $height="3rem" $width="100%" $display="flex" $jc="center" $ai="center">
                <Title4 onClick={handleLogOut} $ta="center" $cursor="pointer" $bg="transparent" $width="100%" $fw="600">
                  {item}
                </Title4>
              </ItemDiv>
            );
          })}
        </>
      ) : (
        <FlexContainer $width="100%">
          <Div $position="relative">
            <Div $height="3rem" $position="absolute" $top="50%" $transform="translateY(-50%)" $left="2rem" $display="flex">
              <Button5 $padding=".6rem 1rem" $br="10px" onClick={() => setToggleTheme(!toggleTheme)}>
                <FaLongArrowAltLeft size={20} />
              </Button5>
            </Div>

            <Div $height="3rem" $width="100%" $display="flex" $jc="center" $ai="center">
              <Title4 onClick={handleLogOut} $ta="center" $cursor="pointer" $fw="500">
                Theme
              </Title4>
            </Div>
          </Div>
          <Div $padding=".5rem" ref={refBtn}>
            <BtnGroup $active={active}>
              <Div $flex="1">
                <Button onClick={handleToggleTheme} $right>
                  <IconMdOutlineLightMode size={20} />
                </Button>
              </Div>
              <Div $flex="1">
                <Button onClick={handleToggleTheme} $left>
                  <IconMdOutlineDarkMode size={20} />
                </Button>
              </Div>
            </BtnGroup>
          </Div>
        </FlexContainer>
      )}
    </DivMenu>
  );
};

export default MenuNavbar;

const Button = styled.button`
  position: relative;
  width: 100%;
  height: 3rem;
  color: ${({ theme }) => theme};
  background-color: ${({ theme }) => (theme.background === dark.background ? "#0A0A0A" : "#f3f3f5")};
  cursor: pointer;
  outline: none;
  border: none;
  border-top-left-radius: ${({ $right }) => ($right ? "15px" : "none")};
  border-bottom-left-radius: ${({ $right }) => ($right ? "15px" : "none")};
  border-top-right-radius: ${({ $left }) => ($left ? "15px" : "none")};
  border-bottom-right-radius: ${({ $left }) => ($left ? "15px" : "none")};
`;
const BtnGroup = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ theme }) => (theme.background === dark.background ? "#262626" : "#e5e7eb")};
    width: 50%;
    border-top-left-radius: ${({ $active }) => ($active ? "15px" : "none")};
    border-bottom-left-radius: ${({ $active }) => ($active ? "15px" : "none")};
    border-top-right-radius: ${({ $active }) => ($active ? "none" : "15px")};
    border-bottom-right-radius: ${({ $active }) => ($active ? "none" : "15px")};
    transform: ${({ $active }) => (!$active ? "translateX(100%)" : null)};
    transition: all ease-in-out 0.2s;
    z-index: 1;
  }
`;
const DivMenu = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateY(100%);
  width: ${({ $width }) => $width};
  height: auto;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: ${({ $transition }) => ($transition ? "all ease-in-out 0.2s" : null)};
  overflow: hidden;
  background-color: ${({ theme }) => (theme.background === dark.background ? "#181818" : "#fff")};
  box-shadow: ${({ theme }) => (theme.background === dark.background ? "rgba(255,255,255, 0.1) 0px 0px 5px,rgba(255,255,255, 0.05) 0px 0px 5px" : "rgba(0, 0, 0, 0.1) 0px 0px 5px,rgba(0, 0, 0, 0.05) 0px 0px 5px")};
`;
const ItemDiv = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease-in-out 0.2s;
  border-bottom: ${({ theme }) => `solid .5px ${theme.color === dark.color ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}`};
  &:last-child {
    border-bottom: none;
  }
`;
const FlexContainer = styled.div`
  width: 100%;
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
  transform: ${({ $transform }) => $transform};
  flex: ${({ $flex }) => $flex};
  padding: ${({ $padding }) => $padding};
`;
const Button5 = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme};
  padding: 0.6rem 1rem;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  border: none;
  &:active {
    scale: 0.9;
  }
`;
const Title4 = styled.h4`
  text-align: center;
  cursor: pointer;
  font-weight: 500;
  width: 100%;
  font-weight: 600;
`;
