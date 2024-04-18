import React from 'react'
import PostCard from './PostCard'

import avatar from '/zuck-avatar.png'
import postImage from '/post3.png'
import verified from '/verified.png'
import UserComments from '../Comments/UserComments'
import { Container } from '../Global/GlobalStyle'

const PostPage = () => {
      
  return (
    <Container $maxWidth='620px' $margin='auto'>
        <PostCard avatar={avatar} verified={verified}  postTitle={'i love this guy'} postImage={postImage} likes={'280'} replies={98}  />
        <UserComments avatar={avatar} createdAt={'2d'} comment={'nice post i like it'} username={'Zuck'} likes={'62'} />
        <UserComments avatar={avatar} createdAt={'2d'} comment={'nice post i like it'} username={'Zuck'} likes={'62'} />
        <UserComments avatar={avatar} createdAt={'2d'} comment={'nice post i like it'} username={'Zuck'} likes={'62'} />
        <UserComments avatar={avatar} createdAt={'2d'} comment={'nice post i like it'} username={'Zuck'} likes={'62'} />
        <UserComments avatar={avatar} createdAt={'2d'} comment={'nice post i like it'} username={'Zuck'} likes={'62'} />
    </Container>
  )
}

export default PostPage