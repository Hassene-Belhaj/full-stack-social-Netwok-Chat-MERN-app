import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import verified from '/verified.png'
import UserComments from '../Comments/UserComments'
import { useParams } from 'react-router-dom'
import Spinner from '../../utils/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getSinglePostAction } from '../../redux/actions/actions'
import styled from 'styled-components'
import FormAddComment from '../Comments/FormAddComment'

const SinglePostPage = ({confirmModal , setConfirmModal}) => {
    const dispatch = useDispatch()
    const {posts,loading} = useSelector(state=>state.posts)
    const {id} = useParams()

  useEffect(()=>{
     dispatch(getSinglePostAction(id))
  },[])
     

  if(loading) return <Container $height='95vh' $display='flex' $ai='center' $jc='center'><Spinner Size={'8px'} /></Container> 
  else {
  return (
    <Container $maxWidth='620px' $padding='0 1rem 4rem 1rem' $margin='auto'>
        <PostCard confirmModal={confirmModal} setConfirmModal={setConfirmModal} id={posts._id} username={posts?.postedBy?.username} postedBy={posts.postedBy} avatar={posts?.postedBy?.profilePic} verified={verified}  text={posts.text} image={posts.image} likes={posts.likes} replies={posts.replies} createdAt={posts.createdAt}  />
        {posts?.replies?.map(({_id,userID,text,userProfilePic,username},i) => {
          return (
            <UserComments key={i}  id={_id} userProfilePic={userProfilePic} createdAt={'2d'} text={text} username={username} likes={'62'}  lastPost={posts.replies[posts.replies.length-1]._id}/>
          )
        })}


    </Container>
  )
}
}    

export default SinglePostPage;


const Container = styled.div`
max-width:${({$maxWidth})=>$maxWidth};
height: ${({$height})=>$height};
display: ${({$display})=>$display};
justify-content: ${({$jc})=>$jc};
align-items: ${({$ai})=>$ai};
gap: ${({$gap})=>$gap};
margin: ${({$margin})=>$margin};
padding: ${({$padding})=>$padding};
`