import React, { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch } from 'react-redux'
import { API } from '../../API'
import { getCookie } from '../../Cookies'
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
  const [subPacks, setSubPacks] = useState('')
  const [editPrice, setEditPrice] = useState(val.ORDER_TOTAL)
  const [done, setDone] = useState({
    id: '',
    uid: '',
    doneOrNo: false,
  })
  const dispatch = useDispatch()
  const openModal = () => {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  const elementRefs = useRef([]);

  const handleDelete = (index) => {
    if (elementRefs.current[index]) {
      elementRefs.current[index].remove();
    }
  };

  const addElementRef = (element) => {
    if (element && !elementRefs.current.includes(element)) {
      elementRefs.current.push(element);
    }
  };


  const elementRefsNew = useRef([]);

  const handleDeleteNew = (index) => {
    if (elementRefsNew.current[index]) {
      elementRefsNew.current[index].remove();
    }
  };

  const addNewElementRef = (element) => {
    if (element && !elementRefsNew.current.includes(element)) {
      elementRefsNew.current.push(element);
    }
  };


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


      if (responseData.status == 'success') {

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

      if (responseData.status == 'success') {
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
          pars: { TYPE_ID: val.CAR_TYPE_ID },
        }),
      }
      const responseData = await api.fetchData(url, options)
      if (responseData.status == 'success') {
        setSubPacks(responseData.data)
      } else {
      }

    } catch (error) {
      setError(error.message)
    }
  }
  const AddSubPacketToOrder = async (ord, serd, oldP, newP) => {
    setEditPrice(Number(editPrice) + Number(newP))

    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'AddSubPacketToOrder',
          controller: 'Admin',
          pars: {
            ORDER_ID: ord,
            SERVICE_ID: serd,
            TOKEN: token,
            ADMIN_ID: uid,
            NEW_PRICE: Number(oldP) + Number(newP),
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      if (responseData.status == 'success') {
        setDone({
          id: serd,
          uid: ord,
          doneOrNo: true,
        })
      } else {
      }


    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {

  }, [editPrice])



  const DeleteSubPacketFromOrder = async (ord, serd, oldP, newP) => {
    setEditPrice(Number(editPrice) - Number(newP))

    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'RemSubPacketFromOrder',
          controller: 'Admin',
          pars: {
            ORDER_ID: ord,
            SERVICE_ID: serd,
            TOKEN: token,
            ADMIN_ID: uid,
            NEW_PRICE: Number(editPrice) - Number(newP),
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      if (responseData.status == 'success') {
        setDone({
          id: serd,
          uid: ord,
          doneOrNo: true,
        })
      } else {
      }


    } catch (error) {
      setError(error.message)
    }
  }


  const filteredSubPacks = subPacks.length > 0 ? subPacks.filter((subPack) => {
    return !val.SUB_PACKETS.some((valSubPack) => valSubPack.PACKET_NAME === subPack.PACKET_NAME);
  })
    : ''





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
                უკან დაბრუნება
              </button>
              <button
                onClick={() => window.location.reload()}
                className="cancel_btn"
              >
                დასრულება
              </button>
            </div>
            <div className="edit_main">
              <div className="left_edit">
                <p className="service_container_text">არსებული სერვისები</p>

                {val.SUB_PACKETS.length > 0 ? (
                  val.SUB_PACKETS.map((v, idx) => {
                    return (
                      <div ref={addElementRef} className="extra_card" key={idx}>
                        <p className="date">{v.PACKET_NAME}</p>
                        <p className="date">{v.PACKET_TIME}</p>
                        <p className="date">{v.PACKET_PRICE}$</p>
                        {done.id == v.UID && done.doneOrNo == true && done.uid == val.UID ? (
                          <button onClick={() => {
                          }} className="card_btn_done">
                            წაიშალა
                          </button>
                        ) : (
                          <button onClick={async () => {
                            await DeleteSubPacketFromOrder(val.UID, v.UID, val.ORDER_TOTAL, v.PACKET_PRICE)
                            handleDelete(idx)
                          }} className="card_btn">
                            წაშლა
                          </button>
                        )}

                      </div>
                    )
                  })
                ) : (
                  <p className="isNotData">მონაცემები არ მოიძებნა</p>
                )}
              </div>
              <div className="right_edit">
                <p className="service_container_text">სხვა სერვისები</p>
                {filteredSubPacks.length > 0 ? (
                  filteredSubPacks.map((v, idx) => (
                    <div ref={addNewElementRef} className="extra_card" key={idx}>
                      <p className="date">{v.PACKET_NAME}</p>
                      <p className="date">{v.PACKET_TIME}</p>
                      <p className="date">{v.PACKET_PRICE}$</p>
                      {done.id == v.UID && done.doneOrNo == true && done.uid == val.UID ? (
                        <button onClick={() => {
                        }} className="card_btn_done">
                          დაემატა
                        </button>
                      ) : (
                        <button onClick={async () => {
                          await AddSubPacketToOrder(val.UID, v.UID, val.ORDER_TOTAL, v.PACKET_PRICE)
                          handleDeleteNew(idx)
                        }} className="card_btn">
                          დამატება
                        </button>
                      )}

                    </div>
                  ))
                ) : (
                  <p className="isNotData">მონაცემები არ მოიძებნა</p>
                )}
              </div>
            </div>
            <p className='editPrice'>{editPrice}$</p>
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

                    className="bookings_button_start"
                    type="button"
                  >
                    დაწყებული
                  </button>
                ) : val.ORDER_STATUS == '2' ? (
                  <button

                    className="bookings_button_done"
                    type="button"
                  >
                    დასრულებული
                  </button>
                ) : val.ORDER_STATUS == '3' ? (
                  <button

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
