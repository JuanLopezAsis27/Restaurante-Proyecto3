import axios from "./axios";

export const getUserReserves = ()=> axios.get('/reserves/userReserves');

export const getReserves = ()=> axios.get('/reserves/reserves');

export const getOneReserve = (id)=> axios.get(`/reserves/reserve/${id}`);

export const createReserve = (reserve)=> axios.post('/reserves/reserve',reserve);

export const updateReserve = (id, reserve)=> axios.put(`/reserves/reserve/${id}`,reserve);

export const deleteReserve = (id)=> axios.delete(`/reserves/reserve/${id}`);
