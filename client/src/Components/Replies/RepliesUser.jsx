import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import RepliesUserPost from "./RepliesUserPost";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../utils/Spinner";

const RepliesUser = ({user,replies}) => {
  const [userReplies, setUserReplies] = useState(replies);
  console.log(user)

    return (
      <Container>
        {userReplies !== null && userReplies.map(({_id,createdAt,image,likes,postedBy,replies,text},i)=> {
          return (
            <RepliesUserPost key={i} user={user} id={_id} createdAt={createdAt} image={image} likes={likes} postedBy={postedBy} replies={replies} text={text} />
          )
        })}
     </Container>
  );
};
// }

export default RepliesUser;

const Container = styled.div`
height: ${({$height})=>$height};
display: ${({$display})=>$display};
justify-content: ${({$jc})=>$jc};
align-items: ${({$ai})=>$ai};
padding-bottom: 2rem;
`