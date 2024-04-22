import React, { useEffect } from 'react'
import { ButtonTheme1, ButtonTheme2, Container, Div, DivMenu, FlexContainer, ItemDiv, Text, Title2, Title3, Title4 } from '../Global/GlobalStyle'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const ConfirmModal = ({confirmModal , setConfirmModal , postID}) => {
  const RefModal =  useRef(null)
  console.log(postID)

  useEffect(()=>{
    const handler = (e) => {
      if(!RefModal.current.contains(e.target)) {
         setConfirmModal(false)
      }
    }
    document.addEventListener('click' , handler)
    return () => document.removeEventListener('click',handler)

  },[])

  

  const handleDeletePost = async() => {
    // try {
    //   const {data} = await axios.delete(`/posts/${postID}`) 
    //   console.log(data)
    //   if(data.success) {
    //     toast.success('post deleted successfully')
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }


  return (
    <Container $position='fixed' $inset='0' $bg='rgba(0,0,0,0.8)' $z='3000'>
        <FlexContainer ref={RefModal}  $position='absolute' $top='50%'  $left='50%' $transform='translate(-50%,-50%)'  $display='flex' $jc='center' $ai='center'>
            <DivMenu  $padding='2rem' $maxWidth='620px' $height='auto' $br='15px'>
                  {/* <ItemDiv  $height='3rem' $width='100%' $display='flex' $jc='center' $ai='center'> */}
                      <Title4 $fw='500' $tt='capitalize'>Are You sure You Want to Delete This Post</Title4> 
                  {/* </ItemDiv> */}
                  <Div $width='100%' $heigh='100%' $display='flex' $ai='center' $gap='1rem' $padding='2rem 0 0 0'>
                    <ButtonTheme2 onClick={()=>setConfirmModal(false)} >Cancel</ButtonTheme2>
                    <ButtonTheme1 onClick={handleDeletePost} >Confirm</ButtonTheme1>
                  </Div> 
            </DivMenu>
        </FlexContainer>
    </Container>
  )
}

export default ConfirmModal