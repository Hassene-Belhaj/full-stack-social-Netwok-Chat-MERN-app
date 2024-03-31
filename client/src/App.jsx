import React, { useEffect }  from 'react'
import Navigation from './Components/Navigation/Navigation'
import toast, { Toaster } from 'react-hot-toast'
import { Container } from './Components/Global/GlobalStyle'




const App = () => {

  // useEffect(() => {
  //   document.body.style.zoom = "80%";
  // }, []);


  return (
    <>
     <Toaster
      reverseOrder='true'
      toastOptions={{
        duration : 2000,
        style : {
          background : '#d1fae5',
          padding:'1rem'
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
     <Container $width='100vw'>
       <Navigation/>

     </Container>
    </>
  )
}

export default App