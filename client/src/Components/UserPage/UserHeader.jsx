import React from 'react'
import { ButtonScaleEffect,ButtonTheme1,ButtonUserHeaderSection,Container, ContainerBorderBottom, Div, DivMenu, FlexContainer, Image, Section, Span, Text, Title2, Title4 } from '../Global/GlobalStyle'
import { FaInstagram } from 'react-icons/fa'
import { PiDotsThreeCircle } from "react-icons/pi";
import toast from 'react-hot-toast';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'





const UserHeader = ({user,authentication}) => {

    const [menuList , setMenuList] = useState(false)
    const [active , setActive] = useState('Threads')
    
    // console.log(active)

    const [follow , setFollow] = useState(!user?.followers?.includes(authentication?.id))
    const [followersNbr , _setFollowersNbr] = useState([...user.followers])
    const navigate = useNavigate()


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
               followersNbr.pop()  ;
               return ; 
            } else {
               followersNbr.push(authentication?.id)  ;
               return;
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
                <FlexContainer  $width='100%' $display='flex' $jc='space-between'  $padding='4rem 0 0 0' >
                        <Div $display='flex' $fd='column' $flex='1'>
                        <Title2 $fw='500'>{user?.name}</Title2>
                            <Div $display='flex' $ai='center' $padding='4px 0' $gap='1rem'>
                                <Text>{user?.username}</Text>
                                {/* <Button1 $border='none' $padding='4px 12px' $br='25px'>threads.net</Button1> */}
                            </Div>
                        </Div>
                        <Div $flex='1' $display='flex' $jc='end'>
                            <Image $width='5rem' $height='5rem' $br='50%' src={user.profilePic || 'user.jpg'}  $objectfit='cover' />
                        </Div>
                </FlexContainer>
                
                <Container $display='flex' $fd='column' $padding='1rem 0' $gap='1rem' >

                            <Text >{user?.bio}</Text>

                    <FlexContainer $display='flex' $jc='space-between' $ai='center'> 
                        <Div>
                                <Text $color='gray'>{followersNbr.length} followers &#x2022; instagram.com</Text>
                        </Div> 

                        <Div $display='flex' $ai='center' $jc='center' $gap='1rem' $position='relative'>

                            <ButtonScaleEffect  $padding='4px' $br='50%' $border='none' $display='flex' $jc='center' $ai='center' > <FaInstagram size={30} /> </ButtonScaleEffect> 
        
                            <ButtonScaleEffect  onBlur={handleBlurMenu} onClick={()=>setMenuList(!menuList)}  $padding='4px' $br='50%' $border='none' $display='flex' $jc='center' $ai='center' > <PiDotsThreeCircle size={30} /></ButtonScaleEffect> 

                            
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
                        <ButtonUserHeaderSection  $active={active === 'Threads' ? true : false} onClick={()=>setActive('Threads')}   >Threads</ButtonUserHeaderSection> 
                        <ButtonUserHeaderSection   $active={active === 'Replies' ? true : false} onClick={()=>setActive('Replies')}  >Replies</ButtonUserHeaderSection> 
                </ContainerBorderBottom>
    </Section>
  )
}   

export default UserHeader