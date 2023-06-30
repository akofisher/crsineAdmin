import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { eraseCookie, getCookie } from './Cookies.js'

const PrivateRoute = ({ children, redirectTo }) => {
  const STAFF = getCookie('staff')
  const STATUS = getCookie('status')
  const TOKEN = getCookie('token')
  const UID = getCookie('uid')
  const USER = getCookie('user')

  useEffect(() => {
    if (STATUS && TOKEN && USER) {
    } else {
      eraseCookie('staff')
      eraseCookie('status')
      eraseCookie('token')
      eraseCookie('uid')
      eraseCookie('user')
      window.location.reload()
    }
  }, [STATUS, TOKEN, USER])

  return STATUS && TOKEN && USER ? children : <Navigate to={redirectTo} />
}

export default PrivateRoute
