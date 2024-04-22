import React, { useEffect, useState } from 'react'
import { Routes , Route , Navigate } from 'react-router-dom'
import { Container } from '../Global/GlobalStyle'
import UserPage from '../UserPage/UserPage'
import PostPage from '../Post/PostPage'
import Auth from '../Authentication/Auth'
import Home from '../Home/Home'
import { useSelector } from 'react-redux'
import UpdateProfilePage from '../ProfilePage/UpdateProfilePage'
import Spinner from '../../utils/Spinner'
import ConfirmModal from '../ConfirmModal/ConfirmModal'



const Navigation = ({showModal,confirmModal,setConfirmModal}) => {
    
   const {isLoggedIn , loading} = useSelector(state=>state.auth)
  //  console.log(isLoggedIn)  
  
   if(loading) return <Container $height='100vh' $display='flex' $jc='center' $ai='center'> <Spinner /> </Container>
   else {
     return (
       <>
          <Container $margin='auto' $height={showModal ? '100vh' : '100%'} $overflowY={showModal ? 'hidden' : 'auto'}>
            <Routes>
                  <Route path='signup'  element={!isLoggedIn?  <Auth type='signup'/> : <Navigate  to='/' /> } />
                  <Route path='signin'  element={!isLoggedIn?  <Auth type='signin' /> : <Navigate  to='/' /> } />
                  <Route path=':username' element={<UserPage  confirmModal={confirmModal} setConfirmModal={setConfirmModal}/>} />
                  <Route path=':username/post/:id' element={<PostPage confirmModal={confirmModal} setConfirmModal={setConfirmModal} />} />
                  <Route path='update/:username' element={isLoggedIn?  <UpdateProfilePage /> : <Navigate  to='/signin' /> } />
                  <Route path='' element={<Home/>} />
                  <Route path='*'  element={<h2>page error</h2>} />
            </Routes>
          </Container>  
          </>
      
    )
  }
}
  
  
  export default Navigation