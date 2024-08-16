import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import UserListCard from '../components/UserListCard'


const ManageUsers = () => {
  const { readUsers, users ,reloadedUsers, setReloadedUsers,user  } = useAuth()

  useEffect(() => {
    readUsers()
    
    return()=> setReloadedUsers(false)

  }, [reloadedUsers])

  if (users.length == 0) return <h1>No hay usuarios registrados</h1>
  return (
    <div className='my-32 px-16'>
      <div className='bg-zinc-800 rounded-lg min-w-full'>
        {users.map((userList) => (
          user.id!=userList.uid &&
          <UserListCard userList={userList} key={userList.uid} />
        ))
        }
      </div>
    </div>
  )
}

export default ManageUsers