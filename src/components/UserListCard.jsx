import React from 'react'
import { useAuth } from '../context/AuthContext'
import Swal from 'sweetalert2'

const UserListCard = ({ user }) => {

  const { suspendUser, deleteUser, enableUser } = useAuth()


  const suspenderUsuario = () => {
    Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false,
      background: '#393939',
      color: '#fafafa'
    });
    Swal.fire({
      title: "Seguro que quieres suspender a este usuario?",
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
        suspendUser(user.uid);
        // location.reload()
        Swal.fire({
          title: "Suspendido",
          text: "El usuario ha sido suspendido.",
          icon: "success",
          background: '#393939',
          color: '#fafafa'
        });

      } 
    });
  }


  const activarUsuario = () => {
    Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false,
      background: '#393939',
      color: '#fafafa'

    });
    Swal.fire({
      title: "¿Seguro que quieres sacarle la suspension a este usuario?",
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
        enableUser(user.uid);
        Swal.fire({
          title: "Activo",
          text: "El usuario esta nuevamente activo",
          icon: "success",
          background: '#393939',
          color: '#fafafa'
        });
        // location.reload()

      }
    });
  }


  const eliminarUsuario = () => {
    Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false,
      background: '#393939',
      color: '#fafafa'
    });
    Swal.fire({
      title: "Seguro que quieres eliminar este usuario?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#a40000",
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#197600",
      cancelButtonText: "Cerrar",
      reverseButtons: true,
      background: '#393939',
      color: '#fafafa',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user.uid);
        Swal.fire({
          title: "Eliminado!",
          text: "El usuario ha sido eliminado",
          icon: "success",
          background: '#393939',
          color: '#fafafa'
        });

      } 
    });
  }



  return (
    <div className=' w-full p-10'>
      <div className='flex items-center justify-around gap-20'>
        <h1 className='text-2xl font-bold '> Usuario: {user.username}</h1>
        <p className='text-slate-300 '>Id: {user.uid}</p>
        <p className='text-slate-300 '>Email: {user.email}</p>
        <p className='text-slate-300'>Admin: {user.admin ? 'Si' : 'No'} </p>
        <p className='text-slate-300'>Suspendido: {user.state ? 'No' : 'Si'} </p>
        <div className='flex flex-col'>
          {user.state ? (<button className='bg-yellow-600 rounded-md text-center p-2 mb-1' onClick={suspenderUsuario}>Suspender</button>) :
            (<button className='bg-green-500 rounded-md text-center p-2 px-3 mb-1' onClick={activarUsuario}>Reactivar</button>)}
          <button className='bg-orange-700 text-center rounded-md p-2' onClick={eliminarUsuario}>Eliminar</button>
        </div>
      </div>
    </div>
  )
}

export default UserListCard