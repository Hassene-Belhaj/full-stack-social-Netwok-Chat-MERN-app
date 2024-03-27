import React, { useEffect, useState } from 'react'
import { Routes , Route } from 'react-router-dom'
import Home from '../Home/Home'
import { ThemeProvider } from 'styled-components'
import { Container, GlobalStyleCss } from '../Global/GlobalStyle'
import Navbar from '../Navbar/Navbar'
import UserHeader from '../UserPage/UserHeader'


const Navigation = () => {
    const [theme , setTheme] = useState('dark')

    let Get_theme = localStorage.getItem('theme')

    useEffect(()=>{
    setTheme(Get_theme ? Get_theme : theme)
    },[])
  

   
  
    const dark = {
        background : "#101010",
        color : "#f3f5f7 "
    }
  
    const light = {
        background : "#fff",
        color : "#000"
    }
  

  return (
    <ThemeProvider theme={theme === 'dark' ? dark : light }>
        <GlobalStyleCss />
       <Container $maxWidth='620px' $margin='auto'>
                <Navbar theme={theme} setTheme={setTheme} />
                <UserHeader />
                {/* <Home/> */}
        </Container> 
    </ThemeProvider>

  )
}

export default Navigation