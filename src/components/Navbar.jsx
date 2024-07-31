import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {

    const [openDrop, setOpenDrop] = useState();

    const { isAuthenticated, logout, user } = useAuth();

    const menuRef = useRef()
    const imgRef = useRef()
    
    window.addEventListener('click', (e) => {
        if (e.target !== menuRef.current && e.target !== imgRef.current) {
            setOpenDrop(false)
        }
    })

    return (
        <nav className='bg-zinc-700 my-3 flex justify-between py-2 px-10 rounded-lg'>
            <ul className='flex gap-x-2 items-center'>
                <Link to='/'><img className='w-24 rounded-full' src="https://png.pngtree.com/png-clipart/20220604/original/pngtree-restaurant-logo-png-image_7932128.png" alt="" /></Link>
                <Link to='/nosotros'>Nosotros</Link>
                <Link to='/contacto'>Contactenos</Link>
            </ul>
            <ul className='flex gap-x-2 items-center'>
                {isAuthenticated ? (
                    <>
                        {
                            !user.admin &&
                                <Link to='/add-reserves' className='mr-5'>Hacer una reserva</Link>
                        }
                        <div className='flex flex-col mr-2'>
                            <div className='relative'>
                                <img ref={imgRef} className='w-20' onClick={() => setOpenDrop(!openDrop)} src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="" />

                                {
                                    openDrop && (
                                        <div className='flex flex-col '>
                                            <div>
                                                <svg width="50px" height="50px" className='triangulo flex top-17 left-7'>
                                                    <polygon fill="rgb(249 115 22)" stroke="rgb(249 115 22)" stroke-width="4px" points="5 13.75, 11.25 1.75, 17.5 13.75" />
                                                </svg>
                                            </div>
                                            <div ref={menuRef} className='bg-orange-500 p-2 w-44 shadow-lg rounded-md absolute -left-12 top-24 dropdown'>

                                                <ul className='flex flex-col'>
                                                    <Link to='/profile' onClick={() => setOpenDrop(false)} className='p-2 cursor-pointer rounded-md hover:bg-slate-600 hover:text-black'>Perfil</Link>
                                                    {
                                                        user.admin?(
                                                            <>
                                                                <Link to='/manage-users' onClick={() => setOpenDrop(false)} className='p-2 cursor-pointer rounded-md hover:bg-slate-600 hover:text-black'>Gestion de usuarios</Link>
                                                                <Link to='/manage-reserves' onClick={() => setOpenDrop(false)} className='p-2 cursor-pointer rounded-md hover:bg-slate-600 hover:text-black'>Gestion de reservas</Link>
                                                            </>
                                                        ):(
                                                            <>
                                                                <Link to='/reserves' className='p-2 cursor-pointer rounded-md hover:bg-slate-600 hover:text-black'>Mis reservas</Link>
                                                            </>
                                                        )
                                                    }
                                                    <Link to='/' onClick={logout} className='p-2 cursor-pointer rounded-md hover:bg-slate-600 hover:text-black'>Salir</Link>                                  
                                                </ul>
                                            </div>
                                        </div>

                                    )
                                }
                            </div>
                        </div>
                        
                    </>
                ) : (
                    <>
                        <Link to='/login' className='bg-orange-700 px-4 py-1 rounded-md'>Ingresar</Link>
                        <Link to='/register' className='bg-orange-700 px-4 py-1 rounded-md'>Registrarse</Link>
                    </>
                )}

            </ul>
        </nav>
    )
}

export default Navbar