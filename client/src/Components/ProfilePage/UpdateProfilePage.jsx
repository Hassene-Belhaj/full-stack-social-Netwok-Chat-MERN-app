import React, { useEffect, useRef } from 'react'
import { ButtonTheme1,ButtonTheme2 , Container, Div, DivMenu, Image, Title3, dark } from '../Global/GlobalStyle'
import { styled } from 'styled-components'
import { LuUser2 } from 'react-icons/lu'
import { MdOutlineEmail } from 'react-icons/md'
import { IoKeyOutline } from 'react-icons/io5'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'



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
const IconIoIosInformationCircleOutline = styled(IoIosInformationCircleOutline)`
position: absolute;
top: 50%;
transform: translateY(-50%);
left : 1.5rem ;
color: gray;
cursor: pointer;
`
const Form = styled.form`
padding-top: 3rem;
display: flex;
flex-direction: column;
align-items: start;
margin: auto;
gap: 2rem;
background-color: ${({theme})=>theme};
`
const Input = styled.input`
padding-left: 3.5rem;
width: 100%;
height: 3rem;
background-color: ${({theme})=>theme.background === dark.background ? "#101010" : "#f1f5f9"};
color: ${({theme})=>theme};
outline: none;
border: 3px solid rgba(0,0,0,0);
border-radius: 10px;
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


const UpdateProfilePage = () => {

    
    


    const [toggle,setToggle] = useState(false)
    const [preview,setPreview] = useState(null)
    const inputRef =  useRef(null)

    const ImageHandler = (e) => {
        let File  = e.target.files[0]
        if(File.type.startsWith('image')) {
           const reader = new FileReader() ;
           reader.onloadend = () => {
            setPreview(reader.result)
            toast.success('image added successfully')
           }
        reader.readAsDataURL(e.target.files[0])    
        } else {
            toast.error('invalid file type')
            inputRef.current.value=''
        }
     }


     const handleUpdateUser = async(e) => {
        e.preventDefault();
        const  Data = new FormData(e.target)
        let form_data = {}
        form_data = Object.fromEntries(Data.entries())
        const {name , username ,email, bio } = form_data
        try {
            const data = await axios.put('/user/update/6608f6926a320f7c10d73ca2' , {
                name ,
                username,
                email,
                bio,
                profilePic : preview 
            })
            if(data.status === 200) {
                const {data : {info}} = data
                localStorage.setItem("info",JSON.stringify(info))
                toast.success('user profile updated successfully')
                return ;
            }
        } catch (error) {
            console.log(error)
        }
     }
 
  return (
    <Container $maxWidth='620px' $height='100%' $display='flex' $jc='center' $ai='center' $margin='auto' $paddingTop='2rem' $paddingBottom='4rem'>
        <DivMenu $padding='2rem' $width='500px' >
            <Title3 $marginBottom='2rem'>User Profile Edit</Title3>
            <Div $display='flex' $jc='center' $ai='center'  $gap='1rem'>
                <Div $flex='1'>
                    <Image  $width='8rem' $height='8rem' src={preview || '/user.jpg'} $objectfit='cover' $br='50%' />
                </Div>

                <Div $flex='3'  >
                    <ButtonTheme2 onClick={(e)=>inputRef.current.click()} $switch $width='100%' $height='3rem'> Change Avatar</ButtonTheme2>
                    <Input onChange={ImageHandler} ref={inputRef} type='file' hidden />
                    </Div>
            </Div>

            <Form onSubmit={handleUpdateUser}>
                    <Div $width='100%' $position='relative'>
                           <Input name='name' placeholder='Name'  autoComplete='off'/>
                           <IconLuUser2 />
                    </Div> 

                    <Div $width='100%' $position='relative'>
                          <Input name='username' placeholder='Username'  autoComplete='off' />
                          <IconLuUser2 />
                    </Div> 

                    <Div $width='100%' $position='relative'>
                         <Input name='email' placeholder='Email'  autoComplete='off'/>
                         <IconOutlineEmail/>
                    </Div> 

                    <Div $width='100%' $position='relative'>
                         <Input name='bio' placeholder='Bio'  autoComplete='off'/>
                         <IconIoIosInformationCircleOutline />
                    </Div> 

                    <Div $width='100%' $position='relative' >
                        <Input name='password' autoComplete='off' placeholder='Password' type={toggle ? 'text' : 'password'}/>
                        <IconIoKeyOutline />
                        {!toggle ? <IconFaEye onClick={()=>setToggle(!toggle)} /> : <IconFaEyeSlash onClick={()=>setToggle(!toggle)}/>}
                    </Div>


                    <Div $display='flex' $width='100%' $gap='1rem'>
                        <ButtonTheme2 type='reset' $flex='1'>Cancel</ButtonTheme2> 
                        <ButtonTheme1 type='submit' $flex='1' $switch >Submit</ButtonTheme1>
                    </Div>
            </Form>

        </DivMenu>
    </Container>
  )
}

export default UpdateProfilePage