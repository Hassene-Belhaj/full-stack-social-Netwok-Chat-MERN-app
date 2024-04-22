import React, { useEffect, useState } from 'react'
import UserHeader from './UserHeader'
import UserPosts from './UserPosts'
import verified from '/verified.png'
import { Container, Title4 } from '../Global/GlobalStyle'
import { useSelector  , useDispatch} from 'react-redux'
import { getProfileAction } from '../../redux/actions/actions'
import { useParams } from 'react-router-dom'
import Spinner from '../../utils/Spinner'
import axios from 'axios'

const UserPage = ({confirmModal,setConfirmModal}) => {
  const dispatch = useDispatch()
  const {userProfile,authentication,loading_profile} = useSelector(state=>state.auth)
  const {username} = useParams()
  const [data , setData] = useState(null)
  

  useEffect(()=>{
    dispatch(getProfileAction(username))
    getAllPostsProfile()
  },[username])
  


  const getAllPostsProfile = async() => {
    try {
      const {data} = await axios.get(`/posts/post/${username}`)
      console.log(data.result)
      setData(data.result)
    } catch (error) {
      console.log(error)
    }
  }

  if(loading_profile) return <Container $height='95vh' $display='flex' $ai='center' $jc='center'><Spinner Size={'8px'} /></Container> 
  else if(!userProfile) return <Container><Title4 $padding='8rem 0 0 0' $ta='center' $fw='400'>No User was found With This Username</Title4></Container>
  else { 
    return (
    <Container $maxWidth='620px' $margin='auto'>
          <UserHeader  user={userProfile} authentication={authentication} />
           {data?.map(({_id,postedBy,image,text,createdAt,likes,replies},i)=>{
            return (
              <UserPosts confirmModal={confirmModal} setConfirmModal={setConfirmModal} key={i} id={_id} avatar={postedBy.profilePic} username={postedBy.username} verified={verified} postTitle={text} postImage={image} likes={'7000'} replies={replies}/> 
            )
           })}
    </Container>
  )
}
}

export default UserPage



