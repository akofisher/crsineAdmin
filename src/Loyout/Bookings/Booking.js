import React from 'react'
import { Link } from 'react-router-dom'
import {
  ACTIVE_BOOKINGS,
  CANCELED_BOOKINGS,
  DONE_BOOKINGS,
  PROCESS_BOOKINGS,
} from '../../routes'
import Loyout from '../Loyout'
import './Booking.css'

export default function Booking(props) {
  return (
    <Loyout>
      <div className="page_container">
        <div className="booking_nav_container">
          <Link
            className={
              window.location.pathname == ACTIVE_BOOKINGS
                ? 'active_booking_links'
                : 'booking_links'
            }
            to={ACTIVE_BOOKINGS}
          >
            აქტიური
          </Link>
          <Link
            className={
              window.location.pathname == PROCESS_BOOKINGS
                ? 'active_booking_links'
                : 'booking_links'
            }
            to={PROCESS_BOOKINGS}
          >
            დაწყებული
          </Link>
          <Link
            className={
              window.location.pathname == DONE_BOOKINGS
                ? 'active_booking_links'
                : 'booking_links'
            }
            to={DONE_BOOKINGS}
          >
            დასრულებული
          </Link>
          <Link
            className={
              window.location.pathname == CANCELED_BOOKINGS
                ? 'active_booking_links'
                : 'booking_links'
            }
            to={CANCELED_BOOKINGS}
          >
            გაუქმებული
          </Link>
        </div>
        {props.children}
      </div>
    </Loyout>
  )
}
