import React from 'react'
import { ButtonScaleEffect, ContainerBorderBottom, Div, FlexContainer, Image, Span, Text, Title5 } from '../Global/GlobalStyle'
import { BsThreeDots } from 'react-icons/bs'
import MenuList from '../MenuList/MenuPost'
import { useState } from 'react'
import ButtonsGroup from '../ButtonsGroup/ButtonsGroup'




const PostPage = ({avatar,verified,postTitle,postImage,likes,replies}) => {
    
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
                      <Div $width='1.3rem' $display='flex' $jc='center' $ai='center' >
                          <Image  $width='100%' src={verified} $br='15px' />
                      </Div>
                    </Div>

              </FlexContainer>

                <FlexContainer $display='flex' $position='relative'  >

                          <Div $display='flex' $ai='center' $gap='1rem'>
                            <Title5 $color='gray'>1d</Title5>
                                  <ButtonScaleEffect onClick={()=>setMenuList(!menuList)} onBlur={handleBlur} $padding='8px' $br='50%'  $border='none' $display='flex' $jc='center' $ai='center'>
                                    <BsThreeDots size={15}  color='gray'/>
                                  </ButtonScaleEffect>
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

                   <ButtonsGroup  like={like} handleClickLike={handleClickLike}/>

         
      </FlexContainer>
 
  
      <FlexContainer $display='flex' $gap='1rem' $padding='1rem 0 0 0'>
        <Div $display='flex' $ai='center'><Text $color='gray'>{replies} replies <Span $margin='0 .5rem'> &#x2022; </Span>{likes} likes</Text></Div>
      </FlexContainer>
      
       
    </ContainerBorderBottom>
  )
}

export default PostPage