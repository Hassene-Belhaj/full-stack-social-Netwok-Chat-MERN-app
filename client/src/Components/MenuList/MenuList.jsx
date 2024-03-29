import React from 'react'
import { DivMenu,ItemDiv, Title4 } from '../Global/GlobalStyle'

const MenuList = () => {

  return (
    <DivMenu $position='absolute' $bottom='-.5rem' $transform='translateY(100%)'  $right='0rem' $paddingTop='1rem' $width='15rem' $height='auto' $br='15px' $display='flex' $fd='column' $jc='center' $ai='center' $ta='start' $gap='1rem'>
         {Array(4).fill('lorem').map((item , i)=>{
            return (
                <ItemDiv key={i} $height='3rem' $width='100%'>
                      <Title4 $margin='0 1.5rem' $cursor='pointer'  $bg='transparent'  $width='100%' $fw='600'>{item}</Title4>
                </ItemDiv>
            )
         })}
   </DivMenu> 
  )
}

export default MenuList