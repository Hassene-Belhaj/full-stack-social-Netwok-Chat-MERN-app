import React  from 'react'
import styled from 'styled-components'
import { Button, Image, Nav } from '../Global/GlobalStyle'




const Navbar = ({theme , setTheme}) => {
 
    const handleToggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        localStorage.setItem('theme' , theme ==='dark' ? 'light' : 'dark')
    }

  return (
    <Nav $height='80px' $display='flex' $jc='center' $ai='center'>
            <Image $width='2rem' $height='2rem' $cursor='pointer'  onClick={handleToggleTheme} src={theme === 'dark' ? "light-logo.svg" : "dark-logo.svg"} alt="" />
    </Nav>   
  )
}

export default Navbar