import React from 'react'
import { Button1,ButtonTheme1,Container, ContainerBorderBottom, Div, DivMenu, FlexContainer, Image, Section, Span, Text, Title2, Title4 } from '../Global/GlobalStyle'
import { FaInstagram } from 'react-icons/fa'
import { PiDotsThreeCircle } from "react-icons/pi";
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'




const ButtonStyle = styled.button`
flex: 1;
border: ${({theme})=>`1px solid ${theme.background}`};
cursor: pointer;
text-align: center;
font-weight: 600;
color: ${({theme})=>theme.color};
background: ${({theme})=>theme.background};
border-bottom: ${({theme,$active})=> $active ? `1px solid ${theme.color}` :  '1px solid rgba(0,0,0,0)'} ;
`




const UserHeader = ({user,authentication}) => {
     
    const [menuList , setMenuList] = useState(false)
    const [active , setActive] = useState('Threads')
    
    const [follow , setFollow] = useState(!user?.followers?.includes(authentication?.id))
    const [followersNbr , setFollowersNbr] = useState([...user?.followers])
    const navigate = useNavigate()

    // console.log(follow)

    // console.log(authentication)

    const get_url = () => {
        toast.dismiss()
        const currentUrl  = window.location.href ;
        navigator.clipboard.writeText(currentUrl).then(()=> {
            toast.success('url copied to your clipboard')
        })
    }

    const handleBlurMenu = () => {
        setTimeout(() => { 
            setMenuList(false)
         }, 300)
    }

    const handleFollowUnfollow = async() => {
        try {
            const {data} = await axios.post(`/user/follow/${user._id}`)
            console.log(data)
            setFollow(!follow)
            if(!follow) {
               followersNbr.pop()   
            } else {
               followersNbr.push(authentication.id)
            }
        } catch (error) {
            toast.error(error.response.data.msg)
            setTimeout(() => { 
                navigate('/signin')
             }, 3000)
            console.log(error)
        }

    }

      return (
          <Section>
        <FlexContainer  $width='100%' $display='flex' $jc='space-between'  $paddingTop='4rem' >
            <Div $display='flex' $fd='column' $flex='1'>
            <Title2 $fw='500'>{user?.name}</Title2>
                <Div $display='flex' $ai='center' $padding='4px 0' $gap='1rem'>
                    <Text>{user?.username}</Text>
                    {/* <Button1 $border='none' $padding='4px 12px' $br='25px'>threads.net</Button1> */}
                </Div>
            </Div>
            <Div $flex='1' $display='flex' $jc='end'>
                <Image $width='5rem' $height='5rem' $br='50%' src={user?.profilePic}  $objectfit='cover' />
            </Div>
        </FlexContainer>
        
        <Container $display='flex' $fd='column' $padding='1rem 0' $gap='1rem' >

                    <Text >{user?.bio}</Text>

            <FlexContainer $display='flex' $jc='space-between' $ai='center'> 
                <Div>
                        <Text $color='gray'>{followersNbr?.length} followers &#x2022; instagram.com</Text>
                </Div> 

                <Div $display='flex' $ai='center' $jc='center' $gap='.5rem' $position='relative'>

                    <Button1  $padding='4px' $br='50%' $border='none' $display='flex' $jc='center' $ai='center' > <FaInstagram size={25} /> </Button1> 
 
                    <Button1  onBlur={handleBlurMenu} onClick={()=>setMenuList(!menuList)}  $padding='4px' $br='50%' $border='none' $display='flex' $jc='center' $ai='center' > <PiDotsThreeCircle size={25} /></Button1> 

                    
            {menuList && (
                <DivMenu $position='absolute' $bottom='-.5rem' $transform='translateY(100%)'  $right='0rem' $padding='1rem' $width='15rem' $br='15px' $display='flex' $fd='column' $jc='center' $ai='center' $ta='center'>
                    <Span $height='3rem'>
                      <Title4 $ta='center'  $cursor='pointer' onClick={get_url} $bg='transparent'  $width='100%' $fw='600'>Copy link</Title4>
                    </Span>
                </DivMenu>
            )}
                </Div>
            </FlexContainer>   
        </Container>
        {user._id === authentication?.id && (
            <NavLink to={`/update/${user.username}`}>
                <Div $width='50%' $padding='1.5rem 0'>
                    <ButtonTheme1 type='reset' > Update Profile </ButtonTheme1> 
                </Div>
        </NavLink>    
        )} 
         {user._id !== authentication?.id && (
             <Div $width='50%' $padding='1.5rem 0'>
              
              <ButtonTheme1 onClick={handleFollowUnfollow} type='reset'> {follow ? 'follow' : 'Unfollow'} </ButtonTheme1> 
        </Div>
        )} 
        <ContainerBorderBottom $height='2.5rem' $display='flex'  $gap='.5rem' >
                  <ButtonStyle  $active={active === 'Threads' ? true : false} onClick={()=>setActive('Threads')}   >Threads</ButtonStyle> 
                  <ButtonStyle   $active={active === 'Replies' ? true : false} onClick={()=>setActive('Replies')}  >Replies</ButtonStyle> 
        </ContainerBorderBottom>
     


    </Section>
  )
}   

export default UserHeader