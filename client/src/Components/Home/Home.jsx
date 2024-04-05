import React from 'react'
import styled from 'styled-components'
import { Navlink } from '../Global/GlobalStyle'


const Container = styled.div`

`


const Home = () => {
  return (
    <Container>
        <Navlink  to={'/@zack'}>
              visit profile page
        </Navlink>
    </Container>
  )
}

export default Home