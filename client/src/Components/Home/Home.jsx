import React from 'react'
import { Container ,Navlink } from '../Global/GlobalStyle'
import { useSelector } from 'react-redux'



const Home = () => {
 const {authentication,loading} = useSelector(state=>state.auth)
 console.log(authentication?.username)

  

      return (
        <Container $ta='center' $paddingTop='8rem'>
        <Navlink >
              posts
        </Navlink>
    </Container>
  )
}


export default Home