import React, { useEffect } from 'react'
import UserHeader from './UserHeader'
import UserPosts from './UserPosts'
import verified from '/verified.png'
import { Container, Title4 } from '../Global/GlobalStyle'
import { useSelector  , useDispatch} from 'react-redux'
import { getProfileAction } from '../../redux/actions/actions'
import { useParams } from 'react-router-dom'
import Spinner from '../../utils/Spinner'
import { useState } from 'react'

const UserPage = () => {
  const dispatch = useDispatch()
  const {userProfile,authentication,loading} = useSelector(state=>state.auth)
  const {username} = useParams()


  useEffect(()=>{
    dispatch(getProfileAction(username))  
  },[])


  // console.log(user)

  if(loading) return <Container $height='100vh' $display='flex' $jc='center' $ai='center'> <Spinner /> </Container>
  else if(!userProfile) return <Container><Title4 $paddingTop='8rem' $ta='center' $fw='400'>No User was found With This Username</Title4></Container>
  else { 
    return (
    <Container $maxWidth='620px' $margin='auto'>
          <UserHeader  user={userProfile} authentication={authentication} />
          <UserPosts avatar='zuck-avatar.png' verified={verified} postTitle={'lets Talk about Threads'} postImage={'post1.png'} likes={'7000'} replies={1200}/>
          <UserPosts avatar='zuck-avatar.png' verified={verified} postTitle={'nice tutorial'} postImage={'post2.png'} likes={'468'} replies={103} />
          <UserPosts avatar='zuck-avatar.png' verified={verified} postTitle={'i love this guy'} postImage={'post3.png'} likes={'280'} replies={98}/>
          <UserPosts avatar='zuck-avatar.png' verified={verified} postTitle={'lets code clone tutorial'} postImage={'post2.png'} likes={'5420'} replies={869}/>
    </Container>
  )
}
}

export default UserPage