import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getCookie } from './Cookies.js'





const PrivateRoute = ({ children, redirectTo }) => {
  const USER = getCookie('user')



  // useEffect(() => {
  //   fetch(API, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       ApiMethod: 'UserTokenAuth',
  //       controller: 'Customers',
  //       pars: {
  //         FRONT_TOKEN: TOKEN,
  //       },
  //     }),
  //   }).then(db => {
  //     db.json().then(json => {
  //       if (json.status === 'success') {

  //       } else if (json.status !== 'success') {
  //         eraseCookie('MOB')
  //         eraseCookie('EMAIL')
  //         eraseCookie('UserName')
  //         eraseCookie('User')
  //         eraseCookie('TOKEN')
  //         window.location.reload()
  //       }
  //     })
  //   })
  // }, [])



  return (USER ? children : <Navigate to={redirectTo} />
  )
}

export default PrivateRoute