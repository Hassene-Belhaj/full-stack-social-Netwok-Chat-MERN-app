import React, { useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import UserPosts from "./FollowedUserPosts";
import verified from "/verified.png";
import { useSelector, useDispatch } from "react-redux";
import { GetAllPostsProfileAction, getProfileAction } from "../../redux/actions/actions";
import { useParams } from "react-router-dom";
import Spinner from "../../utils/Spinner";
import styled from "styled-components";



const UserPage = ({commentModal,setCommentModal ,confirmModal, setConfirmModal }) => {
  const dispatch = useDispatch();
  const { userProfile, authentication, loading_profile } = useSelector((state) => state.auth);
  const { posts, loading, error, isAdded, isDeleted } = useSelector((state) => state.posts);
  const { username } = useParams();

  useEffect(() => {
    dispatch(getProfileAction(username));
    dispatch(GetAllPostsProfileAction(username));
  }, [username, isDeleted, isAdded]);

  // console.log(posts);

  if (loading_profile | loading)
    return (
      <Container $height="95vh" $display="flex" $ai="center" $jc="center">
        <Spinner Size={"8px"} />
      </Container>
    );
  else if (!userProfile)
    return (
      <Container>
        <Title4 $padding="8rem 0 0 0" $ta="center" $fw="400" $tt="capitalize">
          {error}
        </Title4>
      </Container>
    );
  else {
    return (
      <Container $maxWidth="620px" $margin="auto">
        <UserHeader user={userProfile} authentication={authentication} />
        {!posts.length ? (
          <Container $padding="1rem 0 0 0" $margin="auto">
            <Title4 $fs="1rem" $fw="400" $ta="left">
              User has no posts .
            </Title4>
          </Container>
        ) : (
          <>
            {posts.map(({ _id, postedBy, image, text, likes , createdAt, replies }, i) => {
              return <UserPosts confirmModal={confirmModal} setConfirmModal={setConfirmModal} key={i} id={_id} avatar={postedBy.profilePic} username={postedBy.username} verified={verified} postTitle={text} postImage={image} likes={likes} replies={replies} createdAt={createdAt} />;
            })}
          </>
        )}
      </Container>
    );
  }
};

export default UserPage;


const Container = styled.div`
width:${({$width})=>$width};
max-width:${({$maxWidth})=>$maxWidth};
height: ${({$height})=>$height};
display: ${({$display})=>$display};
justify-content: ${({$jc})=>$jc};
align-items: ${({$ai})=>$ai};
gap: ${({$gap})=>$gap};
margin: ${({$margin})=>$margin};
padding: ${({$padding})=>$padding};
`
const Title4 = styled.h4`
text-align: ${({$ta})=>$ta};
font-size: ${({$fs})=>$fs};
font-weight: ${({$fw})=>$fw};
`
