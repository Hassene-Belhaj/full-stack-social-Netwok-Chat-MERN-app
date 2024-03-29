import React from 'react'
import UserComments from '../Comments/UserComments'
import { Button1, ContainerBorderBottom, Div, FlexContainer, Image, Span, Text, Title5 } from '../Global/GlobalStyle'
import { BsThreeDots } from 'react-icons/bs'
import MenuList from '../MenuList/MenuList'
import { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { BiMessageRounded } from 'react-icons/bi'
import { IoMdSync } from 'react-icons/io'
import { FiSend } from 'react-icons/fi'



const PostPage = ({avatar,postTitle,postImage,likes,replies}) => {
    
  const [like , setLike] =  useState(false)
  const [menuList , setMenuList] =  useState(false)

  const handleBlur = () => {
    setTimeout(() => { 
      setMenuList(false)
     }, 300)
  }
    const handleClickLike = () => {
    setLike(!like)
  }


  return (
    <ContainerBorderBottom $padding='1rem 0' >

      <FlexContainer $display='flex' $gap='.5rem' $jc='space-between' $width='100%' >

              <FlexContainer $display='flex' $gap='1rem' >
                
                    <Div $width='4rem' >
                        <Image $width='4rem' $height='4rem' src={avatar} $br='50%'/>
                    </Div>

                    <Div $display='flex' $ai='center' $gap='.5rem' >
                      <Title5>markzuckerberg</Title5>
                      <Div $width='1.3rem' >
                          <Image  $width='100%' src='verified.png' $br='15px' />
                      </Div>
                    </Div>

              </FlexContainer>

                <FlexContainer $display='flex' $position='relative'  >

                          <Div $display='flex' $ai='center' $gap='1rem'>
                            <Title5 $color='gray'>1d</Title5>
                                  <Button1 onClick={()=>setMenuList(!menuList)} onBlur={handleBlur} $padding='8px' $br='50%'  $border='none' $display='flex' $jc='center' $ai='center'>
                                    <BsThreeDots size={15}  color='gray'/>
                                  </Button1>
                          </Div>
                        {menuList && (
                              <MenuList />
                        )}

              </FlexContainer>

      </FlexContainer>

            <FlexContainer $display='flex' $fd='column' $gap='1rem'>
 
                  <Text $padding='.5rem 0'>{postTitle}</Text>
                    <Div $width='100%'  >
                    <Image $width='100%' $br='15px' src={postImage} />
                  </Div>

                    <FlexContainer $display='flex' $ai='center' $gap='1rem'>

                              <Button1   $display='flex' $jc='center' $ai='center'  $padding='8px' $border='none' $br='50%'>{like ?<FaRegHeart onClick={handleClickLike}  size={20}/> : <FaHeart onClick={handleClickLike} color='#ef4444' size={20}/> }</Button1>
                          
                                 <Button1  $display='flex' $jc='center' $ai='center'  $padding='8px' $border='none' $br='50%'><BiMessageRounded size={20}/></Button1>
                          
                               <Button1  $display='flex' $jc='center' $ai='center'  $padding='8px' $border='none' $br='50%'><IoMdSync size={25}/></Button1>
                          
                               <Button1 $display='flex' $jc='center' $ai='center'  $padding='8px' $border='none' $br='50%'><FiSend size={20}/></Button1>
                          
                      </FlexContainer>

         
      </FlexContainer>
 
  
      <FlexContainer $display='flex' $gap='1rem' $paddingTop='1rem'>
        <Div $display='flex' $ai='center'><Text $color='gray'>{replies} replies <Span $margin='0 .5rem'> &#x2022; </Span>{likes} likes</Text></Div>
      </FlexContainer>
       

       
    </ContainerBorderBottom>
    // <UserComments/>
  )
}

export default PostPage