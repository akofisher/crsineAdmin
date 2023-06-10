import React, { useCallback, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch } from 'react-redux'
import { API } from '../../API'
import { getCookie } from '../../Cookies'
import { setTimes } from '../../Store/CarWash/CarWashActCreat'
import { DateAndTime } from '../../data'
import api from '../../useApiCall'
import Loyout from '../Loyout'
import './BookingTimes.css'

//https://www.npmjs.com/package/react-datepicker

export default function BookingTimes() {
  const [startDate, setStartDate] = useState(new Date())
  const [date, setDate] = useState('')
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const token = getCookie('token')
  const uid = getCookie('uid')

  // const response = 'Fri Jun 09 2023 15:41:57 GMT+0400 (Georgia Standard Time)';
  // const datee = new Date(response);
  // const timestamp = datee.getTime();

  // console.log(timestamp);

  const fetchTime = async () => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'GetTimeList',
          controller: 'Services',
          pars: '',
        }),
      }
      const responseData = await api.fetchData(url, options)
      dispatch(setTimes(responseData.data))
      console.log(responseData.data, 'Times')
    } catch (error) {
      setError(error.message)
    }
  }
  const addTime = async () => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'AddTime',
          controller: 'Admin',
          pars: { FREE_TIME: 12312321312, TOKEN: token, ADMIN_ID: uid },
        }),
      }
      const responseData = await api.fetchData(url, options)
      // dispatch(setTimes(responseData.data))
      console.log(responseData.data, 'Times2')
    } catch (error) {
      setError(error.message)
    }
  }

  const editTime = async () => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'EditTime',
          controller: 'Admin',
          pars: {
            FREE_TIME: 12312321312,
            TOKEN: token,
            ADMIN_ID: uid,
            TIME_ID: 0,
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      // dispatch(setTimes(responseData.data))
      console.log(responseData.data, 'Times3')
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchTime()
    addTime()
    editTime()
  }, [])

  const PickADate = useCallback((val) => {
    console.log(val, 'DTE')
    let i = ' '
    let s = ':'
    let D = String(val).indexOf(' ')
    let L = String(val).lastIndexOf(':')
    setDate(String(val).substring(D, L))
  }, [])

  return (
    <Loyout>
      <div className="bookingtime_container">
        {/* <div className="left_bookingtime_container">
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
        </div> */}
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
        </div>
      </div>
    </Loyout>
  )
}
