import React, { useCallback, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DateAndTime } from '../../data'
import Loyout from '../Loyout'
import './BookingTimes.css'

//https://www.npmjs.com/package/react-datepicker

export default function BookingTimes() {
  const [startDate, setStartDate] = useState(new Date())
  const [date, setDate] = useState('')

  const PickADate = useCallback((val) => {
    let i = ' '
    let s = ':'
    let D = String(val).indexOf(' ')
    let L = String(val).lastIndexOf(':')
    setDate(String(val).substring(D, L))
  }, [])

  return (
    <Loyout>
      <div className="bookingtime_container">
        <div className="left_bookingtime_container">
          <p className="dates_header_text">თავისუფალი დროები</p>
          <div className="open_dates">
            {DateAndTime.map((val, idx) => {
              return (
                <div className="date_card" key={idx}>
                  <p className="date">{val.date}</p>
                  <button className="date_deletion">წაშლა</button>
                </div>
              )
            })}
          </div>
          <p className="dates_header_text">დაჯავშნილი დროები</p>
          <div className="booked_dates">
            {DateAndTime.map((val, idx) => {
              return (
                <div className="date_card" key={idx}>
                  <p className="date">{val.date}</p>
                  <button className="date_deletion">წაშლა</button>
                </div>
              )
            })}
          </div>
        </div>
        <div className="right_bookingtime_container">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
          <button className="add_date" onClick={() => PickADate(startDate)}>
            დამატება
          </button>
          <p>{date ? date : null}</p>
        </div>
      </div>
    </Loyout>
  )
}
