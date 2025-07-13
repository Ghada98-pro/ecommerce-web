import React, { useContext } from 'react'
import { userContext } from '../Context/UserContext'
import Login from '../Pages/Login'
import { Navigate } from 'react-router-dom'


export default function ProtectRoute(props) {
    if (localStorage.getItem('userToken') !== null) {
        return props.children
    }
    else {
        return <Navigate to='/login' />
    }

}