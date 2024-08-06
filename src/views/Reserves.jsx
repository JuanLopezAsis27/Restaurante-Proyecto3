import React, { useEffect } from 'react'
import { useReserves } from '../context/ReserveContext'
import ReserveCard from "../components/ReserveCard";


const Reserves = () => {
  const { readUserReserves, reserves } = useReserves()
  useEffect(() => {
    readUserReserves()
  }, [])

  if (reserves.length == 0) return(
    <div className='flex justify-center'>
      <div className='bg-zinc-800 p-10 rounded-xl text-center my-32 '>
        <h1 className=' text-6xl font-bold'>No hay reservas realizadas</h1>
      </div>
    </div>
  )

  return(
   <div className='grid grid-cols-3 gap-20 mb-56 mt-32 px-16'>
    {reserves.map((reserve) => (
          <ReserveCard reserve={reserve} key={reserve.rid}/>
    ))}
  </div>
  );
}


export default Reserves