import React from 'react'
import { eraseCookie } from '../../Cookies'
import './Header.css'

export default function Header() {
  return (
    <div className="header-container">
      <button
        className="submit-btn"
        onClick={() => {
          eraseCookie('user')
          window.location.reload()
        }}
      >
        LOG OUT
      </button>
    </div>
  )
}
