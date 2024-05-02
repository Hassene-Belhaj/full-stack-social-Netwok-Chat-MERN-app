import React from 'react'

const IconSvg = ({height,width,color}) => {
  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill={color}
        width={width} 
        height={height}>
        <path d={Path} />
    </svg>

  )
}

export default IconSvg

const Path  = "M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
