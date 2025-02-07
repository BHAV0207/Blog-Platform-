import React from 'react'
import { Navigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode';


function ProtectedRoutes({ user , element}) {

  const token = localStorage.getItem('token')
  if(!token) return <Navigate to={'/'} replace />
  try{
    const decode = jwtDecode(token);
    console.log(user);
    if(decode.id != user.id){
      return <Navigate to={'/'} replace />
    }
    return element; 
  }catch(err){
    return <Navigate to={'/'} replace />
  }
}

export default ProtectedRoutes