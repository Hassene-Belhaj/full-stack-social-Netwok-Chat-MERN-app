import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Spinner from '../../utils/Spinner'
import { FeedPostAction, getProfileAction } from '../../redux/actions/actions'
import FollowedUserPosts from '../UserPage/FollowedUserPosts'
import styled from 'styled-components'


const Home = ({replyModal,setReplyModal}) => {
  const dispatch = useDispatch()
  const {userProfile , isLoggedIn , authentication} = useSelector(state=>state.auth)
  const {posts,loading,error} = useSelector(state=>state.posts)

  // console.log(posts[0]?.replies)
  console.log(posts)
// console.log(authentication)
 
 useEffect(()=>{
  dispatch(FeedPostAction())
},[])

    if(loading && replyModal.show === false) return <FlexContainer><Spinner Size={'8px'} /></FlexContainer> 
    else if(!posts?.length && isLoggedIn) return <Container $padding='8rem 0 0 0'  $margin='auto'><Title3 >follow some users to see the feed</Title3></Container>
    else if(!isLoggedIn) return <Container $padding='8rem 0 0 0'  $margin='auto'><Title3 >{error}</Title3></Container>
    else {
      return (
        <Wrapper >
        {posts?.map(({_id,image,text,postedBy,createdAt,likes,replies},i)=>{
            return (
              <FollowedUserPosts key={i} replyModal={replyModal} setReplyModal={setReplyModal} id={_id} userID={postedBy._id} profilePic={postedBy.profilePic} username={postedBy.username} bio={postedBy.bio} postTitle={text} postImage={image} createdAt={createdAt} likes={likes} replies={replies} followers={postedBy?.followers} following={postedBy?.following} authentication={authentication} />
            ) 
            })}
        </Wrapper>
  )
}
}


export default Home


const FlexContainer = styled.div`
height: calc(100vh - 80px);
display: flex;
align-items: center;
justify-content: center;
margin: auto;
`
const Container = styled.div`
padding: 8rem 0 0 0 ;
margin: auto;
`
const Wrapper = styled.div`
max-width: 620px;
height: 100%;
margin: auto;
`
const Title3 = styled.h3`
font-size: 1.2rem;
text-transform: capitalize;
font-weight: 400;
text-align: center;
`
