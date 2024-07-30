import axios from "./axios";

export const getReserves = ()=> axios.get('/reserves/getReserves');

export const getOneReserve = (id)=> axios.get(`/reserves/getOneReserve/${id}`);

export const createReserve = (reserve)=> axios.post('/reserves/createReserve',reserve);

export const updateReserve = (reserve)=> axios.put(`/reserves/updateReserve/${reserve._id}`,reserve);

export const deleteReserve = (id)=> axios.delete(`/reserves/deleteReserves/${id}`);



