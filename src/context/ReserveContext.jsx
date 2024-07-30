import { createContext, useContext, useState } from "react";
import { createReserve, getReserves, getOneReserve, deleteReserve, updateReserve } from "../utils/reserves";

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

    const readReserves = async ()=>{
        try {
            const res = await getReserves(); 
            console.log(res);
            setReserves(res.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    const crearReserva = async (data) => {
        const telefono = parseInt(data.telefono)
        const cantidadPersonas = parseInt(data.telefono)
        const reserve = {...data,telefono,cantidadPersonas}
        const res = await createReserve(reserve)

        console.log(res);
    }

    return (
        <ReserveContext.Provider value={{ reserves, crearReserva , readReserves}}>
            {children}
        </ReserveContext.Provider>

    )

}