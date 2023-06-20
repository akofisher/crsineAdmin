import React, { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../API'
import { getCookie } from '../../Cookies'
import Edit from '../../Img/edit.png'
import { setCarTypes, setSubPackets } from '../../Store/CarWash/CarWashActCreat'
import {
  selectCarTypes,
  selectSubPackets,
} from '../../Store/CarWash/CarWashSelector'
import api from '../../useApiCall'
import Loyout from '../Loyout'
import './ExtraServices.css'

export default function ExtraServices() {
  const handleSubmit = () => {}
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  let token = getCookie('token')
  let uid = getCookie('uid')
  const CARTYPES = useSelector(selectCarTypes)
  const SUBPACKETS = useSelector(selectSubPackets)
  const [type, setType] = useState(1)
  const [loading, setLoading] = useState(true)
  const [packetName, setPacketName] = useState('')
  const [packetPrice, setPacketPrice] = useState('')
  const [packetTime, setPacketTime] = useState('')
  const [editable, setEditable] = useState({
    edit: false,
    editName: '',
    editTime: '',
    editPrice: '',
    editId: '',
  })
  const fetchCarTypes = async () => {
    setLoading(true)
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'GetCarTypes',
          controller: 'Services',
          pars: '',
        }),
      }
      const responseData = await api.fetchData(url, options)
      if (responseData.status == 'success') {
        dispatch(setCarTypes(responseData.data))
        setLoading(false)
      } else {
        setLoading(true)
      }

      console.log(responseData.data, 'Car Types')
    } catch (error) {
      setError(error.message)
    }
  }
  useEffect(() => {
    fetchCarTypes()
  }, [])

  const fetchSubPackets = async () => {
    setLoading(true)
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
          pars: { TYPE_ID: type },
        }),
      }
      const responseData = await api.fetchData(url, options)
      if (responseData.status == 'success') {
        dispatch(setSubPackets(responseData.data))
        setLoading(false)
      } else {
        setLoading(true)
      }

      console.log(responseData.data, 'Sub Packets')
    } catch (error) {
      setError(error.message)
    }
  }
  const addSubPackets = async () => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'AddSubPacket',
          controller: 'Admin',
          pars: {
            TYPE_ID: type,
            PACKET_NAME: packetName,
            PACKET_PRICE: packetPrice,
            PACKET_TIME: packetTime,
            TOKEN: token,
            ADMIN_ID: uid,
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      // dispatch(setPackets(responseData.data))
      if (responseData.status == 'success') {
        window.location.reload()
      } else {
      }
    } catch (error) {
      setError(error.message)
      console.log(error.message)
    }
  }
  const editSubPackets = async () => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'EditSubPacket',
          controller: 'Admin',
          pars: {
            TYPE_ID: type,
            PACKET_NAME: packetName,
            PACKET_PRICE: packetPrice,
            PACKET_TIME: packetTime,
            PACKET_ID: editable.editId,
            TOKEN: token,
            ADMIN_ID: uid,
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      // dispatch(setPackets(responseData.data))
      if (responseData.status == 'success') {
        console.log(responseData, 'RESP ON EDIT')
        setEditable({
          edit: false,
          editName: '',
          editTime: '',
          editPrice: '',
          editId: '',
        })
        window.location.reload()
      } else {
        setEditable({
          edit: true,
          editName: '',
          editTime: '',
          editPrice: '',
          editId: '',
        })
      }
    } catch (error) {
      setError(error.message)
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchSubPackets()
  }, [type])
  return (
    <Loyout>
      <div className="extra_services_container">
        <label className="dates_header_text" htmlFor="categories">
          აირჩიეთ კატეგორია
        </label>
        <select
          onChange={(val) => setType(val.target.value)}
          className="carSelect"
          name="packages"
          id="packages"
        >
          {CARTYPES.map((val, idx) => {
            return (
              <option className="carOption" key={idx} value={`${val.UID}`}>
                {val.TYPE_NAME}
              </option>
            )
          })}
        </select>
        <div className="flexible">
          <div className="extra_services_left_ontainer">
            <p className="dates_header_text">დამატებითი სერვისები</p>
            <div className="booked_dates">
              {!loading ? (
                SUBPACKETS.map((val, idx) => {
                  return (
                    <div className="extra_card" key={idx}>
                      <p className="date">{val.PACKET_NAME}</p>
                      <p className="date">{val.PACKET_TIME}</p>
                      <p className="date">{val.PACKET_PRICE}$</p>

                      <img
                        src={Edit}
                        alt="delete"
                        className="edit_btn"
                        title="რედაქტირება"
                        onClick={() =>
                          setEditable({
                            edit: true,
                            editName: val.PACKET_NAME,
                            editTime: val.PACKET_TIME,
                            editPrice: val.PACKET_PRICE,
                            editId: val.UID,
                          })
                        }
                      />
                    </div>
                  )
                })
              ) : (
                <p className="isNotData">მონაცემები არ მოიძებნა</p>
              )}
            </div>
          </div>
          <div className="extra_services_right_ontainer">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (editable.edit) {
                  editSubPackets()
                } else {
                  addSubPackets()
                }
              }}
              className="contact-form"
            >
              <p className="contact_container_header">განაახლე დეტალები</p>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="userName">
                  სერვისის სახელი {editable.edit ? editable.editName : null}
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={(val) => setPacketName(val.target.value)}
                  variant="outlined"
                  label="მომხმარებელი"
                  className="user-input"
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="password">
                  სერვისის დრო {editable.edit ? editable.editTime : null}
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={(val) => setPacketTime(val.target.value)}
                  variant="outlined"
                  label="მომხმარებელი"
                  className="user-input"
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="password">
                  სერვისის ღირებულება{' '}
                  {editable.edit ? editable.editPrice : null}
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={(val) => setPacketPrice(val.target.value)}
                  variant="outlined"
                  label="მომხმარებელი"
                  className="user-input"
                />
              </div>

              <div className="flex_btns">
                <button className="submit-btn" type="submit">
                  {editable.edit ? 'შეცვლა' : 'დამატება'}
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => window.location.reload()}
                >
                  გაუქმება
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Loyout>
  )
}
