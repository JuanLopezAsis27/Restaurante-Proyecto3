import React, { useEffect } from 'react'
import { useReserves } from '../context/ReserveContext'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Swal from 'sweetalert2'


const ReserveCard = ({ reserve }) => {

  const { eliminarReserva } = useReserves()
  const { user } = useAuth()
  let nombreUsu;
  if (user.admin) {
    nombreUsu = <h1 className='text-2xl font-bold'>{reserve.user.username}</h1>
  }


  const deleteReserve = () => {
    Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    Swal.fire({
      title: "Seguro que quieres cancelar esta reserva?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#a40000",
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#197600",
      cancelButtonText: "Cerrar",
      reverseButtons: true,
      background: '#393939',
      color: '#fafafa'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarReserva(reserve.rid);
        Swal.fire({
          title: "Cancelada",
          text: "Tu reserva ha sido cancelada",
          icon: "success",
          background: '#393939',
          color: '#fafafa'
        });

      } 
    });
  }

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md '>
      <header className='flex justify-between flex-col sm:flex-row'>
        <div className='sm:m-0 mb-5'>
          {nombreUsu}
          <h1 className='text-2xl font-bold'>{reserve.dia}</h1>
          <p className='text-slate-300'>Hora: {reserve.hora}</p>
          <p className='text-slate-300'>Comensales: {reserve.cantidadPersonas}</p>
        </div>
        <div className='flex sm:flex-col gap-y-4 item-center gap-x-3'>
          <button className='bg-orange-700 text-center rounded-md p-2' onClick={deleteReserve}>Cancelar reserva</button>
          <Link className='bg-yellow-600 rounded-md text-center p-2' to={`/reserves/${reserve.rid}`}>Editar</Link>
        </div>
      </header>

    </div>
  )
}

export default ReserveCard