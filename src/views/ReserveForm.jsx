import React from 'react'
import { useForm } from "react-hook-form";
import { useReserves } from '../context/ReserveContext';

const ReserveForm = () => {
  const horas = ['13:00', '14:00', '15:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  const cantidadPersonas = [4, 5, 6, 7, 8];
  const { register, handleSubmit } = useForm();
  const { crearReserva } = useReserves()

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    crearReserva(data)
  })
  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <form onSubmit={onSubmit}>
          <input type="date" placeholder='Dia' {...register('dia')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          <select name='hora' {...register('hora')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
            {horas.map((hora) => {
              return <option key={hora} value={hora}>{hora}</option>
            })}
          </select>
          <input type="number" placeholder='Telefono' {...register('telefono')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          <select name='cantidadPersonas' {...register('cantPersonas')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
            {cantidadPersonas.map((cant) => {
              return <option key={`cp${cant}`} value={cant}>{cant}</option>
            })}
          </select>
          <button>
            Realizar Reserva
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReserveForm