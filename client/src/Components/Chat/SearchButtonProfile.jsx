import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { IconAiOutlineSearch } from "../../utils/Icons";
import { dark } from "../../utils/ThemeColors";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../redux/actions/actions";
import toast from "react-hot-toast";
import Spinner2 from "../../utils/Spinner2";

const SearchButtonProfile = ({ getMessage, conversationData, setConversationData, setMessagesData }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { userProfile, authentication, error, loading } = useSelector((state) => state.auth);
  // console.log(userProfile?._id);

  const handleSearchProfile = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let Data = {};
    Data = Object.fromEntries(formData.entries());
    const { username } = Data;
    if (username === authentication.username) return toast.error("you can not message yourself");
    dispatch(getProfileAction(username));
    inputRef.current.value = "";
  };



  useEffect(() => {
    if(userProfile !== null) {
      const existConversation = conversationData?.some((conversation) => conversation?.participants[0]?._id === userProfile?._id);
      if (existConversation) {
        getMessage(userProfile?._id);
      } else if (!existConversation) {
        const Fakeconversation = {
          _id: Date.now(),
          createdAt: Date.now(),
          participants: [{ _id: userProfile._id, username: userProfile.username, email: userProfile.email, profilePic: userProfile.profilePic }],
          lastMessage: { text: "Start a Conversation", sender: "" },
        };
        setConversationData([...conversationData, Fakeconversation]);
        setMessagesData(
          [{
            _id: Date.now(),
            conversationID: Date.now(),
            createdAt: Date.now(),
            sender: { _id: userProfile._id, username: userProfile.username, email: userProfile.email , profilePic: userProfile.profilePic },
            text: "",
          }],
        )
      }
    }
  }, [userProfile]);

  return (
    <Form onSubmit={handleSearchProfile}>
      <Input autoComplete="on" ref={inputRef} name="username" $width="100%" placeholder="Search for a user" />
      <Button>{loading ? <Spinner2 width={"25px"} height={"25px"} /> : <IconAiOutlineSearch size="25" />}</Button>
    </Form>
  );
};

export default SearchButtonProfile;

const Form = styled.form`
  display: flex;
  width: 100%;
  position: relative;
`;

const Input = styled.input`
  position: ${({ $position }) => $position};
  padding-left: 1rem;
  padding-right: 4rem;
  margin-bottom: ${({ $marginBottom }) => $marginBottom};
  height: 3rem;
  width: ${({ $width }) => $width};
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => (theme.background === dark.background ? "#181818" : "#f1f5f9")};
  outline: none;
  border: 3px solid rgba(190, 190, 190, 0.2);
  border-radius: 10px;
  font-size: 1rem;
  &:focus {
    border: 3px solid #3a5bc7;
    transition: ease-in-out 300ms;
  }
  &::placeholder {
    font-weight: 500;
    color: gray;
  }
`;
const Button = styled.button`
  position: absolute;
  right: 0rem;
  width: 4rem;
  height: 3rem;
  background-color: transparent;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  &:hover {
    background-color: rgba(90, 90, 90, 0.1);
    transition: ease-in-out 0.3s;
  }
`;
