import { default as React, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../API'
import BookingCard from '../../Components/BookingCard.js/BookingCard'
import { getCookie } from '../../Cookies'
import { setBookings } from '../../Store/CarWash/CarWashActCreat'
import { selectBookings } from '../../Store/CarWash/CarWashSelector'
import api from '../../useApiCall'
import Booking from '../Bookings/Booking'
import './CarsForWash.css'

export default function CarsForWash() {
  const token = getCookie('token')
  const uid = getCookie('uid')
  const [error, setError] = useState('')
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())
  const [isData, setIsData] = useState(false)
  const dispatch = useDispatch()
  const BOOKINGS = useSelector(selectBookings)
  // const [startDaten, setStartDate] = useState(false)
  // const [endDaten, setEndDate] = useState(false)

  // const handleStartDateChange = (date) => {
  //   const starttimestamp = date ? date.getTime() : null
  //   const subStartDate = JSON.stringify(starttimestamp).substring(0, 10)
  //   // setStartDate(subStartDate)
  //   takeStartDate(subStartDate)
  //   // console.log(startDaten, 'STARTEEE')
  // }

  // const handleEndDateChange = (date) => {
  //   const endtimestamp = date ? date.getTime() : null
  //   const subEndDate = JSON.stringify(endtimestamp).substring(0, 10)
  //   // setEndDate(subEndDate)
  //   takeEndDate(subEndDate)
  //   // console.log(endDaten, 'ENDDDDDD')
  // }

  // const takeStartDate = (val) => {
  //   setStart(val)
  //   const date = new Date(Number(val))
  //   const year = date.getFullYear()
  //   const month = date.getMonth()
  //   const day = date.getDate()
  //   console.log(year)
  //   takeTimeStampForSendStart(year, month, day)
  // }
  // const takeEndDate = (val) => {
  //   setEnd(val)
  //   const date = new Date(Number(val))
  //   const year = date.getFullYear()
  //   const month = date.getMonth()
  //   const day = date.getDate()
  //   takeTimeStampForSendEnd(year, month, day)
  // }

  // const timeStampToShowingName = (val) => {
  //   const date = new Date(val)
  //   const formattedDate = new Intl.DateTimeFormat('en', {
  //     day: 'numeric',
  //     month: 'short',
  //     hour: 'numeric',
  //     minute: 'numeric',
  //   }).format(date)

  //   console.log(formattedDate)
  // }

  const takeTimeStampForSendStart = (val) => {
    const currentDate = new Date(val)

    const yr = currentDate.getFullYear()
    const mh = currentDate.getMonth()
    const dy = currentDate.getDate()
    let year = yr
    let month = mh
    let day = dy

    let startDate = new Date(year, month, day, 0, 0, 1)

    let startUnixTimestamp = Math.floor(startDate.getTime() / 1000)
    // setStartDate(startUnixTimestamp)
    console.log(startUnixTimestamp, 'START NEW')
    return startUnixTimestamp
  }

  const takeTimeStampForSendEnd = (val) => {
    const currentDate = new Date(val)

    const yr = currentDate.getFullYear()
    const mh = currentDate.getMonth()
    const dy = currentDate.getDate()
    let year = yr
    let month = mh
    let day = dy

    let endDate = new Date(year, month, day, 23, 59, 59)

    let endUnixTimestamp = Math.floor(endDate.getTime() / 1000)
    // setEndDate(endUnixTimestamp)
    console.log(endUnixTimestamp, 'END NEW')
    return endUnixTimestamp
  }

  const getOrder = async () => {
    let st = takeTimeStampForSendStart(start)
    let en = takeTimeStampForSendEnd(end)

    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'GetOrderListByStatus',
          controller: 'Admin',
          pars: {
            TOKEN: token,
            ADMIN_ID: uid,
            START_DATE: st,
            END_DATE: en,
            ORDER_STATUS: 0,
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      // dispatch(setSubPackets(responseData.data))
      // localStorage.setItem(responseData, 'DATA')
      console.log(responseData, 'Sub Packets')
      if (responseData.status == 'success') {
        console.log(responseData, 'DATA')
        dispatch(setBookings(responseData.data))
        setIsData(true)
      } else {
        setIsData(false)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    getOrder()
  }, [])

  return (
    <Booking>
      <div className="page_container">
        <div className="time_picker_container">
          <div className="date_row">
            <DatePicker
              selected={start}
              onChange={(val) => {
                setStart(Date.parse(val))
              }}
              dateFormat="dd/MM/yyyy"
            />
            <p className="date_text">-დან</p>
          </div>
          <div className="date_row">
            <DatePicker
              selected={end}
              onChange={(val) => {
                setEnd(Date.parse(val))
              }}
              dateFormat="dd/MM/yyyy"
            />
            <p className="date_text">-მდე</p>
          </div>
          <button className="filtre_btn" onClick={() => getOrder()}>
            გაფილტრე
          </button>
        </div>
        {isData ? (
          BOOKINGS.map((val, idx) => {
            return <BookingCard val={val} key={idx} />
          })
        ) : (
          <p className="isNotData">მონაცემები არ მოიძებნა</p>
        )}
      </div>
    </Booking>
  )
}
