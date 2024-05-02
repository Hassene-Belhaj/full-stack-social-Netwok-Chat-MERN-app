import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import RepliesUserPost from "./RepliesUserPost";

const RepliesUser = () => {
  const [userReplies, setUserReplies] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserReplies = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/posts/post/replies", {});
      console.log(data.resp);
      setUserReplies(data.resp);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserReplies();
  }, []);

  console.log(userReplies)

  return (
    <Container>
      {userReplies !==null && userReplies.map(({_id,createdAt,image,likes,postedBy,replies,text},i)=> {
        return (
          <RepliesUserPost key={i} id={_id} createdAt={createdAt} image={image} likes={likes} postedBy={postedBy} replies={replies} text={text} />
        )
      })}
    
    </Container>
  );
};

export default RepliesUser;

const Container = styled.div`
padding-bottom: 2rem;
`