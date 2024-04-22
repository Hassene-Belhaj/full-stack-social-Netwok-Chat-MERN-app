import React, { useRef, useState } from 'react'
import { ButtonScaleEffect,ContainerBorderBottom,Div, FlexContainer, Image, Image2, Navlink, Span, Text,Title4,Title5 } from '../Global/GlobalStyle'
import { BsThreeDots } from "react-icons/bs";
import ButtonsGroup from '../ButtonsGroup/ButtonsGroup';
import verified from '/verified.png'
import moment from 'moment'
import emoji from '/boredEmoji.png'
import MenuPost from '../MenuList/MenuPost';
import ConfirmModal from '../ConfirmModal/ConfirmModal';


const UserPosts = ({confirmModal,setConfirmModal,id,avatar,postTitle,postImage,username,likes=5,replies,createdAt}) => {
  // console.log(replies[1]?.userProfilePic)
  const RefDivClick = useRef(null)
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
      <FlexContainer $display='flex' $gap='1rem'>
            <Div $width='4rem' $position='relative'>
                 <Navlink to={`/${username}`}>
                       <Image $width='4rem' $height='4rem' $objectfit='cover' src={avatar} $br='50%'/>
                  </Navlink>

                <Div $position='absolute' $top='5rem' $left='50%' $transform='translateX(-50%)' $width='1px' $height={height} $bg='gray'></Div>
            </Div>

        <FlexContainer  $display='flex' $gap='1rem'>
          
          <FlexContainer $display='flex' $fd='column' $gap='1rem'>

            <FlexContainer $display='flex' $jc='space-between' $position='relative'  >

                <Div $display='flex' $ai='center' $gap='.5rem' >
                   <Navlink to={`/${username}`} $td='none'>
                          <Title4>{username}</Title4>
                   </Navlink>
                    <Div $width='1.3rem' $display='flex' $jc='center' $ai='center' >
                        <Image  $width='100%' src={verified} $br='15px' />
                    </Div>
                </Div>

                <Div $display='flex' $ai='center' $gap='1rem'>
                      <Title5 $color='gray'>{moment(createdAt).startOf('day').fromNow()}</Title5>
                    <ButtonScaleEffect  onClick={()=>setMenuList(!menuList)} onBlur={handleBlur} $padding='8px' $br='50%'  $border='none' $display='flex' $jc='center' $ai='center'>
                      <BsThreeDots size={25}  color='gray'/>
                    </ButtonScaleEffect>
                </Div>
                
              {menuList && (
                    <MenuPost confirmModal={confirmModal} setConfirmModal={setConfirmModal} postID={id} username={username} />
              )}

              {confirmModal && (
                    <ConfirmModal confirmModal={confirmModal} setConfirmModal={setConfirmModal} postID={id} />
                  
             )}

            </FlexContainer>
              

             <Text>{postTitle}</Text>

              <Div $maxWidth='620px' ref={RefDivClick}>
                <Navlink to={`/${username}/post/${id}`}>
                    <Image2 $width='100%' $br='15px' $objectfit='cover' src={postImage} />
                </Navlink>
              </Div>

               <ButtonsGroup handleClickLike={handleClickLike} like={like}/>

          </FlexContainer>
        </FlexContainer>
         
      </FlexContainer>

          <FlexContainer $display='flex' $gap='1rem' $padding='1rem 0 0 0'>
            <Div $width='4rem' $height='4rem' $position='relative' $bg='transparent'>
      
               {replies[0] ?  
                 <Div $position='absolute' $top='34px' $right='50%' $transform='translate(50%)'  $width='1.8rem' $height='1.8rem' ><Image $br='50%' $width='100%'$height='100%' $objectfit='cover' src={replies[0].userProfilePic}/></Div>
                : 
                  <Div $position='absolute' $top='8px' $right='50%' $transform='translate(50%)'  $width='2.4rem' $height='2.4rem' $display='flex' $jc='center' $ai='center' >
                    <Image $width='100%' $bg='transparent' src={emoji} />
                  </Div> 
                   }
                {replies[1] && (
                  <Div $position='absolute' $top='4px' $right='25%' $transform='translateX(25%)' $width='1.6rem' $height='1.6rem' ><Image $br='50%' $width='100%' $height='100%' $objectfit='cover' src={replies[1].userProfilePic}/></Div>
                )}
                {replies[2] && (
                  <Div $position='absolute'  $top='10px' $left='4px'   $width='1.4rem' $height='1.4rem' ><Image $br='50%' $idth='100%'$height='100%' $objectfit='cover' src={replies[2].userProfilePic}/></Div>
                )}
            </Div>
            <Div $display='flex' $ai='center'><Text $color='gray'> {replies.length} Replies <Span $margin='0 .5rem'> &#x2022; </Span>{likes} likes</Text></Div>
          </FlexContainer>
       
    </ContainerBorderBottom>
  )
}

export default UserPosts