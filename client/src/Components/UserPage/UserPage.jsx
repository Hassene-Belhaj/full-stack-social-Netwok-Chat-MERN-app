import React, { useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import verified from "/verified.png";
import { useSelector, useDispatch } from "react-redux";
import { GetAllPostsProfileAction, GetUserRepliesAction, getProfileAction } from "../../redux/actions/actions";
import { useLocation, useParams } from "react-router-dom";
import Spinner from "../../utils/Spinner";
import styled from "styled-components";
import RepliesUser from "../Replies/RepliesUser";
import FollowedUserPosts from "./FollowedUserPosts";

const UserPage = ({ confirmModal, setConfirmModal }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("Threads") // userHeader sections theads and replies
  const { userProfile, authentication, loading_profile } = useSelector((state) => state.auth);
  const { posts, replies, loading, error, isAdded, isDeleted } = useSelector((state) => state.posts);
  const { username } = useParams();
  const {pathname} = useLocation()
  console.log(pathname)

  useEffect(() => {
    dispatch(getProfileAction(username));
    dispatch(GetAllPostsProfileAction(username));
    dispatch(GetUserRepliesAction(username));
  }, [username, isAdded]);


  useEffect(()=>{
  const pathnameActive = pathname.split('/').pop()  
    if(pathnameActive === 'threads') setActive('Threads')
    if(pathnameActive === 'replies') setActive('Replies')  
    if(pathnameActive === 'reposts') setActive('Reposts')  
  },[])

  
  if (loading_profile | loading)
    return (
      <Container $height="100vh" $display="flex" $ai="center" $jc="center">
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
        <UserHeader user={userProfile} authentication={authentication} active={active} setActive={setActive} />
        {active === "Threads" ? (
          <>
            {!posts.length ? (
              <Container $padding="1rem 0 0 0" $margin="auto">
                <Title4 $fs="1rem" $fw="400" $ta="left">
                  User has no posts .
                </Title4>
              </Container>
            ) : (
              <>
                {posts.map(({ _id, postedBy, image, text, likes, createdAt, replies }, i) => {
                  return <FollowedUserPosts confirmModal={confirmModal} setConfirmModal={setConfirmModal} key={i} id={_id} avatar={postedBy.profilePic} username={postedBy.username} verified={verified} postTitle={text} postImage={image} likes={likes} replies={replies} createdAt={createdAt} />;
                })}
              </>
            )}
          </>
        ) : (
          <>
            {!replies.length ? (
              <Container $padding="1rem 0 0 0" $margin="auto">
                <Title4 $fs="1rem" $fw="400" $ta="left">
                  User has no replies .
                </Title4>
              </Container>
            ) : (
              <RepliesUser user={userProfile} authentication={authentication} replies={replies} />
            )}
          </>
        )}
      </Container>
    );
  }
};

export default UserPage;

const Container = styled.div`
  width: ${({ $width }) => $width};
  max-width: ${({ $maxWidth }) => $maxWidth};
  height: ${({ $height }) => $height};
  display: ${({ $display }) => $display};
  justify-content: ${({ $jc }) => $jc};
  align-items: ${({ $ai }) => $ai};
  gap: ${({ $gap }) => $gap};
  margin: ${({ $margin }) => $margin};
  padding: ${({ $padding }) => $padding};
`;
const Title4 = styled.h4`
  text-align: ${({ $ta }) => $ta};
  font-size: ${({ $fs }) => $fs};
  font-weight: ${({ $fw }) => $fw};
`;
