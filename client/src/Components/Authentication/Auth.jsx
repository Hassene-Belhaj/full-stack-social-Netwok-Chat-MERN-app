import React, { useEffect, useState } from 'react'
import { ButtonAuth,Container,Div,FlexContainer,Form,InputAuth,Navlink,Text,Title2 } from '../Global/GlobalStyle'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../utils/Spinner';
import { IconFaEye, IconFaEyeSlash, IconFaRegUserCircle, IconIoKeyOutline, IconLuUser2, IconOutlineEmail } from '../Global/Icons';
import Spinner2 from '../../utils/Spinner2';



const Auth = ({type}) => {

    const [toggle,setToggle] = useState(false)
    const [loading,setLoading] = useState(false)

    const inputRef =  useRef()
    const {pathname} = useLocation()
    const navigate = useNavigate()


   const auth = async(serverRoute,formData) => {
     if(serverRoute === 'signup') {
        try {
            setLoading(true)
            const {data}  = await axios.post('/user/signup' , formData)
            if(data.success) {
              toast.success('sign up successfully')
              setTimeout(() => { 
                (navigate('/signin')) 
              }, 1000)
              setLoading(false)
              }
        } catch (error) {
            setLoading(false)
            return toast.error(error?.response.data.msg)
        }
    } else {
        try {
            const {data} = await axios.post('/user/signin' , formData)
            if(data.success) {
                toast.success('sign in successfully')
                setTimeout(() => { 
                  (navigate('/'))
                }, 1000)
                return ;
            } 
            } catch (error) {
                return toast.error(error?.response.data.msg)
            }
        }
   } 

  const handleSubmitFormAuth = (e) => {
    e.preventDefault()
    let serverRoute = type === 'signup' ? 'signup' : 'signin' ;
    const newformdata = new FormData(e.target)
    let formData = {} 
    formData = Object.fromEntries(newformdata.entries())
    auth(serverRoute,formData)
  }

  useEffect(()=>{
      inputRef.current.value = ''
    },[pathname])


    return (  
        <Container $backgroundImage={"url('/auth.png')"} $backgroundPosition='top' $padding='0 1rem 0 1rem'  $backgroundRepeat='no-repeat'  >
               <FlexContainer  $maxWidth='400px' $padding='15rem 0 0 0' $margin='auto' >
                           <Title2 $fs='1.5rem' $fw='400' $ta='center' >
                           {type === 'signin' ? 'Login' : 'Register'}
                         </Title2>
                        <Form $padding='4rem 0 0 0' $width='100%' $display='flex' $fd='column' $gap='2rem' $margin='auto' onSubmit={handleSubmitFormAuth} >
                          {type === 'signup' && (
                            <Div $width='100%'  $position='relative'>
                            <InputAuth name='name' autoComplete='off' placeholder='Name'/>
                            <IconFaRegUserCircle  />
                          </Div >
                          )}
                          <Div $width='100%' $position='relative' >
                            <InputAuth name='username' autoComplete='off' placeholder='Username' />
                            <IconLuUser2  />
                          </Div>
                          {type === 'signup' && (
                            <Div $width='100%' $position='relative' >
                            <InputAuth name='email' autoComplete='off' placeholder='Email' /> 
                            <IconOutlineEmail/>
                          </Div>
                          )}
                        
                          <Div $width='100%' $position='relative' >
                            <InputAuth ref={inputRef} name='password' autoComplete='off' placeholder='Password' type={toggle ? 'text' : 'password'}/>
                            <IconIoKeyOutline />
                            {!toggle ? <IconFaEye onClick={()=>setToggle(!toggle)} /> : <IconFaEyeSlash onClick={()=>setToggle(!toggle)}/>}
                            
                          </Div>

                          <ButtonAuth type='submit' $margin='1rem 0 2rem 0' $width='100%' $height='3rem'>
                                    {loading ? <Spinner2 Size={'8px'} />
                                      :
                                      <>
                                      {type === 'signin' ? 'Login' : 'Sign Up'}
                                      </> 
                                    }
                                
                            
                          </ButtonAuth>
                      </Form> 
                        <Div $ta='center'>
                                  {type === 'signup' ? 
                                  <Text $padding='.5rem 0 0 0'>
                                      Already a Member ?
                                      <Navlink $padding='0 0 0 1rem' $fw='500' to='/signin'>
                                          Sign in
                                      </Navlink>
                                  </Text> 
                                  :
                                  <Text $padding='.5rem 0 0 0'>
                                      Dont't have an Account yet ?
                                  <Navlink $padding='0 0 0 1rem' $fw='500' to='/signup'>
                                      Sign up
                                  </Navlink>
                              </Text> 
                                  } 
                        </Div>
            </FlexContainer>
    </Container>
  )
}

export default Auth