import React from 'react'

const AboutUs = () => {
  return (
    <div className='flex items-center  my-36 px-20'>
      <div className='bg-zinc-800 w-full rounded-md min-w-md p-10'>
        <h1 className='text-8xl mb-10 text-center'><b>¿Quienes Somos?</b></h1>
        <h3 className='text-2xl px-40'>Somos un restaurante el cual permite reservar mesas a traves de esta pagina. 
          Para ello solo debes registrarte y colocar El dia y la hora en la cual quieres realizar dicha reserva</h3>
        <h2 className='text-5xl px-40 py-12'><b>Pagina realizada por:</b></h2> 
        <p className='px-40 text-xl'><b>-Lopez Asis Juan Manuel: 21 años, estudiante de ingenieria en sistemas de informacion en UTN    </b></p> 
      </div>
    </div>
  )
}

export default AboutUs