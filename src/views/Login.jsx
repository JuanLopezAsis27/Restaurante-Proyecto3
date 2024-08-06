import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2'

const Login = () => {

  const navigate = useNavigate()
  const { signIn, isAuthenticated, errors: loginErrors } = useAuth()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()


  useEffect(() => {
    if (isAuthenticated) {
      Swal.fire({
        title: "Sesion iniciada exitosamente!",
        icon: "success",
        background: '#393939',
        color: '#fafafa'
      });
      navigate('/')

    }
  }, [isAuthenticated])

  useEffect(() => {
    if (loginErrors.length != 0) {

      Swal.fire({
        icon: "error",
        title: `${loginErrors.map((error, i) => error)}`,
        background: '#393939',
        color: '#fafafa'
      });
      reset()

    }
  }, [loginErrors])

  const onSubmit = handleSubmit((values) => {
    signIn(values)
  })

  return (
    <div className='flex items-center justify-center my-36'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md min-w-md'>
        <h1 className='text-2xl font-bold'>Ingresar</h1>
        <form onSubmit={onSubmit}>
          <input placeholder='Email' type="email" name='email' {...register('email', { required: 'El email es requerido' })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          <p className='text-red-500'>{errors.email?.message}</p>
          <input placeholder='Contraseña' type="password" name='password'{...register('password', { required: 'La contraseña es requerida' })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          <p className='text-red-500'>{errors.password?.message}</p>
          <button type='submit' className='bg-orange-400 text-black px-4 py-1 rounded-md my-2'>
            <b>Ingresar</b>
          </button>
        </form>
        <p className='flex gap-x-2 justify-between mt-4'>No tienen una cuenta?<Link to="/register" className='text-sky-500'>Registrate</Link></p>
      </div>
    </div>
  )
}

export default Login