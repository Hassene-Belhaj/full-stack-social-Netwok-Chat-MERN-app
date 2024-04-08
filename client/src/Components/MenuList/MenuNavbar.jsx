import React, {useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import {Button5, Div, DivMenu,FlexContainer,ItemDiv,Title4 } from '../Global/GlobalStyle'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdOutlineLightMode ,MdOutlineDarkMode} from "react-icons/md";


const dark = {
  background : "#101010",
  color : "#f3f5f7 "
}

const IconMdOutlineDarkMode = styled(MdOutlineDarkMode)`
position: absolute;
z-index: 10;
right: 50%;
top: 50%;
transform: translate(50%,-50%);
`
const IconMdOutlineLightMode = styled(MdOutlineLightMode)`
position: absolute;
z-index: 1000;
right: 50%;
top: 50%;
transform: translate(50%,-50%);
`

const Button = styled.button`
position: relative;
width: 100%;
height: 3rem;
color: ${({theme})=> theme};
background-color: ${({theme})=>theme.background === dark.background ? '#0A0A0A' : '#f3f3f5'} ;
cursor: pointer;
outline: none;
border: none;
border-top-left-radius: ${({$right})=>$right ? '15px' : 'none'};
border-bottom-left-radius: ${({$right})=>$right ? '15px' : 'none'};
border-top-right-radius: ${({$left})=>$left ? '15px' : 'none'};
border-bottom-right-radius: ${({$left})=>$left ? '15px' : 'none'};
`

const BtnGroup = styled.div`
display: flex;
position: relative;
overflow: hidden;
&:before{
  content: "";
  position: absolute;
  inset: 0;
  background:${({theme})=>theme.background === dark.background ? '#262626' : '#e5e7eb'};
  /* border: .5px solid ${({theme})=>theme.background === dark.background ? 'rgba(255,255,255,0.5)' :'rgba(0,0,0,0.2)'  }; */
  width: 50%;
  border-top-left-radius: ${({$active})=>$active ? '15px' : 'none'};
  border-bottom-left-radius: ${({$active})=>$active ? '15px' : 'none'};
  border-top-right-radius: ${({$active})=>$active ?  'none' : '15px'};
  border-bottom-right-radius: ${({$active})=>$active ? 'none' : '15px'};
  transform: ${({$active})=>!$active? 'translateX(100%)' : null};
  transition: all ease-in-out 0.2s;
  z-index: 1;
}
`


const MenuNavbar = ({handleLogOut,Items,toggleTheme,setToggleTheme,theme,setTheme}) => {

  const [active,setActive] = useState(false) 
  const [menuTransition,setMenuTransition] = useState(true)

  const refBtn = useRef()

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    localStorage.setItem('theme' , theme ==='dark' ? 'light' : 'dark')
    setActive(!active)
}  

  useEffect(()=>{
  const handler = (e) =>{
    if(refBtn?.current?.contains(e.target)) {
      setMenuTransition(false)
    } else {
      setMenuTransition(true)
    }
  } 
    document.addEventListener('click',handler)
  return () => {
    document.removeEventListener('click',handler)
  }
  },[handleToggleTheme])


  return (
    
    <DivMenu  $position='absolute' $bottom='0' $transform='translateY(100%)'  $right='0rem'  $width={toggleTheme ? '20rem' : '15rem'} 
    $height='auto' $br='15px' $display='flex' $fd='column' $jc='center' $ai='center'  $z='1000' $padding='.5rem' $transition={menuTransition ?  'all ease-in-out 0.2s' : null }>
        {!toggleTheme ? 
        <>
            {Items.map((item , i)=>{
                return (
                    <ItemDiv key={i} $height='3rem' $width='100%' $display='flex' $jc='center' $ai='center'>
                        <Title4  onClick={handleLogOut}  $ta='center' $cursor='pointer'  $bg='transparent'  $width='100%' $fw='600'>{item}</Title4>   
                    </ItemDiv>
                )
            })}    
        </>
        :
          <FlexContainer $width='100%' >
                          <Div  $position='relative' >
                                <Div $height='3rem' $position='absolute' $top='50%' $transform='translateY(-50%)' $left='2rem' $display='flex'>
                                  <Button5  $padding='.6rem 1rem' $br='10px' onClick={()=>setToggleTheme(!toggleTheme)} >
                                          <FaLongArrowAltLeft />
                                  </Button5>
                                </Div>

                                <Div $height='3rem' $width='100%' $display='flex' $jc='center' $ai='center' >
                                  <Title4  onClick={handleLogOut}  $ta='center' $cursor='pointer' $fw='500'>Theme</Title4>   
                                </Div>
                          </Div>
                          <Div  $padding='.5rem' ref={refBtn}>
                            <BtnGroup $active={active} >
                              <Div $flex='1' >
                                  <Button onClick={handleToggleTheme} $right ><IconMdOutlineLightMode size={20} /></Button>
                              </Div>  
                              <Div $flex='1' >
                                  <Button onClick={handleToggleTheme} $left ><IconMdOutlineDarkMode size={20} /></Button>
                              </Div>  
                            </BtnGroup>
                          </Div>
          </FlexContainer>
         
 }
   </DivMenu> 

)
}

export default MenuNavbar