import React from 'react'
import { eraseCookie } from '../../Cookies'
import './Header.css'

export default function Header() {
  return (
    <div className="header-container">
      <button
        className="logout-btn"
        onClick={() => {
          eraseCookie('user')
          window.location.reload()
        }}
      >
        გასვლა
      </button>
    </div>
  )
}
