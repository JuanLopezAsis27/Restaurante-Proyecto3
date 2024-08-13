import { createContext, useContext, useState, useEffect } from "react";
import { createReserve, getUserReserves, getOneReserve, getReserves, deleteReserve, updateReserve } from "../utils/reserves";


export const ReserveContext = createContext()

export const useReserves = () => {
    const context = useContext(ReserveContext)
    if (!context) {
        throw new Error("useReserves debe usarse dentro de un ReserveProvider")
    }
    return context
}

export function ReserveProvider({ children }) {

    const [reserves, setReserves] = useState([])
    const [reloadedReserves,setReloadedReserves] = useState(false)
    const [reserveErrors, setReserveErrors] = useState([]);


    const readUserReserves = async () => {
        try {
            const res = await getUserReserves();

            setReserves(res.data);

        } catch (error) {
            console.log(error);
        }
    }

    
    const readReserves = async () => {
        try {
            const res = await getReserves();

            setReserves(res.data);

        } catch (error) {
            console.log(error);
        }
    }

    const crearReserva = async (data) => {
       try {
        console.log(data.dia);
        const telefono = parseInt(data.telefono);
        const cantidadPersonas = parseInt(data.cantidadPersonas);
        const reserve = { ...data, telefono, cantidadPersonas };
        const res = await createReserve(reserve)
        setReloadedReserves(true)

       } catch (error) {
        if (Array.isArray(error.response.data)) {
            return setReserveErrors(error.response.data)
        }
        setReserveErrors([error.response.data.message])
       }
    }

    const eliminarReserva = async (id) => {
        try {
            const res = await deleteReserve(id);
            console.log(res);
            
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
            setReloadedReserves(true)
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setReserveErrors(error.response.data)
            }
            setReserveErrors([error.response.data.message])
        }
    }

    useEffect(() => {
        if (reserveErrors.length > 0) setReserveErrors([])
        if (reloadedReserves) setReloadedReserves(false)

    }, [reloadedReserves,reserveErrors])

    return (
        <ReserveContext.Provider value={{ reserves, crearReserva, readUserReserves, eliminarReserva, readOneReserve, readReserves, 
        actualizarReserva,reloadedReserves,setReloadedReserves,reserveErrors  }}>
            {children}
        </ReserveContext.Provider>

    )

}