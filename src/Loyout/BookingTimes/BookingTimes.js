import React, { useCallback, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../API'
import { getCookie } from '../../Cookies'
import { setTimes } from '../../Store/CarWash/CarWashActCreat'
import { selectTimes } from '../../Store/CarWash/CarWashSelector'
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
  const TIMES = useSelector(selectTimes)
  const [editing, setEditing] = useState({
    id: '00',
    edit: false,
  })
  const [loading, setLoading] = useState(true)

  // const response = 'Fri Jun 09 2023 15:41:57 GMT+0400 (Georgia Standard Time)';
  // const datee = new Date(response);
  // const timestamp = datee.getTime();

  // console.log(timestamp);

  const takeTimeStampForSendStart = (val) => {
    const currentDate = new Date(val)

    const yr = currentDate.getFullYear()
    const mh = currentDate.getMonth()
    const dy = currentDate.getDate()
    const hrs = currentDate.getHours()
    const min = currentDate.getMinutes()
    let year = yr
    let month = mh
    let day = dy
    let hours = hrs
    let minutes = min

    let startDaten = new Date(year, month, day, hours + 4, minutes, 0)

    let startUnixTimestamp = Math.floor(startDaten.getTime() / 1000)
    // setStartDate(startUnixTimestamp)
    console.log(startUnixTimestamp, 'START NEW')
    return startUnixTimestamp
  }

  const fetchTime = async () => {
    setLoading(true)
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

      console.log(responseData, 'Times')
      if (responseData.status == 'success') {
        dispatch(setTimes(responseData.data))
        setLoading(false)
      } else {
      }
    } catch (error) {
      setError(error.message)
    }
  }
  const addTime = async () => {
    let time = takeTimeStampForSendStart(startDate)
    console.log(time, 'START DATE')
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
          pars: {
            FREE_TIME: time,
            TOKEN: token,
            ADMIN_ID: uid,
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      // dispatch(setTimes(responseData.data))
      if (responseData.status == 'success') {
        fetchTime()
      } else {
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const editTime = async (val) => {
    let time = takeTimeStampForSendStart(startDate)
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
            FREE_TIME: time,
            TOKEN: token,
            ADMIN_ID: uid,
            TIME_ID: val,
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      // dispatch(setTimes(responseData.data))
      if (responseData.status == 'success') {
        // window.location.reload()
        fetchTime()
        setEditing({
          id: '00',
          edit: false,
        })
        console.log(responseData, 'EDITING')
      } else {
      }
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchTime()
    // addTime()
    // editTime()
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
            onChange={(date) => setStartDate(Date.parse(date))}
            showTimeSelect
            dateFormat="Pp"
          />
          <button
            className="add_date"
            onClick={() => {
              if (editing.edit) {
                editTime(editing.id)
              } else {
                addTime(startDate)
              }
            }}
          >
            {editing.edit ? 'შეცვალე' : 'დამატება'}
          </button>
          <p>{date ? date : null}</p>
          <p className="dates_header_text">თავისუფალი დროები</p>
          <div className="open_dates">
            {!loading ? (
              TIMES.map((val, idx) => {
                return (
                  <div className="date_card" key={val.UID}>
                    <p className="date">{val.FREE_TIME}</p>
                    <button
                      onClick={() =>
                        setEditing({
                          id: val.UID,
                          edit: true,
                        })
                      }
                      className="date_deletion"
                    >
                      შეცვლა
                    </button>
                  </div>
                )
              })
            ) : (
              <p className="isNotData">მონაცემები ვერ მოიძებნა</p>
            )}
          </div>
        </div>
      </div>
    </Loyout>
  )
}
