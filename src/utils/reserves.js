import axios from "./axios";

export const getUserReserves = ()=> axios.get('/reserves/getUserReserves');

export const getOneReserve = (id)=> axios.get(`/reserves/getOneReserve/${id}`);

export const createReserve = (reserve)=> axios.post('/reserves/createReserve',reserve);

export const updateReserve = (id, reserve)=> axios.put(`/reserves/updateReserve/${id}`,reserve);

export const deleteReserve = (id)=> axios.delete(`/reserves/deleteReserve/${id}`);



