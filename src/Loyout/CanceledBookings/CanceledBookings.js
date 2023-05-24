import React from 'react'
import { BookingsData } from '../../data'
import Booking from '../Bookings/Booking'

export default function CanceledBookings() {
  const arr = BookingsData
  const mappedArray = arr.map((num, index) => ({ num, index }))
  mappedArray.sort((a, b) => b.index - a.index)
  const sortedArray = mappedArray.map((item) => item.num)
  return (
    <Booking>
      {sortedArray.map((val, idx) => {
        return (
          <div className="booking_card">
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
                    <p className="services">
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
