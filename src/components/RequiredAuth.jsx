import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequiredAuth = ({ rolesArray }) => {
    const { auth } = useAuthContext()
    const location = useLocation()
  return (
    auth?.roles?.find(role => rolesArray.includes(role)) ? <Outlet/> : auth?.username ? <Navigate to='/unauthorized' state={{from : location}} replace/> : <Navigate to='/login' state={{from : location}} replace/>
  )
}

export default RequiredAuth