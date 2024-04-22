import React, { useEffect } from 'react'
import {DivMenu,ItemDiv, Title4 } from '../Global/GlobalStyle'
import {useSelector } from 'react-redux'
import ConfirmModal from '../ConfirmModal/ConfirmModal'


const MenuPost = ({confirmModal , setConfirmModal , postID, username}) => {
  // const dispatch = useDispatch()
  const {authentication} = useSelector(state=>state.auth)
  
  console.log(postID)

  const handleClickModal = async() => {
    setTimeout(() => { 
      setConfirmModal(true)
     }, 300)
  }


  return (
          <>
        <DivMenu $position='absolute' $bottom={'0rem'} $transform='translateY(100%)'  $right='0rem'  $width='15rem' $height='auto' $br='15px' $display='flex' $fd='column' $jc='center' $ai='center'  $z='1000'>
        {username === authentication?.username && (
                <ItemDiv onClick={handleClickModal} $height='3rem' $width='100%' $display='flex' $jc='center' $ai='center'>
                        <Title4  $ta='center' $cursor='pointer'  $bg='transparent'  $width='100%' $fw='600'>Delete</Title4>   
                </ItemDiv>
                )}
                <ItemDiv  $height='3rem' $width='100%' $display='flex' $jc='center' $ai='center'>
                        <Title4  $ta='center' $cursor='pointer'  $bg='transparent'  $width='100%' $fw='600'>Lorem</Title4>   
                </ItemDiv>

                <ItemDiv  $height='3rem' $width='100%' $display='flex' $jc='center' $ai='center'>
                        <Title4  $ta='center' $cursor='pointer'  $bg='transparent'  $width='100%' $fw='600'>Lorem</Title4>   
                </ItemDiv>

                <ItemDiv  $height='3rem' $width='100%' $display='flex' $jc='center' $ai='center'>
                        <Title4  $ta='center' $cursor='pointer'  $bg='transparent'  $width='100%' $fw='600'>Lorem</Title4>   
                </ItemDiv>
        </DivMenu>
</>
  )
}

export default MenuPost