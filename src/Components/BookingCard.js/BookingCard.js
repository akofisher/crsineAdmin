import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../API'
import { getCookie } from '../../Cookies'
import { setSubPackets } from '../../Store/CarWash/CarWashActCreat'
import { selectSubPackets } from '../../Store/CarWash/CarWashSelector'
import {
  ACTIVE_BOOKINGS,
  CANCELED_BOOKINGS,
  CARS_FOR_WASH,
  DONE_BOOKINGS,
  PROCESS_BOOKINGS,
} from '../../routes'
import api from '../../useApiCall'
import './BookingCard.css'

export default function BookingCard({ val }) {
  const ser = [1, 2, 3, 4, 5]
  const token = getCookie('token')
  const uid = getCookie('uid')
  const [error, setError] = useState('')
  const [isData, setIsData] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [startDate, setStartDate] = useState()
  const [editServices, setEditServices] = useState(false)
  const dispatch = useDispatch()
  const SUB_PACKS = useSelector(selectSubPackets)
  const openModal = () => {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  const changeStatus = async (id, status) => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'UpdateOrderStatus',
          controller: 'Admin',
          pars: {
            TOKEN: token,
            ADMIN_ID: uid,
            ORDER_STATUS: status,
            ORDER_ID: id,
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      // dispatch(setSubPackets(responseData.data))
      // localStorage.setItem(responseData, 'DATA')
      console.log(responseData, 'Sub Packets')
      if (responseData.status == 'success') {
        console.log(responseData, 'STATUS CHANGING')
        setIsData(true)
      } else {
        setIsData(false)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const changeOrderTime = async (id) => {
    let time = takeTimeStampForSendStart(startDate)
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'ChangeOrderTime',
          controller: 'Admin',
          pars: {
            TOKEN: token,
            ADMIN_ID: uid,
            ORDER_TIME: time,
            ORDER_ID: id,
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      // dispatch(setSubPackets(responseData.data))
      // localStorage.setItem(responseData, 'DATA')
      console.log(responseData, 'Sub Packets')
      if (responseData.status == 'success') {
        console.log(responseData, 'STATUS CHANGING')

        openModal()
        window.location.reload()
      } else {
        setIsData(false)
      }
    } catch (error) {
      setError(error.message)
    }
  }

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

  const fetchSubPackets = async () => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'GetSubPackets',
          controller: 'Services',
          pars: { TYPE_ID: '1' },
        }),
      }
      const responseData = await api.fetchData(url, options)
      if (responseData.status == 'success') {
        dispatch(setSubPackets(responseData.data))
      } else {
      }

      console.log(responseData.data, 'Sub Packets')
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchSubPackets()
  }, [])

  return (
    <>
      <div className="booking_card">
        {editServices &&
        val.ORDER_STATUS == '0' &&
        window.location.pathname == ACTIVE_BOOKINGS ? (
          <div className="service_edit">
            <div className="edit_header">
              <button
                onClick={() => setEditServices(false)}
                className="cancel_btn"
              >
                დასრულება
              </button>
              <button
                onClick={() => setEditServices(false)}
                className="cancel_btn"
              >
                გაუქმება
              </button>
            </div>
            <div className="edit_main">
              <div className="left_edit">
                <p className="service_container_text">არსებული სერვისები</p>

                {val.SUB_PACKETS.length > 0 ? (
                  val.SUB_PACKETS.map((v, idx) => {
                    return (
                      <div className="extra_card" key={idx}>
                        <p className="date">{v.PACKET_NAME}</p>
                        <p className="date">{v.PACKET_TIME}</p>
                        <p className="date">{v.PACKET_PRICE}$</p>
                        <button onClick={() => null} className="card_btn">
                          წაშლა
                        </button>
                      </div>
                    )
                  })
                ) : (
                  <p className="isNotData">მონაცემები არ მოიძებნა</p>
                )}
              </div>
              <div className="right_edit">
                <p className="service_container_text">სხვა სერვისები</p>
                {SUB_PACKS.length > 0 ? (
                  SUB_PACKS.map((v, idx) => (
                    <div className="extra_card" key={idx}>
                      <p className="date">{v.PACKET_NAME}</p>
                      <p className="date">{v.PACKET_TIME}</p>
                      <p className="date">{v.PACKET_PRICE}$</p>
                      <button onClick={() => null} className="card_btn">
                        დამატება
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="isNotData">მონაცემები არ მოიძებნა</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {window.location.pathname == CANCELED_BOOKINGS ||
            window.location.pathname == DONE_BOOKINGS ? null : window.location
                .pathname == CARS_FOR_WASH ? (
              <div className="bookings_buttons_container">
                <button
                  onClick={() => changeStatus(val.UID, 1)}
                  className="bookings_button_start"
                  type="button"
                >
                  დაწყება
                </button>
                <button
                  onClick={() => changeStatus(val.UID, 2)}
                  className="bookings_button_done"
                  type="button"
                >
                  დასრულება
                </button>
                <button
                  onClick={() => changeStatus(val.UID, 3)}
                  className="bookings_button_cancel"
                  type="button"
                >
                  გაუქმება
                </button>
              </div>
            ) : window.location.pathname == PROCESS_BOOKINGS ? (
              <div className="bookings_buttons_container">
                <button
                  onClick={() => changeStatus(val.UID, 2)}
                  className="bookings_button_done"
                  type="button"
                >
                  დასრულება
                </button>
                <button
                  onClick={() => changeStatus(val.UID, 3)}
                  className="bookings_button_cancel"
                  type="button"
                >
                  გაუქმება
                </button>
              </div>
            ) : window.location.pathname == ACTIVE_BOOKINGS ? (
              <div className="bookings_buttons_container">
                {val.ORDER_STATUS == '1' ? (
                  <button
                    onClick={() => console.log('ok')}
                    className="bookings_button_start"
                    type="button"
                  >
                    დაწყებული
                  </button>
                ) : val.ORDER_STATUS == '2' ? (
                  <button
                    onClick={() => console.log('ok')}
                    className="bookings_button_done"
                    type="button"
                  >
                    დასრულებული
                  </button>
                ) : val.ORDER_STATUS == '3' ? (
                  <button
                    onClick={() => console.log('ok')}
                    className="bookings_button_cancel"
                    type="button"
                  >
                    გაუქმებული
                  </button>
                ) : null}
              </div>
            ) : null}

            <div className="detail_container">
              <p className="detail_name">N -</p>
              <p className="detail">{val.UID}</p>
            </div>
            <div className="detail_container">
              <p className="detail_name">ავტომობილის სახე - </p>
              <p className="detail">{val.TYPE_NAME}</p>
            </div>
            <div className="detail_container">
              <p className="detail_name">პაკეტი - </p>
              <p className="detail">{val.PACKET_NAME}</p>
            </div>
            <div className="services_container">
              <p className="detail_name">დამატებითი სერვისები -</p>
              <div className="detail">
                {' '}
                {val.SUB_PACKETS.map((v, id) => {
                  return (
                    <p className="services" key={id}>
                      {id + 1} - {v.PACKET_NAME}
                    </p>
                  )
                })}
              </div>
              {val.ORDER_STATUS == '0' &&
              window.location.pathname == ACTIVE_BOOKINGS ? (
                <button
                  onClick={() => setEditServices(true)}
                  className="edit_time"
                >
                  რედაქტირება
                </button>
              ) : null}
            </div>
            <div className="detail_container">
              <p className="detail_name">მომხმარებლის სახელი -</p>
              <p className="detail">{val.CUSTOMER_NAME}</p>
            </div>
            <div className="detail_container">
              <p className="detail_name">ელ-ფოსტა -</p>
              <p className="detail">{val.CUSTOMER_EMAIL}</p>
            </div>
            <div className="detail_container">
              <p className="detail_name">მობილური -</p>
              <p className="detail">{val.CUSTOMER_PHONE}</p>
            </div>
            <div className="detail_container">
              <p className="detail_name">ავტომობილის ბრენდი -</p>
              <p className="detail">{val.CAR_PRODUCER}</p>
            </div>
            <div className="detail_container">
              <p className="detail_name">ავტომობილის მოდელი -</p>
              <p className="detail">{val.CAR_MODEL}</p>
            </div>
            <div className="detail_container">
              <p className="detail_name">ჯავშნის შემოსვლა დრო/თარიღი -</p>
              <p className="detail">{val.ORDER_DATE}</p>
            </div>
            <div className="detail_container">
              <p className="detail_name">ჯავშნის შესასრულებელი დრო/თარიღი -</p>
              {val.ORDER_STATUS == '0' &&
              window.location.pathname == ACTIVE_BOOKINGS ? (
                isOpen ? (
                  <>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(Date.parse(date))}
                      showTimeSelect
                      dateFormat="Pp"
                      placeholderText="აირჩიე თარიღი/დრო"
                    />
                    <button
                      onClick={() => {
                        changeOrderTime(val.UID)
                      }}
                      className="edit_time"
                    >
                      დამახსოვრება
                    </button>
                    <button
                      onClick={() => {
                        window.location.reload()
                      }}
                      className="cancel"
                    >
                      გაუქმება
                    </button>
                  </>
                ) : (
                  <>
                    <p className="detail">{val.ORDER_TIME}</p>
                    <button onClick={() => openModal()} className="edit_time">
                      რედაქტირება
                    </button>
                  </>
                )
              ) : (
                <p className="detail">{val.ORDER_TIME}</p>
              )}
            </div>
            <div className="detail_container">
              <p className="detail_name">მომხმარებლის მისამართი -</p>
              <p className="detail">{val.CUSTOMER_ADDRESS}</p>
            </div>
            <div className="detail_container">
              <p className="detail_name">მომხმარებლის კომენტარი -</p>
              <p className="detail">{val.ORDER_COMMENT}</p>
            </div>
            <div className="detail_container">
              <p className="detail_name">ჯამური ღირებულება -</p>
              <p className="detail">${val.ORDER_TOTAL}</p>
            </div>
          </>
        )}
      </div>
    </>
  )
}
