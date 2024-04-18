import React, { useState } from 'react'
import { ButtonScaleEffect, Container, ContainerBorderBottom, Div, FlexContainer, Image, Image2, Navlink, Span, Text,Title5 } from '../Global/GlobalStyle'
import { BsThreeDots } from "react-icons/bs";
import MenuList from '../MenuList/MenuPost';
import ButtonsGroup from '../ButtonsGroup/ButtonsGroup';





const UserPosts = ({avatar,verified,postTitle,postImage,likes,replies}) => {
  
  const height = `calc(100% - 4rem)`

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
    <ContainerBorderBottom $padding='2rem 0' >
      <FlexContainer $display='flex' $gap='.5rem'>
            <Div $width='4rem' $position='relative'>
                <Image $width='4rem' $height='4rem' src={avatar} $br='50%'/>
                <Div $position='absolute' $top='5rem' $left='50%' $transform='translateX(-50%)' $width='1px' $height={height} $bg='gray'></Div>
            </Div>

        <FlexContainer  $display='flex' $gap='1rem'>
          
          <FlexContainer $display='flex' $fd='column' $gap='1rem'>

            <FlexContainer $display='flex' $jc='space-between' $position='relative'  >
                <Div $display='flex' $ai='center' $gap='.5rem' >
                    <Title5>markzuckerberg</Title5>
                    <Div $width='1.3rem' $display='flex' $jc='center' $ai='center' >
                        <Image  $width='100%' src={verified} $br='15px' />
                    </Div>
                </Div>

                <Div $display='flex' $ai='center' $gap='1rem'>
                  <Title5 $color='gray'>1d</Title5>

                    <ButtonScaleEffect  onClick={()=>setMenuList(!menuList)} onBlur={handleBlur} $padding='8px' $br='50%'  $border='none' $display='flex' $jc='center' $ai='center'>
                      <BsThreeDots size={25}  color='gray'/>
                    </ButtonScaleEffect>
                </Div>
                
              {menuList && (
                    <MenuList />
              )}

            </FlexContainer>
              

             <Text>{postTitle}</Text>

              <Div $width='100%'  >
                <Navlink to={'/@zack/post/sssss'}>
                    <Image2 $width='100%' $br='15px' src={postImage} />
                </Navlink>
              </Div>

               <ButtonsGroup handleClickLike={handleClickLike} like={like}/>

          </FlexContainer>
        </FlexContainer>
         
      </FlexContainer>

          <FlexContainer $display='flex' $gap='1rem' $padding='1rem 0 0 0'>
            <Div $width='4rem' $height='4rem' $position='relative' $bg='transparent'>
                <Div $position='absolute' $top='4px' $right='25%' $transform='translateX(25%)' $width='1.6rem' $height='1.6rem' ><Image $br='50%' $width='100%'$height='100%' src='zuck-avatar.png'/></Div>
                <Div $position='absolute'  $top='10px' $left='4px'   $width='1.4rem' $height='1.4rem' ><Image $br='50%' $idth='100%'$height='100%' src='zuck-avatar.png'/></Div>
                <Div $position='absolute' $top='34px' $right='50%' $transform='translate(50%)'  $width='1.2rem' $height='1.2rem' ><Image $br='50%' $width='100%'$height='100%' src='zuck-avatar.png'/></Div>
            </Div>
            <Div $display='flex' $ai='center'><Text $color='gray'>{replies} replies <Span $margin='0 .5rem'> &#x2022; </Span>{likes} likes</Text></Div>
          </FlexContainer>
       
    </ContainerBorderBottom>
  )
}

export default UserPosts