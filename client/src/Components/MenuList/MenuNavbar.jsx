import React, { useState } from 'react'
import {Button, Button1, Button5, Div, DivMenu,FlexContainer,ItemDiv, Span, Title4 } from '../Global/GlobalStyle'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdOutlineLightMode ,MdOutlineDarkMode} from "react-icons/md";





const MenuNavbar = ({handleLogOut,Items,toggleTheme,setToggleTheme}) => {
    
    
  return (
    
    <DivMenu  $position='absolute' $bottom='0' $transform='translateY(100%)'  $right='0rem'  $width={toggleTheme ? '20rem' : '15rem'} 
    $height='auto' $br='15px' $display='flex' $fd='column' $jc='center' $ai='center'  $z='1000' $transition='all ease-in-out 0.1s' >
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
              <ItemDiv  $position='relative' >
                            <Div $height='3rem' $position='absolute' $top='50%' $transform='translateY(-50%)' $left='2rem' $display='flex'>
                              <Button5 $padding='.6rem 1rem' $br='10px' onClick={()=>setToggleTheme(!toggleTheme)} >
                                      <FaLongArrowAltLeft />
                              </Button5>
                            </Div>

                      <Div $height='3rem' $width='100%' $display='flex' $jc='center' $ai='center' >
                        <Title4  onClick={handleLogOut}  $ta='center' $cursor='pointer'  $bg='transparent'   $fw='600'>Theme</Title4>   
                      </Div>
              </ItemDiv>
                          <Div $width='100%' $height='3rem' $display='flex' $gap='.5rem' >
                              <Button5 $flex='1' ><MdOutlineDarkMode size={20} /></Button5>
                              <Button5 $flex='1' ><MdOutlineLightMode size={20} /></Button5>
                            </Div>
          </FlexContainer>
         
 }
   </DivMenu> 

)
}

export default MenuNavbar