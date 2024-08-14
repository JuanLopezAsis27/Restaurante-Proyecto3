import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useReserves } from '../context/ReserveContext';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
import { useAuth } from '../context/AuthContext';

const ReserveForm = () => {
  const horas = ['13:00', '14:00', '15:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  const cantidadPersonas = [4, 5, 6, 7, 8];
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const { crearReserva, readOneReserve, actualizarReserva, reserves, reserveErrors, reloadedReserves } = useReserves()
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation();
  const params = useParams()
  let data;

  useEffect(() => {
    const path = window.location.pathname;
    if (path == "/add-reserves") {
      reset()
    }
  }, [location])



  useEffect(() => {
    async function loadReserve() {
      if (params.id) {
        const reserve = await readOneReserve(params.id)
        setValue('dia', reserve.data.dia);
        setValue('hora', reserve.data.hora);
        setValue('telefono', reserve.data.telefono);
        setValue('cantidadPersonas', reserve.data.cantidadPersonas);
      }
    }
    loadReserve()
  }, [])

  useEffect(() => {

    if (reloadedReserves || reserveErrors.length != 0) {
      Swal.fire({
        title: "¿Seguro que quieres confirmar esta reserva?",
        showDenyButton: true,
        confirmButtonColor: "#197600",
        denyButtonColor: "#a40000",
        confirmButtonText: "Confirmar Reserva",
        denyButtonText: `Cancelar`,
        background: '#393939',
        color: '#fafafa'
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          if (reserveErrors.length != 0) {
            console.log(reserveErrors);

            if (params.id) {
              if (reserveErrors[0] == 'No se han notado cambios en tu reserva') {
                Swal.fire({
                  icon: "warning",
                  title: `${reserveErrors.map((error, i) => error)}`,
                  background: '#393939',
                  color: '#fafafa'
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: `${reserveErrors.map((error, i) => error)}`,
                  text: "Intente con otro",
                  background: '#393939',
                  color: '#fafafa'
                });
              }

            } else {
              Swal.fire({
                icon: "error",
                title: `${reserveErrors.map((error, i) => error)}`,
                text: "Intente con otro",
                background: '#393939',
                color: '#fafafa'
              });
              reset()
            }

          } else {
            if (params.id) {
              Swal.fire({
                title: "Reserva modificada con exito!", icon: "success", background: '#393939',
                color: '#fafafa'
              });
            } else {
              Swal.fire({
                title: "Reserva realizada con exito!", icon: "success", background: '#393939',
                color: '#fafafa'
              });
            }

            if (user.admin) {
              navigate('/manage-reserves');
            } else {
              navigate('/reserves')
            }
          }

        }


      }
      )
    }

  }, [reloadedReserves, reserveErrors])

  const onSubmit = handleSubmit((data) => {

    if (params.id) {
      actualizarReserva(params.id, data)
    } else {
      crearReserva(data)
    }

  })

  return (
    <div className='flex items-center my-36 justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <form onSubmit={onSubmit}>
          <input type="date" placeholder='Dia' min={`${new Date().toISOString().slice(0, 10)}`} max="2024-09-01" {...register('dia', { required: 'La fecha es requerida' })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          <p className='text-red-500'>{errors.dia?.message}</p>
         
          <select name='hora' {...register('hora', { required: 'La hora es requerido' })} className='w-full bg-zinc-700 px-4 py-2 rounded-md my-2'>
            <option value="" selected>Hora</option>
            {horas.map((hora) => {
              return <option key={hora} value={hora}>{hora}</option>
            })}
          </select>
          <p className='text-red-500'>{errors.hora?.message}</p>

          <input placeholder='Telefono' type="number" {...register('telefono', {
            required: 'El telefono es requerido',
            minLength: { value: 7, message: 'El telefono debe tener como minimo 7 caracteres' },
            maxLength: { value: 12, message: 'Numero no valido' },
            min:{value:0,message:"Numero no valido"}
          })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          <p className='text-red-500'>{errors.telefono?.message}</p>

          <select name='cantidadPersonas' {...register('cantidadPersonas', { required: 'La cantidad de comensales es requerida' })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
            <option value="">Comensales</option>
            {cantidadPersonas.map((cant) => {
              return <option key={`cp${cant}`} value={cant}>{cant}</option>
            })}
          </select>

          <button className='bg-orange-400 px-4 py-1 rounded-md mt-3 text-black'>
            <b>{params.id ? 'Modificar reserva' : 'Realizar Reserva'}</b>
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReserveForm