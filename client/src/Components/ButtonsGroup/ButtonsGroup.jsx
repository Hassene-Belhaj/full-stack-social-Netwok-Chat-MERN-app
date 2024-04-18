import React from 'react'
import { ButtonScaleEffect, FlexContainer } from '../Global/GlobalStyle'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { TbMessageCircle } from 'react-icons/tb'
import { GrSync } from 'react-icons/gr'
import { FiSend } from 'react-icons/fi'

const ButtonsGroup = ({like,handleClickLike,padding}) => {
  return (
    <FlexContainer $display='flex' $ai='center' $gap='1rem' $padding={padding ? padding : null }>

        <ButtonScaleEffect onClick={handleClickLike}  $display='flex' $jc='center' $ai='center'  $padding='8px' $border='none' $br='50%'>{like ? <FaRegHeart  size={25}/> : <FaHeart color='#ef4444' size={25}/> }</ButtonScaleEffect>

        <ButtonScaleEffect   $display='flex' $jc='center' $ai='center'  $padding='8px' $border='none' $br='50%'><TbMessageCircle size={25}/></ButtonScaleEffect>

        <ButtonScaleEffect   $display='flex' $jc='center' $ai='center'  $padding='8px' $border='none' $br='50%'><GrSync size={25}/></ButtonScaleEffect>

        <ButtonScaleEffect   $display='flex' $jc='center' $ai='center'  $padding='8px' $border='none' $br='50%'><FiSend size={25}/></ButtonScaleEffect>
  
</FlexContainer>
  )
}

export default ButtonsGroup