import React, { useState } from 'react'
import { Button1, Container, Div, FlexContainer, Image, Span, Text,Title5 } from '../Global/GlobalStyle'
import { BsThreeDots } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { BiMessageRounded } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { IoMdSync } from "react-icons/io";
import MenuList from '../MenuList/MenuList';




const height = `calc(100% - 4rem)`

const UserPost = ({avatar,postTitle,postImage,likes,replies}) => {

  const [like , setLike] =  useState(false)
  const [menuList , setMenuList] =  useState(false)

  const handleClickLike = () => {
    setLike(!like)
  }

  const handleBlur = () => {
    setTimeout(() => { 
      setMenuList(false)
     }, 300)
  }
  return (
    <Container $paddingTop='2rem' >
      <FlexContainer $display='flex' $gap='.5rem'>
        <Div $width='4rem' $position='relative'>
          <Image $width='4rem' $height='4rem' src={avatar} $br='50%'/>
          <Div $position='absolute' $top='5rem' $left='50%' $transform='translateX(-50%)' $width='2px' $height={height} $bg='gray'></Div>
        </Div>

        <Div>

        </Div>

        <FlexContainer  $display='flex' $gap='1rem'>
          
          <FlexContainer $display='flex' $fd='column' $gap='1rem'>

            <FlexContainer $display='flex' $jc='space-between' $position='relative'  >
                <Div $display='flex' $gap='.5rem' >
                    <Title5>markzuckerberg</Title5>
                    <Div $width='1.3rem' >
                        <Image  $width='100%' src='verified.png' $br='15px' />
                    </Div>
                </Div>
                <Div $display='flex' $ai='center' $gap='1rem'>
                  <Title5 $color='gray'>1d</Title5>

                    <Button1  onClick={()=>setMenuList(!menuList)} onBlur={handleBlur} $padding='8px' $br='50%'  $border='none' $display='flex' $jc='center' $ai='center'>
                      <BsThreeDots size={25}  color='gray'/>
                    </Button1>
                </Div>
              {menuList && (
                    <MenuList />
              )}

            </FlexContainer>
              

             <Text>{postTitle}</Text>
              <Div $width='100%'  >
                <Image $width='100%' $br='15px' src={postImage} />
              </Div>

              <FlexContainer $display='flex' $ai='center' $gap='1rem'>

                  <Button1  $display='flex' $jc='center' $ai='center'  $padding='8px' $border='none' $br='50%'>{like ?<FaRegHeart onClick={handleClickLike}  size={25}/> : <FaHeart onClick={handleClickLike} color='#ef4444' size={25}/> }</Button1>

                     <Button1   $display='flex' $jc='center' $ai='center'  $padding='8px' $border='none' $br='50%'><BiMessageRounded size={25}/></Button1>

                     <Button1   $display='flex' $jc='center' $ai='center'  $padding='8px' $border='none' $br='50%'><IoMdSync size={25}/></Button1>

                     <Button1   $display='flex' $jc='center' $ai='center'  $padding='8px' $border='none' $br='50%'><FiSend size={25}/></Button1>
                
              </FlexContainer>

          </FlexContainer>
        </FlexContainer>
         
      </FlexContainer>

      <FlexContainer $display='flex' $gap='1rem' $paddingTop='1rem'>
        <Div $width='4rem' $height='4rem' $position='relative' $bg='transparent'>
            <Div $position='absolute' $top='4px' $right='25%' $transform='translateX(25%)' $width='1.6rem' $height='1.6rem' ><Image $br='50%' $width='100%'$height='100%' src='zuck-avatar.png'/></Div>
            <Div $position='absolute'  $top='10px' $left='4px'   $width='1.4rem' $height='1.4rem' ><Image $br='50%' $idth='100%'$height='100%' src='zuck-avatar.png'/></Div>
            <Div $position='absolute' $top='34px' $right='50%' $transform='translate(50%)'  $width='1.2rem' $height='1.2rem' ><Image $br='50%' $width='100%'$height='100%' src='zuck-avatar.png'/></Div>
        </Div>
        <Div $display='flex' $ai='center'><Text $color='gray'>{replies} replies <Span $margin='0 .5rem'> &#x2022; </Span>{likes} likes</Text></Div>
      </FlexContainer>
       
    </Container>
  )
}

export default UserPost