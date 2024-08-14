import React, { Component, useEffect } from 'react';
import SliderImages from '../components/SliderImages';

const Home = () => {


  return (
    <div >
      <section className='mb-10 text-center'>
        <h1 className='block absolute w-full text-center z-40 mt-64 text-7xl md:text-8xl text-slate-50 h1-slider'>Bienvenido</h1>
        <p className='block absolute top-52 w-full text-center z-40 mt-36 text-3xl md:text-5xl text-slate-100 p-slider'>Ofrecemos los mejores platos al mejor precio </p>
        <SliderImages />

      </section>
      <section className='flex justify-around my-14'>
        <article className='bg-zinc-800 max-w-md w-full p-14 rounded-md min-w-md'>
          <img src="https://www.elrinconibiza.es/wp-content/uploads/go-x/u/7664a27e-a7f7-4891-b9eb-232ba34a82a4/l2,t0,w1611,h1079/image.jpg" alt="" />
          <h1 className='text-3xl h1-card text-center my-6'>Ambiente</h1>
          <p className='text-center'>Descubre un ambiente único y encantador en nuestro restaurante.
            Cada rincón te espera con una experiencia gastronómica inolvidable. ¡Ven y déjate sorprender!</p>
        </article>
        <article className='bg-zinc-800 max-w-md w-full p-14 rounded-md min-w-md'>
          <img src="https://www.elrinconibiza.es/wp-content/uploads/go-x/u/f9d6f4ab-7f31-42ed-95dd-395acda6c8e9/l0,t2,w1616,h1077/image.jpg" alt="" />
          <h1 className='text-3xl h1-card text-center my-6'>Gastronomia</h1>
          <p className='text-center'>Nuestro menú está cuidadosamente elaborado con ingredientes frescos
            y de alta calidad para ofrecerte una experiencia culinaria única en Ibiza.</p>
        </article>
        <article className='bg-zinc-800 max-w-md w-full p-14 rounded-md min-w-md'>
          <img src="https://www.elrinconibiza.es/wp-content/uploads/go-x/u/89c1d7fc-6d44-4d10-8a5f-3ebc98030de2/l30,t0,w1324,h882/image.jpg" alt="" />
          <h1 className='text-3xl h1-card text-center my-6'>Cocteles</h1>
          <p className='text-center'>Hemos diseñado cócteles únicos que complementan a la perfección la experiencia gastronómica que ofrecemos.
            Disfruta de una explosión de sabores y aromas en cada sorbo de nuestros exquisitos cocteles. </p>
        </article>
      </section>

    </div>
  )
}

export default Home