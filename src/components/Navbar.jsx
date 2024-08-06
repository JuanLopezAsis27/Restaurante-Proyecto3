import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const location = useLocation();
    const [openDrop, setOpenDrop] = useState();
    const { isAuthenticated, logout, user } = useAuth();

    const menuRef = useRef()
    const imgRef = useRef()



    useEffect(() => {
        const path = window.location.pathname;
        const nav = document.querySelector('nav')
        if (path == '/') {
            nav.classList.add('fixed');
            nav.classList.remove('noHome-nav')
            window.addEventListener("scroll", function () {
                nav.classList.toggle("abajo", this.window.scrollY > 0);

            })
        } else {
            nav.classList.add('fixed')
            nav.classList.add('top-0')
            nav.classList.add('noHome-nav')
            window.addEventListener("scroll", function () {
                nav.classList.remove("abajo");

            })

        }
    }, [location])


    window.addEventListener('click', (e) => {
        if (e.target !== menuRef.current && e.target !== imgRef.current) {
            setOpenDrop(false)
        }
    })

    return (

        <nav className=' mb-3 py-2 flex justify-between lg:px-10 min-w-full px-4 z-50 font-bold text-md'>
            <div className='flex justify-start'>
                <Link to='/'><img className='w-24 mr-4 rounded-full logo-nav' src="https://png.pngtree.com/png-clipart/20220604/original/pngtree-restaurant-logo-png-image_7932128.png" alt="" /></Link>
                <input type="checkbox" id='check'/>
                <label htmlFor="check" className="icons" >
                    <i className='bx bx-menu' id='menu-icon' ></i>
                    <i className='bx bx-x' id='close-icon'></i>
                </label>
                <ul className='md:gap-x-5 lg:gap-x-8 items-center flex-wrap nav-list  '>
                    <Link to='/images' >Imagenes</Link>
                    <Link to='/nosotros' >Quienes Somos</Link>
                    <Link to='/contacto' >Contactenos</Link>
                    <Link to='/add-reserves' className='mr-5'>Hacer una reserva</Link>
                </ul>
            </div>
                <ul className='lg:gap-x-5 md:gap-x-3 items-center flex nav-login'>
                    {isAuthenticated ? (
                        <>
                            
                            <div className='flex flex-col mr-4'>
                                <div className='relative'>
                                    <img ref={imgRef} className='w-20 avatar-nav' onClick={() => setOpenDrop(!openDrop)} src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="" />
                                    {
                                        openDrop && (
                                            <div className='flex flex-col'>
                                                <div>
                                                    <svg width="50px" height="50px" className='triangulo'>
                                                        <polygon fill="rgb(249 115 22)" stroke="rgb(249 115 22)" strokeWidth="4px" points="5 13.75, 11.25 1.75, 17.5 13.75" />
                                                    </svg>
                                                </div>
                                                <div ref={menuRef} className='bg-orange-500 p-2 w-44 shadow-lg rounded-md absolute -left-12 top-24 dropdown text-black font-bold'>

                                                    <ul className='flex flex-col nav-perfil'>
                                                        <Link to='/profile' onClick={() => setOpenDrop(false)} className='p-2 cursor-pointer rounded-md hover:bg-slate-600 hover:text-black'>Perfil</Link>
                                                        {
                                                            user.admin ? (
                                                                <>
                                                                    <Link to='/manage-users' onClick={() => setOpenDrop(false)} className='p-2 cursor-pointer rounded-md hover:bg-slate-600 hover:text-black'>Gestion de usuarios</Link>
                                                                    <Link to='/manage-reserves' onClick={() => setOpenDrop(false)} className='p-2 cursor-pointer rounded-md hover:bg-slate-600 hover:text-black'>Gestion de reservas</Link>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Link to='/reserves' className='p-2 cursor-pointer rounded-md hover:bg-slate-600 hover:text-black'>Mis reservas</Link>
                                                                </>
                                                            )
                                                        }
                                                        <Link onClick={logout} className='p-2 cursor-pointer rounded-md hover:bg-slate-600 hover:text-black'>Salir</Link>
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
                            <Link to='/login' className='bg-orange-400 md:px-1 lg:px-4 py-1 rounded-md text-black btn-nav'><b>Ingresar</b></Link>
                            <Link to='/register' className='bg-orange-400 md:px-1 px-4 py-1 rounded-md text-black btn-nav'><b>Registrarse</b></Link>
                        </>
                    )}

                </ul>
            
        </nav>




    )
}

export default Navbar