import React, { useEffect }  from 'react'
import Navigation from './Components/Navigation/Navigation'
import toast, { Toaster } from 'react-hot-toast'




const App = () => {




  return (
    <>
     <Toaster
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
      <Navigation/>
    </>
  )
}

export default App