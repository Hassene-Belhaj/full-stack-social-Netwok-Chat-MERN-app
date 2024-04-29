import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import toast from "react-hot-toast";
import Spinner2 from "../../utils/Spinner2";
import { IconFaEye, IconFaEyeSlash, IconFaRegUserCircle, IconIoKeyOutline, IconLuUser2, IconOutlineEmail } from "../../utils/Icons";
import { dark } from "../../utils/ThemeColors";
import styled from "styled-components";

const Auth = ({ type }) => {
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const auth = async (serverRoute, formData) => {
    if (serverRoute === "signup") {
      try {
        setLoading(true);
        const { data } = await axios.post("/user/signup", formData);
        if (data.success) {
          toast.success("sign up successfully");
          setTimeout(() => {
            navigate("/signin");
          }, 1000);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        return toast.error(error?.response.data.msg);
      }
    } else {
      try {
        const { data } = await axios.post("/user/signin", formData);
        if (data.success) {
          toast.success("sign in successfully");
          setTimeout(() => {
            navigate("/");
          }, 1000);
          return;
        }
      } catch (error) {
        return toast.error(error?.response.data.msg);
      }
    }
  };

  const handleSubmitFormAuth = (e) => {
    e.preventDefault();
    let serverRoute = type === "signup" ? "signup" : "signin";
    const newformdata = new FormData(e.target);
    let formData = {};
    formData = Object.fromEntries(newformdata.entries());
    auth(serverRoute, formData);
  };

  useEffect(() => {
    inputRef.current.value = "";
  }, [pathname]);

  return (
    <Container>
      <FlexContainer>
        <Title2>{type === "signin" ? "Login" : "Register"}</Title2>
        <Form onSubmit={handleSubmitFormAuth}>
          {type === "signup" && (
            <Div>
              <InputAuth name="name" autoComplete="off" placeholder="Name" />
              <IconFaRegUserCircle />
            </Div>
          )}
          <Div>
            <InputAuth name="username" autoComplete="off" placeholder="Username" />
            <IconLuUser2 />
          </Div>
          {type === "signup" && (
            <Div>
              <InputAuth name="email" autoComplete="off" placeholder="Email" />
              <IconOutlineEmail />
            </Div>
          )}

          <Div>
            <InputAuth ref={inputRef} name="password" autoComplete="off" placeholder="Password" type={toggle ? "text" : "password"} />
            <IconIoKeyOutline />
            {!toggle ? <IconFaEye onClick={() => setToggle(!toggle)} /> : <IconFaEyeSlash onClick={() => setToggle(!toggle)} />}
          </Div>

          <ButtonAuth type="submit">{loading ? <Spinner2 width={"1.5rem"} height={"1.5rem"} /> : <>{type === "signin" ? "Login" : "Sign Up"}</>}</ButtonAuth>
        </Form>
        <Div $ta="center">
          {type === "signup" ? (
            <Text>
              Already a Member ?
              <Navlink $padding="0 0 0 1rem" $fw="500" to="/signin">
                Sign in
              </Navlink>
            </Text>
          ) : (
            <Text>
              Dont't have an Account yet ?
              <Navlink $padding="0 0 0 1rem" $fw="500" to="/signup">
                Sign up
              </Navlink>
            </Text>
          )}
        </Div>
      </FlexContainer>
    </Container>
  );
};

export default Auth;

const Container = styled.div`
  background-image: url("/auth.png");
  background-repeat: no-repeat;
  background-position: top;
  padding: 0 1rem;
`;

const FlexContainer = styled.div`
  max-width: 400px;
  padding: 15rem 0 0 0;
  margin: auto;
`;
const Title2 = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  text-align: center;
`;

const Form = styled.form`
  padding: 4rem 0 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: auto;
`;
const Div = styled.div`
  width: 100%;
  position: relative;
  text-align: ${({ $ta }) => $ta};
`;

const InputAuth = styled.input`
  padding-left: 3.5rem;
  width: 100%;
  height: 3rem;
  background-color: ${({ theme }) => (theme.background === dark.background ? "#181818" : "#f1f5f9")};
  color: ${({ theme }) => theme};
  outline: none;
  border: 3px solid rgba(0, 0, 0, 0);
  border-radius: 25px;
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

const ButtonAuth = styled.button`
  margin: 1rem 0 2rem 0;
  width: 100%;
  height: 3rem;
  background: ${({ theme }) => (theme.color === dark.color ? "#fff" : theme.color)};
  color: ${({ theme }) => theme.background};
  cursor: pointer;
  outline: none;
  text-transform: capitalize;
  border: ${({ theme }) => (theme.color === dark.color ? "1px solid #fff" : "none")};
  border-radius: 25px;
  font-weight: 600;
  &:hover {
    transition: all ease-in-out 0.3s;
    opacity: 0.85;
  }
`;
const Navlink = styled(Link)`
  padding: ${({ $padding }) => $padding};
  font-weight: ${({ $fw }) => $fw};
  color: ${({ theme }) => theme.color};
`;

const Text = styled.p`
  padding: 0.5rem 0 0 0;
`;
