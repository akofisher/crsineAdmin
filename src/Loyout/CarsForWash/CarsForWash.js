import { default as React, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { API } from '../../API'
import { getCookie } from '../../Cookies'
import { BookingsData } from '../../data'
import { CARS_FOR_WASH } from '../../routes'
import api from '../../useApiCall'
import Loyout from '../Loyout'
import './CarsForWash.css'

export default function CarsForWash() {
  const arr = BookingsData
  const mappedArray = arr.map((num, index) => ({ num, index }))
  mappedArray.sort((a, b) => b.index - a.index)
  const sortedArray = mappedArray.map((item) => item.num)
  const token = getCookie('token')
  const uid = getCookie('uid')
  const [error, setError] = useState('')
  const [startDaten, setStartDate] = useState(new Date())
  const [endDaten, setEndDate] = useState(new Date())
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())

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

  const takeStartDate = (val) => {
    setStart(val)
    const date = new Date(Number(val))
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    console.log(year)
    takeTimeStampForSendStart(year, month, day)
  }
  const takeEndDate = (val) => {
    setEnd(val)
    const date = new Date(Number(val))
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    takeTimeStampForSendEnd(year, month, day)
  }

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

  const takeTimeStampForSendStart = async (y = '', m = '', d = '') => {
    const currentDate = new Date()

    const yr = currentDate.getFullYear()
    const mh = currentDate.getMonth()
    const dy = currentDate.getDate()
    let year = y == '' ? yr : y
    let month = m == '' ? mh : y
    let day = d == '' ? dy : d

    let startDate = new Date(year, month, day, 0, 0, 1)

    let startUnixTimestamp = Math.floor(startDate.getTime() / 1000)

    setStartDate(startUnixTimestamp)
  }

  const takeTimeStampForSendEnd = async (y = '', m = '', d = '') => {
    const currentDate = new Date()

    const yr = currentDate.getFullYear()
    const mh = currentDate.getMonth()
    const dy = currentDate.getDate()
    let year = y == '' ? yr : y
    let month = m == '' ? mh : y
    let day = d == '' ? dy : d

    let endDate = new Date(year, month, day, 23, 59, 59)

    let endUnixTimestamp = Math.floor(endDate.getTime() / 1000)
    setEndDate(endUnixTimestamp)
    await getOrder(startDaten, endDaten)
  }

  const getOrder = async (st, nd) => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'GetOrderList',
          controller: 'Admin',
          pars: {
            TOKEN: token,
            ADMIN_ID: uid,
            START_DATE: st,
            END_DATE: nd,
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      // dispatch(setSubPackets(responseData.data))
      // localStorage.setItem(responseData, 'DATA')
      console.log(responseData, 'Sub Packets')
      if (responseData.status == 'success') {
        console.log(responseData, 'DATA')
      } else {
        alert('მონაცემები არასწორია')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    console.log(startDaten, 'START')
    console.log(endDaten, 'END')
  }, [startDaten, endDaten])

  useEffect(() => {
    takeTimeStampForSendStart()
    takeTimeStampForSendEnd()
  }, [])

  return (
    <Loyout>
      <div className="page_container">
        <div className="time_picker_container">
          <div className="date_row">
            <DatePicker
              selected={start}
              onChange={(val) => takeStartDate(val)}
              dateFormat="dd/MM/yyyy"
            />
            <p className="date_text">-დან</p>
          </div>
          <div className="date_row">
            <DatePicker
              selected={end}
              onChange={(val) => takeEndDate(val)}
              dateFormat="dd/MM/yyyy"
            />
            <p className="date_text">-მდე</p>
          </div>
        </div>
        {sortedArray.map((val, idx) => {
          return (
            <div className="booking_card" key={idx}>
              {window.location.pathname == CARS_FOR_WASH ? null : (
                <div className="bookings_buttons_container">
                  <button
                    onClick={() => console.log('ok')}
                    className="bookings_button_start"
                    type="button"
                  >
                    დაწყება
                  </button>
                  <button
                    onClick={() => console.log('ok')}
                    className="bookings_button_done"
                    type="button"
                  >
                    დასრულება
                  </button>
                  <button
                    onClick={() => console.log('ok')}
                    className="bookings_button_cancel"
                    type="button"
                  >
                    გაუქმება
                  </button>
                </div>
              )}

              <div className="detail_container">
                <p className="detail_name">N -</p>
                <p className="detail">{val.id}</p>
              </div>
              <div className="detail_container">
                <p className="detail_name">ავტომობილის სახე - </p>
                <p className="detail">{val.car}</p>
              </div>
              <div className="detail_container">
                <p className="detail_name">პაკეტი - </p>
                <p className="detail">{val.package}</p>
              </div>
              <div className="services_container">
                <p className="detail_name">დამატებითი სერვისები -</p>
                <div className="detail">
                  {' '}
                  {val.extraService.map((val, idx) => {
                    return (
                      <p className="services" key={idx}>
                        {idx + 1} - {val}
                      </p>
                    )
                  })}
                </div>
              </div>
              <div className="detail_container">
                <p className="detail_name">მომხმარებლის სახელი -</p>
                <p className="detail">{val.customerName}</p>
              </div>
              <div className="detail_container">
                <p className="detail_name">ელ-ფოსტა -</p>
                <p className="detail">{val.customerEmail}</p>
              </div>
              <div className="detail_container">
                <p className="detail_name">მობილური -</p>
                <p className="detail">{val.customerMobile}</p>
              </div>
              <div className="detail_container">
                <p className="detail_name">ავტომობილის ბრენდი -</p>
                <p className="detail">{val.carBrand}</p>
              </div>
              <div className="detail_container">
                <p className="detail_name">ავტომობილის მოდელი -</p>
                <p className="detail">{val.carModel}</p>
              </div>
              <div className="detail_container">
                <p className="detail_name">ჯავშნის დრო/თარიღი -</p>
                <p className="detail">{val.bookingDate}</p>
              </div>
              <div className="detail_container">
                <p className="detail_name">მომხმარებლის მისამართი -</p>
                <p className="detail">{val.customerAddress}</p>
              </div>
              <div className="detail_container">
                <p className="detail_name">მომხმარებლის კომენტარი -</p>
                <p className="detail">{val.customerMessage}</p>
              </div>
              <div className="detail_container">
                <p className="detail_name">ჯამური ღირებულება -</p>
                <p className="detail">{val.totalPrice}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Loyout>
  )
}