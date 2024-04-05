import React, { useRef }  from 'react'
import { Button1,Div,Image, Nav, Navlink } from '../Global/GlobalStyle'
import logo1 from '/light-logo.svg'
import logo2 from '/dark-logo.svg'
import { BiMenuAltRight } from 'react-icons/bi'
import { LuUser2 } from "react-icons/lu";
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import MenuNavbar from '../MenuList/MenuNavbar'
import { useEffect } from 'react'





const Navbar = ({theme , setTheme }) => {
     const {authentication} = useSelector(state=>state.auth)  
     const Items = ['Theme' , 'Settings' , 'Records' , 'Your Likes' , 'To report a Problem','Sign out']
     const [showMenu , setShowMenu] = useState(false)
     const [toggleTheme , setToggleTheme] = useState(false)
      const menuRef = useRef(null)
     const {pathname} = useLocation()
  
    const handleToggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        localStorage.setItem('theme' , theme ==='dark' ? 'light' : 'dark')
    }


    useEffect(()=>{
     const handler = (e) => {
      if(!menuRef?.current?.contains(e.target)){
       setShowMenu(false)
     }
    }
     document.addEventListener('mousedown',handler)
     return () => document.removeEventListener('mousedown', handler);

    },[])

   
  const handleLogOut = async (e) => {
    if(e.target.innerText === 'Sign out') {
      try {
        const data = await axios.post('/user/logout')
        if(data.status === 200) {
          toast.success(data.data.msg)
          setTimeout(() => { 
            window.location.reload()
        }, 1000)
      }
    } catch (error) {
      console.log(error)
    }
  }
  else if(e.target.innerText === 'Theme') {
    setTimeout(() => { 
      setToggleTheme(true)
     }, 300)
  }  
  }


  if(pathname === '/signin' || pathname=== '/signup') return null
  else {
    return (
      <Nav $height='80px' $maxWidth='1200px' $display='flex' $jc='center' $ai='center' $margin='auto' $position='relative'>
            {showMenu && (

              <Div ref={menuRef}>
                <MenuNavbar  type='navbar' handleLogOut={handleLogOut} Items={Items} toggleTheme={toggleTheme} setToggleTheme={setToggleTheme} />
              </Div>
              )}

            <Image $position='absolute' $top='50%' $transform='translateY(-50%)' $left='0rem' $width='2rem' $height='2rem' $cursor='pointer'  onClick={handleToggleTheme} src={theme === 'dark' ? logo1 : logo2} alt="logo" />
              
                <>
                {authentication !== null ? 
                  <Button1 onClick={()=>setShowMenu(!showMenu)} $position='absolute' $top='50%' $transform='translateY(-50%)' $right='0' $padding='4px' $br='50%' $border='none' $display='flex' $jc='center' $ai='center' > 
                      <BiMenuAltRight size={25}  />
                  </Button1>
                  :
                  <Navlink to='/signin'>
                      <Button1 $position='absolute' $top='50%' $transform='translateY(-50%)' $right='0' $padding='12px' $br='50%' $border='none' $display='flex' $jc='center' $ai='center' > 
                          <LuUser2 size={20} />
                      </Button1>
                  </Navlink>
                 }
                 </>


    </Nav>   
  )
}
}

export default Navbar