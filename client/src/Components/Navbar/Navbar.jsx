import React  from 'react'
import styled from 'styled-components'
import { Button, Image, Nav } from '../Global/GlobalStyle'
import logo1 from '/light-logo.svg'
import logo2 from '/dark-logo.svg'



const Navbar = ({theme , setTheme}) => {
 
    const handleToggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        localStorage.setItem('theme' , theme ==='dark' ? 'light' : 'dark')
    }

  return (
    <Nav $height='80px' $display='flex' $jc='center' $ai='center'>
            <Image $width='2rem' $height='2rem' $cursor='pointer'  onClick={handleToggleTheme} src={theme === 'dark' ? logo1 : logo2} alt="logo" />
    </Nav>   
  )
}

export default Navbar