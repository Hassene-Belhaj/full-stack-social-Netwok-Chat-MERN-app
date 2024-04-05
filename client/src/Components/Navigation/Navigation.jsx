import React from 'react'
import { Routes , Route } from 'react-router-dom'
import { Container } from '../Global/GlobalStyle'
import Navbar from '../Navbar/Navbar'
import UserPage from '../UserPage/UserPage'
import PostPage from '../Post/PostPage'
import Auth from '../Authentication/Auth'
import Home from '../Home/Home'
import { useSelector } from 'react-redux'


const Navigation = () => {
   const {authentication} = useSelector(state=>state.auth)
  //  console.log(authentication) 

    return (

       <Container $margin='auto' $padding='0 1rem '>
                <Routes>
                   {authentication === null && (
                    <>
                      <Route path='signup'  element={<Auth type='signup'/>} />
                      <Route path='signin'  element={<Auth type='signin' />} />
                    </>
                   ) }
                  <Route path=':username' element={<UserPage />} />
                  <Route path=':username/post/:id' element={<PostPage />} />
                  <Route path='' element={<Home />} />
                </Routes>
        </Container> 
      

)
}

export default Navigation