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
    if (isAuthenticated ) {  
      Swal.fire({
        title: "Sesion iniciada exitosamente!",
        text: "Cool",
        icon: "success"
      });
      navigate('/')

    }
  }, [isAuthenticated])

  useEffect(() => {
    if (loginErrors.length!=0) {

      Swal.fire({
        icon: "error",
        title: `${loginErrors.map((error, i) => error)}`,
        text: "Intente con otro",
      });
      reset()

    }
  }, [loginErrors])

  const onSubmit = handleSubmit((values) => {
    signIn(values)
  })

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md min-w-md'>
        <h1 className='text-2xl font-bold'>Ingresar</h1>
        <form onSubmit={onSubmit}>
          <input placeholder='Email' type="email" name='email' {...register('email', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          {errors.email && <p className='text-red-500'>El email es requerido</p>}
          <input placeholder='Contraseña' type="password" name='password'{...register('password', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          {errors.password && <p className='text-red-500'>La contraseña es requerida</p>}
          <button type='submit' className='bg-orange-700 px-4 py-1 rounded-md my-2'>
            Ingresar
          </button>
        </form>
        <p className='flex gap-x-2 justify-between mt-4'>No tienen una cuenta?<Link to="/register" className='text-sky-500'>Registrate</Link></p>
      </div>
    </div>
  )
}

export default Login