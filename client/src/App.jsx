import React, { useEffect } from "react";
import Navigation from "./Components/Navigation/Navigation";
import { Toaster } from "react-hot-toast";
import { GlobalStyleCss } from "./Components/Global/GlobalStyle";
import axios from "axios";
import { useLocation } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { verifyAuthAction } from "./redux/actions/actions";
import { dark, light } from "./utils/ThemeColors";
import ConfirmModal from "./Components/ConfirmModal/ConfirmModal";
import PostModal from "./Components/Modals/PostModal";
import ReplyModal from "./Components/Modals/ReplyModal";

const App = () => {
  const dispatch = useDispatch();
  const [postModal, setPostModal] = useState(false); // modal add post
  const [replyModal, setReplyModal] = useState({ type: "", show: false, postId: null }); // modal add comment
  const [confirmModal, setConfirmModal] = useState({ type: "", show: false, postId: null }); // modal delete post confirm

  const [theme, setTheme] = useState(undefined);
  let Get_theme = localStorage.getItem("theme");
  useEffect(() => {
    setTheme(Get_theme ? Get_theme : theme);
  }, []);

  axios.defaults.baseURL = "http://localhost:5000/api";
  axios.defaults.withCredentials = "true";

  const { pathname } = useLocation();

  useEffect(() => {
    toast.dismiss();
    dispatch(verifyAuthAction());
  }, [pathname]);


  return (
    <ThemeProvider theme={theme === "dark" ? dark : light}>
      <GlobalStyleCss confirmModal={confirmModal.show | replyModal.show} />
        <Toaster
          reverseOrder="true"
          toastOptions={{
            duration: 2000,
            style: {
              background: "#d1fae5",
              padding: "1rem 2rem",
              fontWeight: "500",
              textTransform: "capitalize",
            },
            success: {
              iconTheme: {
                primary: "black",
                secondary: "white",
              
              },
            },
            error: {
              iconTheme: {
                primary: "black",
                secondary: "white",
              },
            },
          }}
        />
      <Container>
          {!pathname.includes("sign") ? <Navbar theme={theme} setTheme={setTheme} postModal={postModal} setPostModal={setPostModal} /> : null}
          <Navigation postModal={postModal} setPostModal={postModal} confirmModal={confirmModal} setConfirmModal={setConfirmModal} replyModal={replyModal} setReplyModal={setReplyModal}  theme={theme} setTheme={setTheme} />
          {postModal && <PostModal postModal={postModal} setPostModal={setPostModal} />}
          {confirmModal.show && <ConfirmModal confirmModal={confirmModal} setConfirmModal={setConfirmModal} />}
          {replyModal.show && <ReplyModal replyModal={replyModal} setReplyModal={setReplyModal} />}
      </Container>
    </ThemeProvider>
  );
};

export default App;

const Container = styled.div`
  margin: auto;
  height: 100vh;
`;
