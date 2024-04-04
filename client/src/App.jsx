import React, { useEffect }  from 'react'
import Navigation from './Components/Navigation/Navigation'
import toast, { Toaster } from 'react-hot-toast'
import { Container } from './Components/Global/GlobalStyle'
import axios from 'axios'
import { useLocation } from 'react-router-dom'




const App = () => {

  axios.defaults.baseURL = 'http://localhost:5000/api'
  axios.defaults.withCredentials = 'true'
  const location = useLocation()

  useEffect(() => {
    // document.body.style.zoom = "80%";
    toast.dismiss()
  }, [location]);


  return (
    <>
     <Toaster
      reverseOrder='true'
      toastOptions={{
        duration : 2000,
        style : {
          background : '#d1fae5',
          padding:'1rem 2rem',
          marginTop : '2rem',
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
     <Container $width='100%'>
       <Navigation/>

     </Container>
    </>
  )
}

export default App