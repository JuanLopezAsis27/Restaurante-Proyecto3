import React, {useEffect} from 'react'
import { useReserves } from '../context/ReserveContext'
import ReserveCard from "../components/ReserveCard";


const ManageReserves = () => {
  const { readReserves, reserves } = useReserves()
  useEffect(() => {
    readReserves()
  }, [])

  if (reserves.length == 0) return <h1>No hay reservas</h1>

  return (
    <div className='grid grid-cols-3 gap-20 mb-56 mt-10'>
      {reserves.map((reserve) => (
        <ReserveCard reserve={reserve} key={reserve.rid} />
      ))}
    </div>
  );
}

export default ManageReserves