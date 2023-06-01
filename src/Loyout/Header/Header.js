import React from 'react'
import { eraseCookie } from '../../Cookies'
import './Header.css'

export default function Header() {
  return (
    <div className="header-container">
      <button
        className="logout-btn"
        onClick={() => {
          eraseCookie('staff')
          eraseCookie('status')
          eraseCookie('token')
          eraseCookie('uid')
          eraseCookie('user')
          window.location.reload()
        }}
      >
        სისტემიდან გასვლა
      </button>
    </div>
  )
}
