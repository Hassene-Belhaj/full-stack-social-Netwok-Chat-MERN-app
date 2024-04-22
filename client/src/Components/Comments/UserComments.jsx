import React from 'react'
import { ButtonScaleEffect, ContainerBorderBottom, Div, FlexContainer, Image, Section, Span, Text, Title5 } from '../Global/GlobalStyle'
import { useState } from 'react'
import MenuList from '../MenuList/MenuPost'
import { BsThreeDots } from 'react-icons/bs'
import ButtonsGroup from '../ButtonsGroup/ButtonsGroup'

const UserComments = ({userProfilePic,createdAt,comment,username,text,likes}) => {

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
    <ContainerBorderBottom $padding='1rem 0'>
       <Section $display='flex'  $ai='center' $jc='space-between'>
            <FlexContainer $display='flex' $gap='1rem'>
                <Div $width='3rem' $height='3rem'>
                    <Image $width='100%' $height='100%' $objectfit='cover' src={userProfilePic} $br='50%' />
                </Div>
                <Div $display='flex' $ai='center'>
                  <Title5>{username}</Title5> 
                </Div>
            </FlexContainer>

            <FlexContainer $display='flex' $position='relative'  >
                <Div $display='flex' $ai='center' $gap='1rem'>
                    <Title5 $color='gray'>{}</Title5>
                    <ButtonScaleEffect onClick={()=>setMenuList(!menuList)} onBlur={handleBlur} $padding='8px' $br='50%'  $border='none' $display='flex' $jc='center' $ai='center'>
                        <BsThreeDots size={15}  color='gray'/>
                    </ButtonScaleEffect>
                </Div>
                {menuList && (
                <MenuList />
                )}
            </FlexContainer>
            

       </Section>
        <Section $padding='0 0 0 3rem' $display='flex' $fd='column' $gap='1rem'>
              <Text $padding='0 0 0 1rem'> 
               {text}
              </Text>
              <ButtonsGroup padding='0 0 0 .5rem' like={like} handleClickLike={handleClickLike} />
              <Div $display='flex' $padding='0 0 0 1rem' $ai='center'><Text $color='gray'> mentions <Span $margin='0 .5rem'> &#x2022; </Span>{likes.length} likes</Text></Div>
        </Section>
    </ContainerBorderBottom>
  )
}

export default UserComments