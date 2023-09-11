import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../API'
import { getCookie } from '../../Cookies'
import Delete from '../../Img/delete.png'
import Edit from '../../Img/edit.png'
import { setCarTypes, setPackets } from '../../Store/CarWash/CarWashActCreat'
import {
  selectCarTypes,
  selectPackets,
} from '../../Store/CarWash/CarWashSelector'
import api from '../../useApiCall'
import Loyout from '../Loyout'
import './Packages.css'

export default function Packages() {
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const token = getCookie('token')
  const uid = getCookie('uid')
  const CARTYPES = useSelector(selectCarTypes)
  const PACKETS = useSelector(selectPackets)
  const [type, setType] = useState('1')
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
    editPack1: '__',
    editPack2: '__',
    editPack3: '__',
    editPack4: '__',
  })
  const [pack1, setPack1] = useState('__')
  const [pack2, setPack2] = useState('__')
  const [pack3, setPack3] = useState('__')
  const [pack4, setPack4] = useState('__')

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

    } catch (error) {
      setError(error.message)
    }
  }

  const deletePackets = async (id) => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'DeletePacket',
          controller: 'Admin',
          pars: {
            PACKET_ID: id,
            TOKEN: token,
            ADMIN_ID: uid,
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      if (responseData.status == 'success') {
        window.location.reload()
      } else {
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const addPackets = async () => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'AddPacket',
          controller: 'Admin',
          pars: {
            TYPE_ID: type,
            PACKET_NAME: packetName,
            PACKET_PRICE: packetPrice,
            PACKET_TIME: packetTime,
            TOKEN: token,
            ADMIN_ID: uid,
            PACK1: pack1,
            PACK2: pack2,
            PACK3: pack3,
            PACK4: pack4,
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
    }
  }
  const editPackets = async () => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'EditPacket',
          controller: 'Admin',
          pars: {
            TYPE_ID: type,
            PACKET_NAME: packetName,
            PACKET_PRICE: packetPrice,
            PACKET_TIME: packetTime,
            PACKET_ID: editable.editId,
            TOKEN: token,
            ADMIN_ID: uid,
            PACK1: pack1,
            PACK2: pack2,
            PACK3: pack3,
            PACK4: pack4,
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      // dispatch(setPackets(responseData.data))
      if (responseData.status == 'success') {
        setEditable({
          edit: false,
          editName: '',
          editTime: '',
          editPrice: '',
          editId: '',
          editPack1: '__',
          editPack2: '__',
          editPack3: '__',
          editPack4: '__',
        })
        window.location.reload()
      } else {
        setEditable({
          edit: true,
          editName: '',
          editTime: '',
          editPrice: '',
          editId: '',
          editPack1: '__',
          editPack2: '__',
          editPack3: '__',
          editPack4: '__',
        })
      }
    } catch (error) {
      setError(error.message)
    }
  }
  const fetchPackets = async () => {
    setLoading(true)
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'GetPackets',
          controller: 'Services',
          pars: { TYPE_ID: type },
        }),
      }
      const responseData = await api.fetchData(url, options)
      if (responseData.status == 'success') {
        dispatch(setPackets(responseData.data))
        setLoading(false)
      } else {
        setLoading(true)
      }

    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchPackets()
  }, [type])

  useEffect(() => {
    // fetchPackets()
    fetchCarTypes()
    // addPackets()
    // editPackets()
  }, [])
  return (
    <Loyout>
      <div className="page_container">
        <div className="packages_main_container">
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
          <div className="packages_container">
            {!loading ? (
              PACKETS.map((val, idx) => {
                return (
                  <div key={idx} className="package_card">
                    <p className="packages_name">{val.PACKET_NAME}</p>
                    <p className="packages_price">{val.PACKET_PRICE}$</p>
                    <p className="packages_time">{val.PACKET_TIME} min</p>
                    <img
                      src={Delete}
                      alt="delete"
                      className="delete_btn"
                      title="წაშლა"
                      onClick={() => deletePackets(val.UID)}
                    />
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
                          editPack1: val.PACK1,
                          editPack2: val.PACK2,
                          editPack3: val.PACK3,
                          editPack4: val.PACK4,
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
          <div className="packages_add_container">
            {/* <label className="dates_header_text" htmlFor="categories">
              პაკეტი - {CarPackages[0].packageName}
            </label> */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (editable.edit) {
                  editPackets()
                } else {
                  addPackets()
                }
              }}
              className="packages-form"
            >
              <div className="contact-inp-cont">
                <label className="label" htmlFor="userName">
                  ჩაწერეთ პაკეტის სახელი{' '}
                  {editable.edit ? editable.editName : null}
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={(val) => setPacketName(val.target.value)}
                  variant="outlined"
                  label="მომხმარებელი"
                  className="user-input"
                  required
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="userName">
                  ჩაწერეთ პაკეტის ფასი{' '}
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
                  required
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="password">
                  ჩაწერეთ პაკეტის დრო {editable.edit ? editable.editTime : null}
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={(val) => setPacketTime(val.target.value)}
                  variant="outlined"
                  label="მომხმარებელი"
                  className="user-input"
                  required
                />
              </div>


              {/* //პაკეტი რას მოიცავს */}


              <div className="contact-inp-cont">
                <label className="label" htmlFor="pack1">
                  რას მოიცავს პაკეტი N1 {editable.edit ? editable.editPack1 : null}
                </label>
                <input
                  id="pack1"
                  name="pack1"
                  type="text"
                  onChange={(val) => setPack1(val.target.value)}
                  variant="outlined"
                  label="pack1"
                  className="user-input"
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="pack2">
                  რას მოიცავს პაკეტი N2 {editable.edit ? editable.editPack2 : null}
                </label>
                <input
                  id="pack2"
                  name="pack2"
                  type="text"
                  onChange={(val) => setPack2(val.target.value)}
                  variant="outlined"
                  label="pack2"
                  className="user-input"
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="pack3">
                  რას მოიცავს პაკეტი N3 {editable.edit ? editable.editPack3 : null}
                </label>
                <input
                  id="pack3"
                  name="pack3"
                  type="text"
                  onChange={(val) => setPack3(val.target.value)}
                  variant="outlined"
                  label="pack3"
                  className="user-input"
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="pack4">
                  რას მოიცავს პაკეტი N4 {editable.edit ? editable.editPack4 : null}
                </label>
                <input
                  id="pack4"
                  name="pack4"
                  type="text"
                  onChange={(val) => setPack4(val.target.value)}
                  variant="outlined"
                  label="pack4"
                  className="user-input"
                />
              </div>

              {/* //პაკეტი რას მოიცავს */}


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
