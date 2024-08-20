import React, { useEffect } from 'react'

const ErrorScreen = () => {
    
  return (
    <div className='flex items-center justify-center my-36'>
      <div className='bg-zinc-800 max-w-xl w-full p-10 rounded-md min-w-md text-center'>
        <h1 className='text-8xl mb-5'><b>Error 404</b></h1>
        <h3 className='text-2xl'>Lo sentimos, la página que estás buscando no se pudo encontrar.</h3>
      </div>
    </div>
  )
}

export default ErrorScreen