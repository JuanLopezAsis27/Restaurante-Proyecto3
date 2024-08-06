import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useReserves } from '../context/ReserveContext';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
import { useAuth } from '../context/AuthContext';

const ReserveForm = () => {
  const horas = ['13:00', '14:00', '15:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  const cantidadPersonas = [4, 5, 6, 7, 8];
  const { register, handleSubmit, setValue, reset } = useForm();
  const { crearReserva, readOneReserve, actualizarReserva, reserves } = useReserves()
  const {user} = useAuth()
  const navigate = useNavigate()
  const location = useLocation();
  const params = useParams()

  useEffect(() => {
    const path = window.location.pathname;
    if (path=="/add-reserves") {
      reset()
    }
  },[location])

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



  const onSubmit = handleSubmit((data) => {
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
        const reserva = reserves.find((reserve) => reserve.dia == data.dia && reserve.hora == data.hora && reserve.cantidadPersonas == data.cantidadPersonas)

        if (reserva) {
          if (params.id) {
            const res = await readOneReserve(params.id)
            console.log(data);

            if (res.data.dia == data.dia && res.data.hora == data.hora && res.data.cantidadPersonas == data.cantidadPersonas) {
              Swal.fire({
                icon: "warning",
                title: `No se han notado cambios en su reserva`,
                text: "Desea regresar al menu de reservas?",
                showCancelButton: true,
                cancelButtonColor: "#a40000",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Regresar",
                background: '#393939',
                color: '#fafafa'
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/reserves')
                }
              })
            } else {
              Swal.fire({
                icon: "error",
                title: `Esta mesa ya esta reservada`,
                background: '#393939',
                color: '#fafafa'
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: `Esta mesa ya esta reservada`,
              background: '#393939',
              color: '#fafafa'
            });
            reset()
          }
        } else {
          Swal.fire({title:"Reserva realizada!", icon:"success", background: '#393939',
            color: '#fafafa'});
          if (params.id) {
            actualizarReserva(params.id, data)
          } else {
            crearReserva(data)
          }

          if (user.admin) {
            navigate('/manage-reserves');
          }else{
            navigate('/reserves')
          }

        }


      }
    })


  })

  return (
    <div className='flex items-center my-36 justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <form onSubmit={onSubmit}>
          <label>Fecha</label>
          <input type="date" placeholder='Dia' min={`${new Date().toISOString().slice(0, 10)}`} max="2024-09-01" {...register('dia', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          <label>Hora</label>
          <select name='hora' {...register('hora', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
            {horas.map((hora) => {
              return <option key={hora} value={hora}>{hora}</option>
            })}
          </select>
          <label>Telefono</label>
          <input type="number" {...register('telefono', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          <label>Comensales</label>
          <select name='cantidadPersonas' {...register('cantidadPersonas', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
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