import React from 'react'
import { ButtonTheme1,ButtonTheme2 , Div, DivMenu, Image, Title3, dark } from '../Global/GlobalStyle'
import { styled } from 'styled-components'
import { LuUser2 } from 'react-icons/lu'
import { MdOutlineEmail } from 'react-icons/md'
import { IoKeyOutline } from 'react-icons/io5'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useState } from 'react'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import Spinner from '../../utils/Spinner'
import axios from 'axios'
import Spinner2 from '../../utils/Spinner2'


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

const UpdateProfilePageItem = ({userProfile}) => {

    const [loadingData , setLoadingData] = useState(false)
    const [toggle,setToggle] = useState(false)
    const [preview,setPreview] = useState(null)
    const [userInfo , setUserInfo] = useState(userProfile)  
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
        toast.dismiss()
        e.preventDefault();
        try {
            setLoadingData(true)
            const data = await axios.put(`/user/update/${userInfo._id}` , {
                name : userInfo.name ,
                username :  userInfo.username,
                email :  userInfo.email,
                bio  :   userInfo.bio,
                profilePic : preview 
            })
            if(data.status === 200) {
                const {data : {info}} = data
                // localStorage.setItem("info",JSON.stringify(info))
                toast.success('user profile updated successfully')
                setLoadingData(false)
            }
        } catch (error) {
            console.log(error)
        }
     }


  return (
    <DivMenu $padding='2rem' $width='500px' >
    <Title3 $margin='0 0 2rem 0' $ta='center'>User Profile Edit</Title3>
    <Div $display='flex' $jc='center' $ai='center'  $gap='1rem'>
        <Div $flex='1'>
            <Image  $width='8rem' $height='8rem' src={preview || userInfo.profilePic} $objectfit='cover' $br='50%' />
        </Div>

        <Div $flex='3'  >
            <ButtonTheme2 onClick={(e)=>inputRef.current.click()} $switch $width='100%' $height='3rem'> Change Avatar</ButtonTheme2>
            <Input onChange={ImageHandler} ref={inputRef} type='file' hidden />
            </Div>
    </Div>

    <Form onSubmit={handleUpdateUser}>
            <Div $width='100%'  $position='relative'>
                   <Input value={userInfo.name} onChange={e=>setUserInfo({...userInfo , name : e.target.value})} name='name' placeholder='Name'  autoComplete='off'/>
                   <IconLuUser2  size='20'/>
            </Div> 

            <Div $width='100%' $position='relative'>
                  <Input value={userInfo.username} onChange={e=>setUserInfo({...userInfo , username : e.target.value})} name='username' placeholder='Username'  autoComplete='off' />
                  <IconLuUser2  size='20'/>
            </Div> 

            <Div $width='100%' $position='relative'>
                 <Input disabled value={userInfo.email} onChange={e=>setUserInfo({...userInfo , email : e.target.value})} name='email' placeholder='Email'  autoComplete='off'/>
                 <IconOutlineEmail size='20'/>
            </Div> 

            <Div $width='100%' $position='relative'>
                 <Input value={userInfo.bio} onChange={e=>setUserInfo({...userInfo , bio : e.target.value})} name='bio' placeholder='Bio'  autoComplete='off'/>
                 <IconIoIosInformationCircleOutline size='20' />
            </Div> 

            <Div $width='100%' $position='relative' >
                <Input name='password' onChange={e=>setUserInfo({...userInfo , password : e.target.value})} autoComplete='off' placeholder='Password' type={toggle ? 'text' : 'password'}/>
                <IconIoKeyOutline size='20' />
                {!toggle ? <IconFaEye onClick={()=>setToggle(!toggle)} /> : <IconFaEyeSlash onClick={()=>setToggle(!toggle)}/>}
            </Div>


            <Div $display='flex' $width='100%' $gap='1rem'>
                <ButtonTheme2 type='reset' $flex='1' >Close</ButtonTheme2>
                <ButtonTheme1 type='submit' $flex='1'>{loadingData ? <Spinner2 width={'1.5rem'} height={'1.5rem'}/> : 'Submit'}</ButtonTheme1> 
            </Div>
    </Form>

</DivMenu>
  )
}

export default UpdateProfilePageItem