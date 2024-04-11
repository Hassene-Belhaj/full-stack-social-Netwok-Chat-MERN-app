import React, { useEffect } from 'react'
import { Routes , Route , Navigate } from 'react-router-dom'
import { Container } from '../Global/GlobalStyle'
import UserPage from '../UserPage/UserPage'
import PostPage from '../Post/PostPage'
import Auth from '../Authentication/Auth'
import Home from '../Home/Home'
import { useSelector , useDispatch } from 'react-redux'
import UpdateProfilePage from '../ProfilePage/UpdateProfilePage'
import { useLocation } from 'react-router-dom'
import Spinner from '../../utils/Spinner'
import { toast } from 'react-hot-toast'
import { verifyAuthAction } from '../../redux/actions/actions'


const Navigation = () => {
  
   const {authentication , loading} = useSelector(state=>state.auth)
   const {pathname} = useLocation()
   const dispatch = useDispatch() 

   useEffect(() => {
    toast.dismiss()
    dispatch(verifyAuthAction())
  }, [pathname]);
  
  // if(!loading) return <Container $height='100vh' $display='flex' $jc='center' $ai='center'><Spinner /></Container> 
  // else {
        return (
          <>
          <Container $margin='auto' $padding='0 1rem '>
            <Routes>
              <Route path='signup'  element={authentication === null ?  <Auth type='signup'/> : <Navigate  to='/' /> } />
              <Route path='signin'  element={authentication === null ?  <Auth type='signin' /> : <Navigate  to='/' /> } />
              <Route path=':username' element={<UserPage />} />
              <Route path=':username/post/:id' element={<PostPage />} />
              <Route path='update/:username' element={authentication !== null ?  <UpdateProfilePage /> : null}  />
              <Route path='' element={<Home/>} />
              <Route path='*'  element={<h2>page error</h2>} />
            </Routes>
          </Container>  
          </>
      
    )
  }
// }

  
export default Navigation