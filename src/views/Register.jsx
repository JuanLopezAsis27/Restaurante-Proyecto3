import React, { useEffect , useRef} from 'react'
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2'

const Register = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { signUp, isAuthenticated, errors: registerErrors } = useAuth()
    const navigate = useNavigate()


    useEffect(() => {
        if (isAuthenticated) {
            Swal.fire({
                title: "Usuario creado exitosamente!",
                text: "Cool",
                icon: "success"
            });
            navigate('/')
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (registerErrors.length != 0) {

            Swal.fire({
                icon: "error",
                title: `${registerErrors.map((error, i) => error)}`,
                text: "Intente con otro",
            });
            reset()

        }
    }, [registerErrors])

    const onSubmit = handleSubmit(async (values) => {
        signUp(values)
    })


    return (

        <div className='flex items-center justify-center my-32'>
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md " >
                <h1 className='text-2xl font-bold'>Registrarse</h1>
                <form onSubmit={onSubmit}>
                    <input placeholder='Nombre de usuario' type="text" name='username' {...register('username', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 ' />
                    {errors.username && <p className='text-red-500'>El nombre de usuario es requerido</p>}
                    <input placeholder='Email' type="email" name='email' {...register('email', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
                    {errors.email && <p className='text-red-500'>El email es requerido</p>}
                    <input placeholder='Contraseña' type="password" name='password' {...register('password', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
                    {errors.password && <p className='text-red-500'>La contraseña es requerida</p>}

                    <button type='submit' className='bg-orange-700 px-4 py-1 rounded-md my-2 '>
                        Registrarse
                    </button>
                </form>
                <p className='flex gap-x-2 justify-between mt-4'>Ya tienes una cuenta?<Link to="/login" className='text-sky-500'>Inicia sesion</Link></p>
            </div>
        </div>

    )
}

export default Register