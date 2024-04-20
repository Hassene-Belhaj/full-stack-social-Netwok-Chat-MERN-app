import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Title3 } from '../Global/GlobalStyle'
import { useEffect } from 'react'
import Spinner from '../../utils/Spinner'
import UserComments from '../Comments/UserComments'
import { FeedPostAction } from '../../redux/actions/actions'
import UserPosts from '../UserPage/UserPosts'



const Home = () => {
  const dispatch = useDispatch()
 const {authentication , isLoggedIn} = useSelector(state=>state.auth)
 const {posts,loading,error} = useSelector(state=>state.posts)

 console.log(posts)
 
 
 useEffect(()=>{
  dispatch(FeedPostAction())
},[])

       if(loading) return <Container $height='95vh' $display='flex' $ai='center' $jc='center'><Spinner Size={'8px'} /></Container> 
       else if(!posts?.length && isLoggedIn) return <Container $padding='8rem 0 0 0'  $margin='auto'><Title3 $fs='1.2rem' $tt='capitalize' $fw='400' $ta="center">follow some users to see the feed</Title3></Container>
       else if(!isLoggedIn) return <Container $padding='8rem 0 0 0'  $margin='auto'><Title3 $fs='1.2rem' $tt='capitalize' $fw='400' $ta="center">{error}</Title3></Container>
       else {
         return (
           <Container $maxWidth='620px' $height='100%' $margin='auto'>
            {posts.map(({_id , image,text,followers,following,username,postedBy,createdAt,replies},i)=>{
              return (
                 <UserPosts 
                    key={i}
                    id={_id}
                    avatar={postedBy.profilePic} 
                    username={postedBy.username}
                    postTitle={text}
                    postImage={image}  
                    createdAt={createdAt}
                    replies={replies}
                    />
                  )
                })}
  
                {/* <UserComments  avatar={postedBy} createdAt={'2d'} comment={'nice post i like it'} username={'Zuck'} likes={'62'}  /> */}
        </Container>
  )
}
}


export default Home