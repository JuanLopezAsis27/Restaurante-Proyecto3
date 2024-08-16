import React, {useEffect} from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

const Profile = () => {
  const { user, updateUser, errors: registerErrors } = useAuth()
  const { handleSubmit, register, reset } = useForm()
  const navigate = useNavigate()

  const params = useParams()

  useEffect(() => {
    if (registerErrors.length != 0) {

      Swal.fire({
        icon: "error",
        title: `${registerErrors.map((error, i) => error)}`,
        text: "Intente con otro",
        background: '#393939',
        color: '#fafafa'
      });
      reset()

    }
  }, [registerErrors])

  const onSubmit = handleSubmit(async (data) => {

    Swal.fire({
      title: "¿Seguro modificar tus datos?",
      showDenyButton: true,
      confirmButtonColor: "#197600",
      denyButtonColor: "#a40000",
      confirmButtonText: "Modificar",
      denyButtonText: `Cancelar`,
      background: '#393939',
      color: '#fafafa'
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        updateUser(params.id, data)

        if (registerErrors.length == 0) {
          Swal.fire({
            title: "Excelente",
            text: "Tus datos han sido modificados",
            icon: "success",
            background: '#393939',
            color: '#fafafa'
          })

          navigate('/profile')
        }
      }
    })

    console.log(data);


  })



  return (
    <div className='text-center my-36 '>
      <div className='bg-zinc-800 p-10 mx-auto rounded-md max-w-4xl'>
        <h1 className='text-2xl font-bold mb-8'>Mi perfil</h1>
        <form className="flex justify-evenly items-center" onSubmit={onSubmit}>
          <div className='flex flex-col items-start'>
            <label className='ps-1'>Nombre de usuario</label>
            {params.id ? (<input type="text" className='min-w-72 mb-5 bg-zinc-700 text-white px-4 py-2 rounded-md my-2' autoComplete='true'
              {...register('username', { required: 'El nombre de usuario es requerido' })} />
            ) :
              (<input type="text" value={user.username} className='min-w-72 mb-5 bg-zinc-700 text-white px-4 py-2 rounded-md my-2' disabled />
              )
            }
            <label className='ps-1'>Email</label>
            {params.id ? (<><input type="email" className='min-w-72 mb-5 bg-zinc-700 text-white px-4 py-2 rounded-md my-2' autoComplete='true'
              {...register('email', { required: 'El email es requerido' })} />
              <button className='bg-orange-400 rounded-md text-center p-2 text-black' to={`/profile/${user.id}`}><b>Modificar perfil</b></button>
            </>) :
              (<>
                <input type="text" value={user.email} className='min-w-72 mb-5 bg-zinc-700 text-white px-4 py-2 rounded-md my-2' disabled />
                <Link className='bg-orange-400 rounded-md text-center p-2 text-black' to={`/profile/${user.id}`}><b>Editar</b></Link>
              </>)
            }
          </div>
          <img className='w-56' src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="" />
        </form>
      </div>
    </div>
  )
}

export default Profile