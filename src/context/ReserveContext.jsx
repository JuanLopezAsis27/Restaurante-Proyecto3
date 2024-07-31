import { createContext, useContext, useState } from "react";
import { createReserve, getUserReserves, getOneReserve, deleteReserve, updateReserve } from "../utils/reserves";

export const ReserveContext = createContext()

export const useReserves = () => {
    const context = useContext(ReserveContext)
    if (!context) {
        throw new Error("useReserves must be used within an ReserveProvider")
    }
    return context
}

export function ReserveProvider({ children }) {

    const [reserves, setReserves] = useState([])

    const readUserReserves = async () => {
        try {
            const res = await getUserReserves();

            setReserves(res.data);

        } catch (error) {
            console.log(error);
        }
    }

    const crearReserva = async (data) => {
        const telefono = parseInt(data.telefono)
        const cantidadPersonas = parseInt(data.cantidadPersonas)
        const reserve = { ...data, telefono, cantidadPersonas }
        const res = await createReserve(reserve)

        console.log(res);
    }

    const eliminarReserva = async (id) => {
        try {
            const res = await deleteReserve(id);
            if (res.status == 204) setReserves(reserves.filter(reserve => reserve.rid != id))

        } catch (error) {
            console.log(error);
        }
    }

    const readOneReserve = async (id) => {
        try {
            const res = await getOneReserve(id)
            return res
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarReserva = async (id, reserve) => {
        try {
            const res = await updateReserve(id, reserve)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ReserveContext.Provider value={{ reserves, crearReserva, readUserReserves, eliminarReserva, readOneReserve, actualizarReserva }}>
            {children}
        </ReserveContext.Provider>

    )

}