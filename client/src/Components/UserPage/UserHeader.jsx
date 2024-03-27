import React, { useState } from 'react'
import { Button, Button1, Button2, Container, Div, DivMenu, FlexContainer, Image, Section, Span, Text, Title2, Title3, Title4 } from '../Global/GlobalStyle'
import { FaInstagram } from 'react-icons/fa'
import { PiDotsThreeCircle } from "react-icons/pi";
import styled from 'styled-components';
import toast from 'react-hot-toast';





const UserHeader = () => {
    const [menuList , setMenuList] = useState(false)

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
         }, 500)
    }
  return (
    <Section>
        <FlexContainer  $width='100%' $display='flex' $jc='space-between' $padding='4rem 0 0 0'>
            <Div $display='flex' $fd='column' $flex='1'>
            <Title2 $fw='500'>Mark Zuckerberg</Title2>
                <Div $display='flex' $ai='center' $padding='4px 0' $gap='1rem'>
                    <Text>zuck</Text>
                    <Button  $border='none' $padding='4px 12px' $br='25px'>threads.net</Button>
                </Div>
            </Div>
            <Div $flex='1' $display='flex' $jc='end'>
                <Image $width='7rem' $height='7rem' $br='50%' src='zuck-avatar.png'/>
            </Div>
        </FlexContainer>
        
        <Container $display='flex' $fd='column' $padding='2rem 0' $gap='1rem' >

                    <Text >Co-founder, executive chairman and CEO of Meta Platforms .</Text>

            <FlexContainer $display='flex' $jc='space-between' $ai='center'> 
                <Div>
                        <Text $color='gray'>3.2K followers &#x2022; instagram.com</Text>
                </Div> 

                <Div $display='flex' $ai='center' $jc='center' $gap='1rem' $position='relative'>


                      
                    <Button1 $padding='4px' $br='50%' $border='none' $display='flex' $jc='center' $ai='center' > <FaInstagram size={25} /> </Button1> 
                    <Button1 onBlur={handleBlurMenu} onClick={()=>setMenuList(!menuList)}  $padding='4px' $br='50%' $border='none' $display='flex' $jc='center' $ai='center' > <PiDotsThreeCircle size={25} /></Button1> 
                    
            {menuList && (
                <DivMenu $position='absolute' $bottom='-.5rem' $transform='translateY(100%)'  $right='0rem' $padding='1rem' $width='15rem' $br='15px' $display='flex' $fd='column' $jc='center' $ai='center' $ta='center'>
                    <Span $height='3rem'>
                      <Title4 $ta='center'  $cursor='pointer' onClick={get_url} $bg='transparent'  $width='100%' $fw='600'>Copy link</Title4>
                    </Span>
                    {/* <Span $height='3rem'>
                      <Title4 $ta='center'  $cursor='pointer' onClick={get_url} $bg='transparent' $border='none' $outline='none'  $width='100%' $fw='600'>Copy link</Title4>
                    </Span> */}
                </DivMenu>
            )}
                </Div>
            </FlexContainer>   
        </Container>
        <Button2 $padding='1rem 4rem'>test</Button2>

    </Section>
  )
}   

export default UserHeader