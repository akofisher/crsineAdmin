import React, { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch } from 'react-redux'
import { API } from '../../API'
import Delete from '../../Img/delete.png'
import Edit from '../../Img/edit.png'
import { setCarTypes, setSubPackets } from '../../Store/CarWash/CarWashActCreat'
import { ExtraServicesOfCar, WashPackages } from '../../data'
import api from '../../useApiCall'
import Loyout from '../Loyout'
import './ExtraServices.css'

export default function ExtraServices() {
  const handleSubmit = () => {}
  const dispatch = useDispatch()
  const [error, setError] = useState('')

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
      dispatch(setSubPackets(responseData.data))
      console.log(responseData.data, 'Sub Packets')
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchSubPackets()
    fetchCarTypes()
  }, [])
  return (
    <Loyout>
      <div className="extra_services_container">
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
        <div className="flexible">
          <div className="extra_services_left_ontainer">
            <p className="dates_header_text">დამატებითი სერვისები</p>
            <div className="booked_dates">
              {ExtraServicesOfCar.map((val, idx) => {
                return (
                  <div className="extra_card" key={idx}>
                    <p className="date">{val.extraName}</p>
                    <p className="date">{val.extraTime}</p>
                    <p className="date">{val.extraPrice}</p>
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
          </div>
          <div className="extra_services_right_ontainer">
            <form onSubmit={() => handleSubmit()} className="contact-form">
              <p className="contact_container_header">განაახლე დეტალები</p>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="userName">
                  სერვისის სახელი
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
                  სერვისის დრო (მაგ: 5min)
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
                  სერვისის ღირებულება (მაგ: $5.99)
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
                შეცვლა
              </button>
            </form>
          </div>
        </div>
      </div>
    </Loyout>
  )
}
