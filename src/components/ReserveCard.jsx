import React from 'react'
import { useReserves } from '../context/ReserveContext'
import { Link } from 'react-router-dom'

const ReserveCard = ({ reserve }) => {

    const { eliminarReserva } = useReserves()

    return (
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            <header className='flex justify-between'>
                <div>
                    <h1 className='text-2xl font-bold'>{reserve.dia}</h1>
                    <p className='text-slate-300'>Hora: {reserve.hora}</p>
                    <p className='text-slate-300'>Comensales: {reserve.cantidadPersonas}</p>
                </div>
                <div className='flex flex-col gap-y-4 item-center'>
                    <button className='bg-orange-700 rounded-md' onClick={() => {
                        eliminarReserva(reserve.rid);
                    }}>Cancelar reserva</button>
                    <button className='bg-lime-600 rounded-md p-2'><Link to={`/reserves/${reserve.rid}`}>Editar</Link></button>
                </div>
            </header>

        </div>
    )
}

export default ReserveCard