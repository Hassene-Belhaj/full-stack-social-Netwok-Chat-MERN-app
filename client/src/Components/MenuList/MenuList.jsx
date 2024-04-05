import React from 'react'
import {Button4, DivMenu,ItemDiv, Title4 } from '../Global/GlobalStyle'

const MenuList = () => {

  return (
    <DivMenu $position='absolute' $bottom={'0rem'} $transform='translateY(100%)'  $right='0rem'  $width='15rem' $height='auto' $br='15px' $display='flex' $fd='column' $jc='center' $ai='center'  $z='1000'>
        <>
         {Array(6).fill('lorem').map((item , i)=>{
           return (
             <ItemDiv key={i} $height='3rem' $width='100%' $display='flex' $jc='center' $ai='center'>
                      <Title4  $ta='center' $cursor='pointer'  $bg='transparent'  $width='100%' $fw='600'>{item}</Title4>   
                </ItemDiv>
            )
          })}
        
        </>      
   </DivMenu> 
  )
}

export default MenuList