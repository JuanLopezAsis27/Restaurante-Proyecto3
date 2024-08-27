import React from 'react'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

const Contact = () => {

  const validateLettersAndSpaces = (value) => {
    // Verifica que el valor solo contenga letras y espacios
    return /^[A-Za-z\s]*$/.test(value) || 'No se permiten letras o caracteres especiales';
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = handleSubmit((data) => {
    Swal.fire({
      title: "Mensaje enviado con exito!", icon: "success", background: '#393939',
      color: '#fafafa'
    });
    reset()
  })

  return (
    <div className='my-28 mx-10 '>
      <section className="md:flex mt-5 mb-5 justify-center">
        <div className="p-4 md:w-3/6">
          <form className="text-white" onSubmit={onSubmit}>
            <div className="flex flex-col mb-3">
              <label htmlFor="nombre"><b>Nombre</b></label>
              <input {...register('nombre',{
                required:"El nombre es requerido",
                validate:validateLettersAndSpaces,
              })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="text" name="nombre" id="nombre" placeholder="Nombre y Apellido" />
              <p className='text-red-500'>{errors.nombre?.message}</p>
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="correo"><b>Correo</b></label>
              <input type="email" name="email" id="correo"
                {...register('email', {
                  required: 'El email es requerido',
                  maxLength: { value: 100, message: 'No debe tener mas de 100 caracteres' }
                })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Correo Electronico" />
              <p className='text-red-500'>{errors.email?.message}</p>
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="telefono"><b>Teléfono</b></label>
              <input {...register('telefono', {
                required: 'El telefono es requerido',
                minLength: { value: 7, message: 'El telefono debe tener como minimo 7 caracteres' },
                maxLength: { value: 12, message: 'Numero no valido' },
                min: { value: 0, message: "Numero no valido" }
              })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="number" name="telefono" id="telefono" step='1'
                placeholder="Número de Teléfono" />
              <p className='text-red-500'>{errors.telefono?.message}</p>

            </div>

            <div className="flex flex-col">
              <label htmlFor="mensaje"><b>Mensaje</b></label>
              <textarea {...register('mensaje', {
                required: 'El mensaje es requerido',
                maxLength: { value: 550, message: 'No debe tener mas de 550 caracteres' }
              })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" name="mensaje" id="mensaje" cols="30" rows="6"
                placeholder="Escribe tu mensaje aquí" />
              <p className='text-red-500 mb-4'>{errors.mensaje?.message}</p>

              <input type="submit" className='bg-orange-400 text-black px-4 py-1 rounded-md my-2' value="Enviar" />
            </div>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center p-6 md:w-5/12 mt-6 ">
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