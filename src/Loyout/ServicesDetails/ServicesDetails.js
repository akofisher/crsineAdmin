import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { API } from '../../API'
import Delete from '../../Img/delete.png'
import Edit from '../../Img/edit.png'
import SomePhoto from '../../Img/restLogo.jpg'
import { setServices } from '../../Store/CarWash/CarWashActCreat'
import { serviceDetails } from '../../data'
import api from '../../useApiCall'
import Loyout from '../Loyout'
import './ServicesDetails.css'

export default function ServicesDetails() {
  const handleSubmit = () => {}
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  const fetchServiceList = async () => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'GetServiceList',
          controller: 'Services',
        }),
      }
      const responseData = await api.fetchData(url, options)
      dispatch(setServices(responseData.data))
      console.log(responseData.data, 'Services')
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchServiceList()
  }, [])
  return (
    <Loyout>
      <div className="page_container">
        <div className="contact_main_container">
          <div className="news_left_container">
            <p className="news_container_header">არსებული დეტალები</p>
            <div className="existing_details">
              {serviceDetails.map((val, idx) => {
                return (
                  <div className="News_card" key={idx}>
                    <div className="news_img_container">
                      <img
                        src={SomePhoto}
                        alt="new photo"
                        className="news_img"
                      />
                    </div>
                    <div className="news_body_container">
                      <p className="news_title">{val.serviceName}</p>
                      <p className="news_description">
                        {val.serviceDescription}
                      </p>
                    </div>
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
          <div className="contact_right_container">
            <p className="news_container_header">განაახლე დეტალები</p>
            <form onSubmit={() => handleSubmit()} className="contact-form">
              <div className="contact-inp-cont">
                <label className="label" htmlFor="password">
                  შეიყვანეთ სერვისის დასახელება
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
                  შეიყვანეთ სრული სერვისის ტექსტი
                </label>
                <textarea
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={(val) => console.log()}
                  variant="outlined"
                  label="მომხმარებელი"
                  className="textarea-user-input"
                />
              </div>

              <div className="contact-inp-cont">
                <label className="label" htmlFor="password">
                  ატვირთეთ სერვისის ფოტო
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="file"
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
