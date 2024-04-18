import React from 'react'
import { useSelector } from 'react-redux'
import CreatePost from '../Post/CreatePost'
import styled from 'styled-components'
import { Container, Div } from '../Global/GlobalStyle'



const Home = () => {
 const {authentication,loading} = useSelector(state=>state.auth)
  
  
      return (
        <Container $maxWidth='620px' $height='800px' $margin='auto'>
  
        </Container>
  )
}


export default Home