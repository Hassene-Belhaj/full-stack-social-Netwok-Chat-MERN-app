import React, { useEffect }  from 'react'
import Navigation from './Components/Navigation/Navigation'
import { Toaster } from 'react-hot-toast'
import {Container, GlobalStyleCss } from './Components/Global/GlobalStyle'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import  {useDispatch} from 'react-redux' 
import { toast } from 'react-hot-toast'
import { verifyAuthAction } from './redux/actions/actions'
import PostModal from './Components/Post/PostModal'
import { dark, light } from './utils/ThemeColors'
import ConfirmModal from './Components/ConfirmModal/ConfirmModal'




const App = () => {
  const dispatch = useDispatch() 
  const [showModal , setShowModal] = useState(false)
  const [confirmModal , setConfirmModal] = useState(false)



  
  const [theme , setTheme] = useState(undefined)
  let Get_theme = localStorage.getItem('theme')
  useEffect(()=>{
  setTheme(Get_theme ? Get_theme : theme)
  },[])


  axios.defaults.baseURL = 'http://localhost:5000/api'
  axios.defaults.withCredentials = 'true'

  const {pathname} = useLocation()



   
useEffect(() => {
  toast.dismiss()
  dispatch(verifyAuthAction())
}, [pathname]);



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
          <Container $margin='auto' $position='relative' > 
          {!pathname.includes('sign') ? 
            <Navbar theme={theme} setTheme={setTheme} setShowModal={setShowModal} showModal={showModal}  />
            :
            null
          }
              <Navigation showModal={showModal} confirmModal={confirmModal} setConfirmModal={setConfirmModal} theme={theme} setTheme={setTheme}/>

              {showModal && (
                 <PostModal showModal={showModal} setShowModal={setShowModal} />
              )}
    
          </Container>
      </ThemeProvider>
  )
}


export default App