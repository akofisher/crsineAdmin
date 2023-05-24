import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCookie, setCookie } from '../../Cookies'
import { ACTIVE_BOOKINGS, PASS_RECOVERY } from '../../routes'
import './Login.css'

export default function Login() {
  const nav = useNavigate()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const USERR = getCookie('user')

  useEffect(() => {
    if (USERR) {
      nav(ACTIVE_BOOKINGS)
    }
  }, [USERR])

  const handleSubmit = () => {
    setCookie('user', user, 1)
    nav(ACTIVE_BOOKINGS)
  }

  useEffect(() => {}, [user, password])

  return (
    <div className="login-container">
      <form onSubmit={() => handleSubmit()} className="login-form">
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
        <Link className="recovery-link" to={PASS_RECOVERY}>
          პაროლის აღდგენა
        </Link>
      </form>
    </div>
  )
}
