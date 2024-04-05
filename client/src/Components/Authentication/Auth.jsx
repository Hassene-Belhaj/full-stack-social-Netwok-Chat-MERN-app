import React, { useEffect, useState } from 'react'
import { Button2,Div,Navlink,Text,Title2 } from '../Global/GlobalStyle'
import styled from 'styled-components'
import { MdOutlineEmail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import toast from 'react-hot-toast';


const Container = styled.div`
position: relative;
background-image: url('/auth.png');
background-position: top;
background-repeat: no-repeat;
height: 100vh;
`

const Wrapper = styled.div`
width: 400px;
padding:1rem;
margin: auto;
position: absolute;
top: 16rem;
left: 50%;
transform: translateX(-50%);

`

const IconLuUser2 = styled(LuUser2)`
position: absolute;
top: 50%;
transform: translateY(-50%);
left : 1.5rem ;
color: gray;
`
const IconOutlineEmail = styled(MdOutlineEmail)`
position: absolute;
top: 50%;
transform: translateY(-50%);
left : 1.5rem ;
color: gray;
`
const IconIoKeyOutline = styled(IoKeyOutline)`
position: absolute;
top: 50%;
transform: translateY(-50%);
left : 1.5rem ;
color: gray;
`
const IconFaEye = styled(FaEye)`
position: absolute;
top: 50%;
transform: translateY(-50%);
right : 1.5rem ;
color: gray;
cursor: pointer;
`
const IconFaEyeSlash = styled(FaEyeSlash)`
position: absolute;
top: 50%;
transform: translateY(-50%);
right : 1.5rem ;
color: gray;
cursor: pointer;
`
const Form = styled.form`
padding-top: 3rem;
display: flex;
flex-direction: column;
align-items: center;
margin: auto;
gap: 2rem;
background-color: ${({theme})=>theme};
`
const Input = styled.input`
padding-left: 3.5rem;
width: 100%;
height: 3rem;
background-color: ${({theme})=>theme.background ==='#101010' ? "#181818" : "#f1f5f9"};
color: ${({theme})=>theme};
outline: none;
border: 3px solid rgba(0,0,0,0);
border-radius: 25px;
&:focus {
 transition: ease-in-out 0.4s;
 border: 3px solid #8b5cf6;
}
&::placeholder{
    font-size: 1rem;
    font-weight: 500;
    color: gray;

}
`


const Auth = ({type}) => {

    const [toggle,setToggle] = useState(false)

    const inputRef =  useRef()
    const location = useLocation()
    const navigate = useNavigate()
    
   const auth = async(serverRoute,formData) => {
     if(serverRoute === 'signup') {
        try {
            const data  = await axios.post('/user/signup' , formData)
            if(data.status === 201) {
              toast.success('sign up successfully')
              setTimeout(() => { 
                (navigate('/signin')) 
              }, 1000)
               
              }
        } catch (error) {
          if(error) return toast.error(error?.response.data.msg)

}
} else {
    try {
        const data = await axios.post('/user/signin' , formData)
        console.log(data.data.info)
        console.log(data.status)
        if(data?.status === 200) {
             const {data : {info}} = data
             localStorage.setItem("info",JSON.stringify(info))
             toast.success('sign in successfully')
             setTimeout(() => { 
              (navigate('/@zack/post/sssss'))
            }, 1000)
            return ;
        } 
        } catch (error) {
            if(error) return toast.error(error?.response.data.msg)
        }
     }
   } 

  const handleSubmitFormAuth = (e) => {
    e.preventDefault()
    let serverRoute = type === 'signup' ? 'signup' : 'signin' ;
    const newformdata = new FormData(e.target)
    let formData = {} 
    formData = Object.fromEntries(newformdata.entries())
    const {name , username , email , password} = formData ;
    console.log(username ,  password)
    auth(serverRoute,formData)
  }

  useEffect(()=>{
    inputRef.current.value = ''
    },[location])


  return (
    <Container>
      <Wrapper>
       <Title2 $fs='1.5rem' $fw='400' $ta='center' >
        {type === 'signin' ? 'Login' : 'Register'}
       </Title2>
      <Form onSubmit={handleSubmitFormAuth} >
        {type === 'signup' && (
          <Div $width='100%'  $position='relative'>
          <Input name='name' autoComplete='off' placeholder='Name'/>
          <IconLuUser2  />
        </Div >
        )}
        <Div $width='100%' $position='relative' >
          <Input name='username' autoComplete='off' placeholder='Username' />
          <IconLuUser2  />
        </Div>
         {type === 'signup' && (
           <Div $width='100%' $position='relative' >
          <Input name='email' autoComplete='off' placeholder='Email' /> 
          <IconOutlineEmail/>
        </Div>
         )}
       
        <Div $width='100%' $position='relative' >
          <Input ref={inputRef} name='password' autoComplete='off' placeholder='Password' type={toggle ? 'text' : 'password'}/>
          <IconIoKeyOutline />
          {!toggle ? <IconFaEye onClick={()=>setToggle(!toggle)} /> : <IconFaEyeSlash onClick={()=>setToggle(!toggle)}/>}
          
        </Div>

        <Button2 type='submit' $margin='1rem 0 2rem 0' $width='100%' $height='3rem'>Login</Button2>
      
     </Form> 
       <Div $ta='center'>
                {type === 'signup' ? 
                <Text $paddingTop='.5rem'>
                    Already a Member ?
                    <Navlink $paddingLeft='1rem' $fw='500' to='/signin'>
                        Sign in
                    </Navlink>
                </Text> 
                :
                <Text $paddingTop='.5rem'>
                    Dont't have an Account yet ?
                <Navlink $paddingLeft='1rem' $fw='500' to='/signup'>
                    Sign up
                </Navlink>
            </Text> 
                } 
      </Div>
       
    </Wrapper>
    </Container>
  )
}

export default Auth