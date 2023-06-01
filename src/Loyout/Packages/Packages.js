import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { API } from '../../API'
import { getCookie } from '../../Cookies'
import Delete from '../../Img/delete.png'
import Edit from '../../Img/edit.png'
import { setCarTypes, setPackets } from '../../Store/CarWash/CarWashActCreat'
import { CarPackages, WashPackages } from '../../data'
import api from '../../useApiCall'
import Loyout from '../Loyout'
import './Packages.css'

export default function Packages() {
  const handleSubmit = () => {}
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const token = getCookie('token')
  const uid = getCookie('uid')

  const fetchCarTypes = async () => {
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
          // pars: { TYPE_ID: '1' },
        }),
      }
      const responseData = await api.fetchData(url, options)
      dispatch(setCarTypes(responseData.data))
      console.log(responseData.data, 'Car Types')
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
            TYPE_ID: 1,
            PACKET_NAME: 'test',
            PACKET_PRICE: 20,
            PACKET_TIME: 60,
            TOKEN: token,
            ADMIN_ID: uid,
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      // dispatch(setPackets(responseData.data))
      if (responseData.statu == 'success') {
        console.log(responseData, 'Add Packets')
      } else {
        console.log(responseData, 'Add Packets')
      }
    } catch (error) {
      setError(error.message)
      console.log(error.message)
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
            TYPE_ID: 1,
            PACKET_NAME: 'test',
            PACKET_PRICE: 20,
            PACKET_TIME: 60,
            PACKET_ID: 1,
            TOKEN: token,
            ADMIN_ID: uid,
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      // dispatch(setPackets(responseData.data))
      if (responseData.status == 'success') {
        console.log(responseData, 'Edit Packets')
      } else {
        console.log(responseData, 'Edit Packets')
      }
    } catch (error) {
      setError(error.message)
      console.log(error.message)
    }
  }
  const fetchPackets = async () => {
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
          pars: { TYPE_ID: '1' },
        }),
      }
      const responseData = await api.fetchData(url, options)
      dispatch(setPackets(responseData.data))
      console.log(responseData.data, 'Packets')
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchPackets()
    fetchCarTypes()
    addPackets()
    editPackets()
  }, [])
  return (
    <Loyout>
      <div className="page_container">
        <div className="packages_main_container">
          <label className="dates_header_text" htmlFor="categories">
            აირჩიეთ კატეგორია
          </label>
          <select className="carSelect" name="packages" id="packages">
            {WashPackages.map((val, idx) => {
              return (
                <option className="carOption" key={idx} value={`${val}`}>
                  {val}
                </option>
              )
            })}
          </select>
          <div className="packages_container">
            {CarPackages.map((val, idx) => {
              return (
                <div key={idx} className="package_card">
                  <p className="packages_name">{val.packageName}</p>
                  <p className="packages_price">{val.packagePrice}</p>
                  <p className="packages_time">{val.packageTime}</p>
                  <img
                    src={Delete}
                    alt="delete"
                    className="delete_btn"
                    title="წაშლა"
                  />
                  <img
                    src={Edit}
                    alt="delete"
                    className="edit_btn"
                    title="რედაქტირება"
                  />
                </div>
              )
            })}
          </div>
          <div className="packages_add_container">
            <label className="dates_header_text" htmlFor="categories">
              პაკეტი - {CarPackages[0].packageName}
            </label>
            <form onSubmit={() => handleSubmit()} className="packages-form">
              <div className="contact-inp-cont">
                <label className="label" htmlFor="userName">
                  ჩაწერეთ პაკეტის სახელი
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={(val) => console.log()}
                  variant="outlined"
                  label="მომხმარებელი"
                  className="user-input"
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="userName">
                  ჩაწერეთ პაკეტის ფასი
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={(val) => console.log()}
                  variant="outlined"
                  label="მომხმარებელი"
                  className="user-input"
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="password">
                  ჩაწერეთ პაკეტი დრო (მაგ: 20min)
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={(val) => console.log()}
                  variant="outlined"
                  label="მომხმარებელი"
                  className="user-input"
                />
              </div>

              <button className="submit-btn" type="submit">
                დამატება
              </button>
            </form>
          </div>
        </div>
      </div>
    </Loyout>
  )
}
