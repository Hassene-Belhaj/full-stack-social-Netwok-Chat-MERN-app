import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import verified from '/verified.png'
import UserComments from '../Comments/UserComments'
import { Container } from '../Global/GlobalStyle'
import { useParams } from 'react-router-dom'
import Spinner from '../../utils/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getSinglePostAction } from '../../redux/actions/actions'
import ConfirmModal from '../ConfirmModal/ConfirmModal'

const PostPage = ({confirmModal , setConfirmModal}) => {
     const dispatch = useDispatch()
     const {posts,loading,error} = useSelector(state=>state.posts)
   
    const {id} = useParams()

  useEffect(()=>{
  dispatch(getSinglePostAction(id))
  },[])
     
   console.log(posts)
  
  if(loading) return <Container $height='95vh' $display='flex' $ai='center' $jc='center'><Spinner Size={'8px'} /></Container> 
  else {
  return (
    <Container $maxWidth='620px' $margin='auto'>
        <PostCard confirmModal={confirmModal} setConfirmModal={setConfirmModal} id={posts._id} postedBy={posts.postedBy} avatar={posts?.postedBy?.profilePic} verified={verified}  text={posts.text} image={posts.image} likes={posts.likes} replies={posts.replies} createdAt={posts.createdAt}  />
        {posts?.replies?.map(({_id,userID,text,userProfilePic,username},i) => {
          return (
            <>
            <UserComments key={i} userProfilePic={userProfilePic} createdAt={'2d'} text={text} username={username} likes={'62'} />
            </>
          )
        })}


    </Container>
  )
}
}    


export default PostPage