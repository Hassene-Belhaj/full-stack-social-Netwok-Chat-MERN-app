import React from 'react'
import { Routes , Route , Navigate } from 'react-router-dom'
import UserPage from '../UserPage/UserPage'
import Auth from '../Authentication/Auth'
import Home from '../Home/Home'
import { useSelector } from 'react-redux'
import UpdateProfilePage from '../ProfilePage/UpdateProfilePage'
import Spinner from '../../utils/Spinner'
import SinglePostPage from '../Post/SinglePostPage'
import styled from 'styled-components'




const Navigation = ({postModal,confirmModal,setConfirmModal}) => {
    
   const {isLoggedIn , loading} = useSelector(state=>state.auth)
  
   if(loading) return <Container $height='100vh' $display='flex' $jc='center' $ai='center'> <Spinner /> </Container>
   else {
     return (
       <>
          <Container $height={postModal | confirmModal.show ? 'calc(100vh - 80px)' : '100%'} $overflowY={postModal | confirmModal.show ? 'hidden' : 'auto'}>
            <Routes>
                  <Route path='signup'  element={!isLoggedIn?  <Auth type='signup'/> : <Navigate  to='/' /> } />
                  <Route path='signin'  element={!isLoggedIn?  <Auth type='signin' /> : <Navigate  to='/' /> } />
                  <Route path=':username' element={<UserPage  confirmModal={confirmModal} setConfirmModal={setConfirmModal}/>} />
                  <Route path=':username/post/:id' element={<SinglePostPage confirmModal={confirmModal} setConfirmModal={setConfirmModal} />} />
                  <Route path='update/:username' element={isLoggedIn?  <UpdateProfilePage /> : <Navigate  to='/signin' /> } />
                  <Route path='' element={<Home/>} />
                  <Route path='*' element={<h2 style={{padding:'4rem 0',textAlign:'center' ,fontSize:'1rem'}}>Error</h2>} />
            </Routes>
          </Container>  
          </>
      
    )
  }
}
  
  
  export default Navigation

  const Container = styled.div`
  height: ${({$height})=>$height};
  margin:auto;
  overflow-y: ${({$overflowY})=>$overflowY};
  `