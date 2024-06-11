import React from 'react'

const Loader = ({color}) => {
  return (
   
      <div className={`px-auto w-6 h-6 border-4 border-t-transparent border-${color} rounded-full animate-spin`}></div>
      
  )
}

export default Loader;
