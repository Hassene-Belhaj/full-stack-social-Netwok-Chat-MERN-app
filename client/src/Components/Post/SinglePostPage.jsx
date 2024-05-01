import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import verified from '/verified.png'
import UserComments from '../Comments/UserComments'
import { useParams } from 'react-router-dom'
import Spinner from '../../utils/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getSinglePostAction } from '../../redux/actions/actions'
import styled from 'styled-components'

const SinglePostPage = ({confirmModal , setConfirmModal}) => {
    const dispatch = useDispatch()
    const {singlePost,loading} = useSelector(state=>state.posts)
    const {id} = useParams()

  useEffect(()=>{
     dispatch(getSinglePostAction(id))
  },[])
     

  if(loading) return <Container $height='95vh' $display='flex' $ai='center' $jc='center'><Spinner Size={'8px'} /></Container> 
  else {
  return (
    <Container $maxWidth='620px' $padding='0 1rem 4rem 1rem' $margin='auto'>
        <PostCard confirmModal={confirmModal} setConfirmModal={setConfirmModal} id={singlePost._id} username={singlePost?.postedBy?.username} postedBy={singlePost.postedBy} avatar={singlePost?.postedBy?.profilePic} verified={verified}  text={singlePost.text} image={singlePost.image} likes={singlePost.likes} replies={singlePost.replies} createdAt={singlePost.createdAt}  />
        {singlePost?.replies?.map(({_id,userID,text,userProfilePic,username},i) => {
          return (
            <UserComments key={i}  id={_id} userProfilePic={userProfilePic} createdAt={'2d'} text={text} username={username} likes={'62'}  lastPost={singlePost.replies[singlePost.replies.length-1]._id}/>
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