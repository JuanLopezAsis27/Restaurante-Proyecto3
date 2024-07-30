import axios from './axios'



export const registrarse = (user)=>axios.post(`/auth/register`,user)

export const ingresar = (user)=>axios.post(`/auth/login`,user)

export const verifyToken = ()=>axios.get('/auth/verify')


