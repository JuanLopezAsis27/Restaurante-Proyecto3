import React, { useEffect } from 'react'
import { useReserves } from '../context/ReserveContext'
import ReserveCard from "../components/ReserveCard";


const ManageReserves = () => {
  const { readReserves, reserves, reloadedReserves, setReloadedReserves } = useReserves()

  useEffect(() => {
    readReserves()

    return () => setReloadedReserves(false)

  }, [reloadedReserves])

  if (reserves.length == 0) return (
    <div className='flex justify-center'>
      <div className='bg-zinc-800 p-10 rounded-xl text-center my-32 '>
        <h1 className=' text-6xl font-bold'>No hay reservas realizadas</h1>
      </div>
    </div>

  )

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-20 my-32 px-16'>
      {reserves.map((reserve) => (
        <ReserveCard reserve={reserve} key={reserve.rid} />
      ))}
    </div>
  );
}

export default ManageReserves