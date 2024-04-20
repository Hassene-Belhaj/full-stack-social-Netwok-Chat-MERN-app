import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import avatar from '/zuck-avatar.png'
import postImage from '/post3.png'
import verified from '/verified.png'
import UserComments from '../Comments/UserComments'
import { Container } from '../Global/GlobalStyle'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../../utils/Spinner'

const PostPage = () => {
    const [loading , setLoading] = useState(true)
    const [Data , setData] = useState(null)
    const {id} = useParams()
    console.log(id)

  const getPost = async() => {
    try {
      setLoading(true)
      const {data} = await axios.get(`/posts/${id}`)
      console.log(data.resp)
      setData(data.resp)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getPost()
  },[])

  
  if(loading) return <Spinner />
  else {
  return (
    <Container $maxWidth='620px' $margin='auto'>
        <PostCard id={Data._id} postedBy={Data.postedBy} avatar={Data.postedBy.profilePic} verified={verified}  text={Data.text} image={Data.image} likes={Data.likes} replies={Data.replies} createdAt={Data.createdAt}  />
        {Data.replies.map(({_id,userID,text,userProfilePic,username},i) => {
          return (
            <UserComments key={i} userProfilePic={userProfilePic} createdAt={'2d'} comment={'nice post i like it'} username={'Zuck'} likes={'62'} />
          )
        })}
    </Container>
  )
}
}    


export default PostPage