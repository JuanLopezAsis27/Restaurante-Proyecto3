import React from 'react'

const Contact = () => {
  return (
    <div className='my-28 mx-10 '>
      <section className="md:flex mt-5 mb-5 justify-center">
      <div className="p-4 md:w-3/6">
        <form className="text-white">
          <div className="flex flex-col mb-3">
            <label htmlFor="nombre"><b>Nombre</b></label>
            <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="text" name="nombre" id="nombre" placeholder="Nombre y Apellido" />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="correo"><b>Correo</b></label>
            <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="email" name="correo" id="correo"
              placeholder="Correo Electronico" />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="telefono"><b>Teléfono</b></label>
            <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="tel" name="telefono" id="telefono"
              placeholder="Número de Teléfono" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="mensaje"><b>Mensaje</b></label>
            <textarea className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" name="mensaje" id="mensaje" cols="30" rows="6"
              placeholder="Escribe tu mensaje aquí"></textarea>
            <input type="submit" className='bg-orange-400 text-black px-4 py-1 rounded-md my-2' value="Enviar" />
          </div>
        </form>
      </div>
      <div  className="flex flex-col justify-center items-center p-6 md:w-5/12 mt-6 ">
        <iframe className='rounded-xl h-96 md:min-h-full'
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14243.97386517194!2d-65.28107813612048!3d-26.80833666860651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d21d44f2a2d%3A0xf6c3c38b90eb2370!2sMi%20Nueva%20Estancia!5e0!3m2!1ses-419!2sar!4v1723606563700!5m2!1ses-419!2sar"
          width="100%" height="100%" allowFullScreen="" loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">
          </iframe>
      </div>
    </section>
    </div>
  )
}

export default Contact