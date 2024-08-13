import axios from './axios'



export const registrarse = (user)=>axios.post(`/auth/register`,user)

export const ingresar = (user)=>axios.post(`/auth/login`,user)

export const verifyToken = ()=>axios.get('/auth/verify')

export const leerUsuarios = ()=>axios.get('/auth/users')

export const actualizarUsuario = (id,data)=>axios.put(`/auth/user/${id}`,data)

export const suspenderUsuario = (id)=>axios.put(`/auth/disableUser/${id}`)

export const activarUsuario = (id)=>axios.put(`/auth/enableUser/${id}`)

export const eliminarUsuario = (id)=>axios.delete(`/auth/user/${id}`)







