import React, { useEffect } from 'react'
import { useReserves } from '../context/ReserveContext'

const Reserves = () => {
  const { readReserves , reserves} = useReserves()
  console.log(reserves);
  useEffect(()=>{
    readReserves()
  },[])

  return <div>
      {reserves.map(reserve=>(
      <div key={reserve.rid}>
        <p>{reserve.dia}</p>
        <p>{reserve.hora}</p>
        <p>{reserve.telefono}</p>
        <p>{reserve.cantidadPersonas}</p>
        
      </div>
      ))
    }
    </div>;
  }


export default Reserves