import axios from "axios";

const instance = axios.create({
    baseURL:'https://restaurante-backend.onrender.com/api',
    withCredentials:true
})

export default instance