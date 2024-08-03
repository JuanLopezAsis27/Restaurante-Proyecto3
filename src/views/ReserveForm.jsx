import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useReserves } from '../context/ReserveContext';
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'

const ReserveForm = () => {
  const horas = ['13:00', '14:00', '15:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  const cantidadPersonas = [4, 5, 6, 7, 8];
  const { register, handleSubmit, setValue, reset } = useForm();
  const { crearReserva, readOneReserve, actualizarReserva } = useReserves()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function loadReserve() {
      if (params.id) {
        console.log(params);
        const reserve = await readOneReserve(params.id)
        console.log(reserve);
        setValue('dia', reserve.data.dia);
        setValue('hora', reserve.data.hora);
        setValue('telefono', reserve.data.telefono);
        setValue('cantidadPersonas', reserve.data.cantidadPersonas);

      }
    }
    loadReserve()
  }, [])



  const onSubmit = handleSubmit((data) => {
    Swal.fire({
      title: "Estas seguro que quieres confirmar esta reserva?",
      showDenyButton: true,
      confirmButtonColor: "#63cb4c",
      confirmButtonText: "Confirmar Reserva",
      denyButtonText: `Cancelar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Reserva realizada!", "", "success");
        console.log(data);
        if (params.id) {
          actualizarReserva(params.id, data)
        } else {
          crearReserva(data)
        }
        navigate('/reserves')
      } 
    })


  })

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <form onSubmit={onSubmit}>
          <input type="date" placeholder='Dia' min={`${new Date().toISOString().slice(0, 10)}`} max="2024-09-01" {...register('dia', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          <select name='hora' {...register('hora', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
            {horas.map((hora) => {
              return <option key={hora} value={hora}>{hora}</option>
            })}
          </select>
          <input type="number" placeholder='Telefono' {...register('telefono', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          <select name='cantidadPersonas' {...register('cantidadPersonas', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
            {cantidadPersonas.map((cant) => {
              return <option key={`cp${cant}`} value={cant}>{cant}</option>
            })}
          </select>
          <button className='bg-orange-700 px-4 py-1 rounded-md mt-3'>
            Realizar Reserva
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReserveForm