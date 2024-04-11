import React, { useEffect,useRef }  from 'react'
import { Button1,Div,Image, Nav, Navlink } from '../Global/GlobalStyle'
import logo1 from '/light-logo.svg'
import logo2 from '/dark-logo.svg'
import { BiMenuAltRight } from 'react-icons/bi'
import { LuUser2 } from "react-icons/lu";
import { useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import MenuNavbar from '../MenuList/MenuNavbar'
import { LogOutAction, verifyAuthAction } from '../../redux/actions/actions'
import { useNavigate } from 'react-router-dom'





const Navbar = ({theme , setTheme }) => {
     const navigate = useNavigate()
     const dispatch = useDispatch()
     const {authentication} = useSelector(state=>state.auth)  
     const Items = ['Theme' ,'Profile', 'Settings' , 'Records' , 'Your Likes' , 'To report a Problem','Sign out']
     const [showMenu , setShowMenu] = useState(false)
     const [toggleTheme , setToggleTheme] = useState(false)
      const menuRef = useRef(null)
      const navBtnRef = useRef(null)
      

      const handleClickShowMenu = ()=> {
          setShowMenu(!showMenu)
          setToggleTheme(false)
      }
      
      useEffect(()=>{
        const handler = (e) => {
      if(!menuRef?.current?.contains(e.target) && !navBtnRef?.current?.contains(e.target)){
       setShowMenu(false)
       setToggleTheme(false)
      }
      }
     document.addEventListener('mousedown',handler)
     return () => document.removeEventListener('mousedown', handler);

    },[])

   
  const handleLogOut = (e) => {
    if(e.target.innerText === 'Sign out') {
     dispatch(LogOutAction())
     setShowMenu(false)
  }
  else if(e.target.innerText === 'Theme') {
      setToggleTheme(true)
  }else if(e.target.innerText === 'Profile') {
    navigate(`/update/${authentication?.username}`)
    setShowMenu(false)
  }  
  }


    return (
      <Nav $height='80px' $maxWidth='1200px' $display='flex' $jc='center' $ai='center' $margin='auto' $position='relative'>
            {showMenu && (
              <Div ref={menuRef}>
                <MenuNavbar theme={theme} setTheme={setTheme}  type='navbar' handleLogOut={handleLogOut} Items={Items} toggleTheme={toggleTheme} setToggleTheme={setToggleTheme} />
              </Div>
              )}
            <Navlink to='/'>
              <Image $position='absolute' $top='50%' $transform='translateY(-50%)' $left='0rem' $width='2rem' $height='2rem' $cursor='pointer'  src={theme === 'dark' ? logo1 : logo2} alt="logo" />
           </Navlink>
              
                <>
                {authentication !== null ? 
                  <Button1 ref={navBtnRef} onClick={handleClickShowMenu} $position='absolute' $top='50%' $transform='translateY(-50%)' $right='0' $padding='4px' $br='50%' $border='none' $display='flex' $jc='center' $ai='center' > 
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

export default Navbar