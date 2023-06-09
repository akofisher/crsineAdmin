import React, { useEffect, useState } from 'react'
import { API } from '../../API'
import { getCookie } from '../../Cookies'
import { BookingsData } from '../../data'
import api from '../../useApiCall'
import Booking from '../Bookings/Booking'
import DatePicker from 'react-datepicker'

export default function ActiveBookings() {
  const arr = BookingsData
  const mappedArray = arr.map((num, index) => ({ num, index }))
  mappedArray.sort((a, b) => b.index - a.index)
  const sortedArray = mappedArray.map((item) => item.num)
  const token = getCookie('token')
  const uid = getCookie('uid')
  const [error, setError] = useState('')
  const [startDaten, setStartDate] = useState(new Date())





  // const currentTime = new Date();
  // const hours = currentTime.getHours().toString().padStart(2, '0');
  // const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  // const seconds = currentTime.getSeconds().toString().padStart(2, '0');
  // const formattedTime = `${hours}:${minutes}:${seconds}`;

  // const timestamp = currentTime.getTime();

  // console.log(timestamp, formattedTime);
  // Specify the date for which you want to get Unix timestamps
  var year = 2023;
  var month = 5; // Note: months are zero-based, so 5 represents June
  var day = 9;

  // Create two Date objects for the specified date
  var startDate = new Date(year, month, day, 0, 0, 1);
  var endDate = new Date(year, month, day, 23, 59, 59);

  // Get the Unix timestamps in seconds
  var startUnixTimestamp = Math.floor(startDate.getTime() / 1000);
  var endUnixTimestamp = Math.floor(endDate.getTime() / 1000);

  console.log(startUnixTimestamp, 'START');
  console.log(endUnixTimestamp, 'END');

  const getOrder = async () => {
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
            START_DATE: startUnixTimestamp,
            END_DATE: endUnixTimestamp
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
    getOrder()
  }, [])

  useEffect(() => {
    console.log(startDaten, 'DTAE')
  }, [startDaten])


  return (
    <Booking>
      <DatePicker
        selected={startDaten}
        onChange={(date) => setStartDate(date)}
        dateFormat="yyyy/MM/dd"
      />
      {sortedArray.map((val, idx) => {
        return (
          <div className="booking_card" key={idx}>
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
    </Booking>
  )
}
