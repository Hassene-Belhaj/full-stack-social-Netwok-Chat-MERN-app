import React, { useEffect } from 'react'
import { Routes , Route , Navigate, Outlet } from 'react-router-dom'
import UserPage from '../UserPage/UserPage'
import Auth from '../Authentication/Auth'
import Home from '../Home/Home'
import { useSelector } from 'react-redux'
import UpdateProfilePage from '../ProfilePage/UpdateProfilePage'
import Spinner from '../../utils/Spinner'
import SinglePostPage from '../Post/SinglePostPage'
import styled from 'styled-components'
import FollowedUserPosts from '../UserPage/FollowedUserPosts'
import RepliesUser from '../Replies/RepliesUser'




const Navigation = ({postModal,commentModal,setCommentModal,confirmModal,setConfirmModal}) => {

   const {isLoggedIn , loading} = useSelector(state=>state.auth)
  
   if(loading) return <FlexContainer><Spinner /></FlexContainer>
   else {
     return (
          <Container $height={postModal ? '100vh' : ''} $overflowY={postModal ? 'hidden' : 'auto'}>
            <Routes>
                  <Route path='signup'  element={!isLoggedIn?  <Auth type='signup'/> : <Navigate  to='/' /> } />
                  <Route path='signin'  element={!isLoggedIn?  <Auth type='signin' /> : <Navigate  to='/' /> } />
                
                  <Route path='/:username' element={<UserPage commentModal={commentModal} setCommentModal={setCommentModal} confirmModal={confirmModal} setConfirmModal={setConfirmModal}/>} > 
                   <Route path='threads' element={<FollowedUserPosts/>} />
                   <Route path='replies' element={<RepliesUser />}/>
                  
                  </Route>
                 
                  <Route path=':username/post/:id' element={<SinglePostPage commentModal={commentModal} setCommentModal={setCommentModal} confirmModal={confirmModal} setConfirmModal={setConfirmModal} />} />
                  <Route path='update/:username' element={isLoggedIn?  <UpdateProfilePage /> : <Navigate  to='/signin' /> } />
                  
                  <Route path='' element={<Home commentModal={commentModal} setCommentModal={setCommentModal} />} />
                  <Route path='*' element={<h2 style={{padding:'4rem 0',textAlign:'center' ,fontSize:'1rem'}}>Error</h2>} />
            </Routes>
          </Container>  
      
    )
  }
}
  
  
  export default Navigation
  

  const FlexContainer = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  `

  const Container = styled.div`
  height: ${({$height})=>$height};
  overflow-y: ${({$overflowY})=>$overflowY};
  margin:auto;
  `
