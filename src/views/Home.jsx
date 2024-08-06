import React, { Component, useEffect } from 'react';
import SliderImages from '../components/SliderImages';


const Home = () => {


  return (
    <div >
      <div className='mb-10 text-center'>
        <h1 className='block absolute w-full text-center z-40 mt-64 text-7xl  md:text-8xl text-slate-50 h1-slider'>Bienvenido</h1>
        <p className='block absolute top-52 w-full text-center z-40 mt-36 text-3xl md:text-5xl text-slate-100 p-slider'>Ofrecemos los mejores platos al mejor precio </p>
        <SliderImages />

      </div>

    </div>
  )
}

export default Home