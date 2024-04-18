import React from 'react'
import { Button6, Div } from '../Global/GlobalStyle'
import { FaPlus } from "react-icons/fa6";





const CreatePost = ({setShowModal}) => {

  return (
        <Div $position='absolute' $bottom='0rem' $right='0' $padding='0 0 2rem 0' >
            <Button6 $border='none' $padding='.7rem 2rem' onClick={()=>{
                setShowModal(true)
            }} >
                 <FaPlus />
            </Button6>
        </Div>
  )
}

export default CreatePost;