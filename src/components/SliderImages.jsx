import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const SliderImages = () => {
    return (
        <Carousel autoPlay showArrows={false} infiniteLoop showStatus={false} className='min-w-full'>
            <div>
                <img className='h-12 opacity-65' src="https://hips.hearstapps.com/hmg-prod/images/restaurantes-moda-madrid-ceferino-65aa5b0e3160a.jpeg" />
            </div>
            <div>
                <img className='h-12 opacity-35' src="https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2023/04/03/mesa-llena-de-comida-arabe.jpeg" />
            </div>
            <div>
                <img className='h-12 opacity-55' src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2021/08/07/16283202517103.jpg" />
            </div>
        </Carousel>
  )
}

export default SliderImages