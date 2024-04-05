import React, { useEffect }  from 'react'
import Navigation from './Components/Navigation/Navigation'
import toast, { Toaster } from 'react-hot-toast'
import {Container, GlobalStyleCss } from './Components/Global/GlobalStyle'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import {useDispatch, useSelector} from 'react-redux'  
import { GetProfileAction } from './@reduxjs/actions/actions'



const App = () => {

  const [theme , setTheme] = useState(undefined)
  const [auth , setAuth] = useState(null)


  let Get_theme = localStorage.getItem('theme')

  useEffect(()=>{
  setTheme(Get_theme ? Get_theme : theme)
  },[])


  axios.defaults.baseURL = 'http://localhost:5000/api'
  axios.defaults.withCredentials = 'true'
  const location = useLocation()
  const dispatch = useDispatch() ;
  const {authentication} = useSelector(state=>state.auth)  
  
  // console.log(authentication)

  const dark = {
    background : "#101010",
    color : "#f3f5f7 "
}

const light = {
    background : "#fff",
    color : "#000"
}

  useEffect(() => {
    toast.dismiss()
    dispatch(GetProfileAction())
  }, [location]);




  return (
      <ThemeProvider theme={theme === 'dark' ? dark : light }>
        <GlobalStyleCss />
            <Toaster
              reverseOrder='true'
              toastOptions={{
                duration : 2000,
                style : {
                  background : '#d1fae5',
                  padding:'1rem 2rem',
                  fontWeight:'500',
                  textTransform : 'capitalize'
                } ,
                success: {
                  iconTheme: {
                    primary: 'black',
                    secondary: 'white',
                  },
                },
                error : {
                  iconTheme : {
                    primary : 'black',
                    secondary :'white',
                  },
                  
                }
              }}
              
              /> 
        <Container $width='100%' $padding='0 2rem'>
          <Navbar theme={theme} setTheme={setTheme} auth={auth} />
          <Navigation theme={theme} setTheme={setTheme}/>
        </Container>
      </ThemeProvider>
  )
}

export default App