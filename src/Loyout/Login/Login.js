import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../../API'
import { getCookie, setCookie } from '../../Cookies'
import { ACTIVE_BOOKINGS } from '../../routes'
import api from '../../useApiCall'
import './Login.css'

export default function Login() {
  const nav = useNavigate()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const STATUS = getCookie('status')
  const [error, setError] = useState('')

  const adminLogin = async (us, pass) => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'AdminLogin',
          controller: 'Admin',
          pars: {
            USER_NAME: us,
            USER_PASS: pass,
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      // dispatch(setSubPackets(responseData.data))
      // localStorage.setItem(responseData, 'DATA')
      console.log(responseData, 'Sub Packets')
      if (responseData.status == 'success') {
        loginSucces(responseData.data)
      } else {
        alert('მონაცემები არასწორია')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const loginSucces = (data) => {
    setCookie('staff', data.STAFF_NAME, 365)
    setCookie('status', data.STATUS, 365)
    setCookie('token', data.TOKEN, 365)
    setCookie('uid', data.UID, 365)
    setCookie('user', data.USER_NAME, 365)
    nav(ACTIVE_BOOKINGS)
  }

  useEffect(() => {
    if (STATUS == 1) {
      nav(ACTIVE_BOOKINGS)
    }
  }, [STATUS])

  const handleSubmit = () => {
    // setCookie('user', user, 1)
    // nav(ACTIVE_BOOKINGS)
    // localStorage.setItem(JSON.stringify(e), 'DATA')
    // adminLogin(user, password)
  }

  useEffect(() => {}, [user, password])

  return (
    <div className="login-container">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          adminLogin(user, password)
          // handleSubmit()
        }}
        className="login-form"
      >
        <p>სისტემაში შესვლა</p>
        <div className="inp-cont">
          <label className="label" htmlFor="userName">
            შეიყვანეთ მომხმარებელი
          </label>
          <input
            id="userName"
            name="userName"
            type="text"
            onChange={(val) => setUser(val.target.value)}
            variant="outlined"
            label="მომხმარებელი"
            className="user-input"
            required
          />
        </div>
        <div className="inp-cont">
          <label className="label" htmlFor="password">
            შეიყვანეთ პაროლი
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(val) => setPassword(val.target.value)}
            variant="outlined"
            label="პაროლი"
            className="pass-input"
            required
          />
        </div>
        <button className="submit-btn" type="submit">
          შესვლა
        </button>
        {/* <Link className="recovery-link" to={PASS_RECOVERY}>
          პაროლის აღდგენა
        </Link> */}
      </form>
    </div>
  )
}
