import React from 'react'
import { Link } from 'react-router-dom'
import {
  ABOUT_DETAILS,
  BOOKINGS,
  BOOKING_TIMES,
  CONTACT_DETAILS,
  NEWS_DETAILS,
  PACKAGES,
  SERVICES,
  SERVICES_DETAILS,
} from '../../routes'
import './SideBar.css'

export default function SideBar() {
  return (
    <div className="sideBar">
      <Link
        className={
          window.location.pathname == BOOKINGS
            ? 'active-nav-links'
            : 'nav-links'
        }
        to={BOOKINGS}
      >
        ჯავშნები
      </Link>
      <Link
        className={
          window.location.pathname == BOOKING_TIMES
            ? 'active-nav-links'
            : 'nav-links'
        }
        to={BOOKING_TIMES}
      >
        ჯავშნის დროები
      </Link>
      <Link
        className={
          window.location.pathname == CONTACT_DETAILS
            ? 'active-nav-links'
            : 'nav-links'
        }
        to={CONTACT_DETAILS}
      >
        საკონტაქტო დეტალები
      </Link>
      <Link
        className={
          window.location.pathname == ABOUT_DETAILS
            ? 'active-nav-links'
            : 'nav-links'
        }
        to={ABOUT_DETAILS}
      >
        ჩვენს შესახებ დეტალები
      </Link>
      <Link
        className={
          window.location.pathname == NEWS_DETAILS
            ? 'active-nav-links'
            : 'nav-links'
        }
        to={NEWS_DETAILS}
      >
        სიახლეების დეტალები
      </Link>
      <Link
        className={
          window.location.pathname == SERVICES_DETAILS
            ? 'active-nav-links'
            : 'nav-links'
        }
        to={SERVICES_DETAILS}
      >
        სერვისების დეტალები
      </Link>
      <Link
        className={
          window.location.pathname == PACKAGES
            ? 'active-nav-links'
            : 'nav-links'
        }
        to={PACKAGES}
      >
        პაკეტები
      </Link>
      <Link
        className={
          window.location.pathname == SERVICES
            ? 'active-nav-links'
            : 'nav-links'
        }
        to={SERVICES}
      >
        სერვისები
      </Link>
    </div>
  )
}
