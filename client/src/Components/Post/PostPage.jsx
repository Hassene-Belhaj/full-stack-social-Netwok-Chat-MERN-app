import React from 'react'
import PostCard from './PostCard'

import avatar from '/zuck-avatar.png'
import postImage from '/post3.png'
import verified from '/verified.png'

const PostPage = () => {
  return (
    <>
     <PostCard avatar={avatar} verified={verified}  postTitle={'i love this guy'} postImage={postImage} likes={'280'} replies={98}  />
    </>
  )
}

export default PostPage