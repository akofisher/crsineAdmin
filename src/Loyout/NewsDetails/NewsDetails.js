import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../API'
import { getCookie } from '../../Cookies'
import Delete from '../../Img/delete.png'
import Edit from '../../Img/edit.png'
import { setNews } from '../../Store/CarWash/CarWashActCreat'
import { selectNews } from '../../Store/CarWash/CarWashSelector'
import api from '../../useApiCall'
import Loyout from '../Loyout'
import './NewsDetails.css'

export default function NewsDetails() {
  const dispatch = useDispatch()
  const NEWS = useSelector(selectNews)
  const [error, setError] = useState('')
  const [file, setFile] = useState('')
  const [format, setFormat] = useState('')
  const [photo, setPhoto] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [serviceText, setServiceText] = useState('')
  const [edit, setEdit] = useState({
    editable: false,
    serviceId: '',
  })
  const [editPhoto, setEditPhoto] = useState({
    editable: false,
    serviceId: '',
  })
  let token = getCookie('token')
  let uid = getCookie('uid')

  const isFileTypeValid = (file) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
    return allowedTypes.includes(file.type)
  }

  const getFileFormat = (filename) => {
    const parts = filename.split('.')
    return parts[parts.length - 1].toUpperCase()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setFile(file)

    if (file && isFileTypeValid(file)) {
      const format = getFileFormat(file.name)
      setFormat(format)
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result
        setPhoto(base64)
      }
      reader.readAsDataURL(file)
      console.log(photo, 'PHOTO1')
      console.log(format, 'FORMAT1')
    } else {
      setFile('')
      setPhoto('')
      setFormat('')
    }
  }

  const fetchServiceList = async () => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'GetNewsList',
          controller: 'Services',
          pars: '',
        }),
      }
      const responseData = await api.fetchData(url, options)
      if (responseData.status == 'success') {
        dispatch(setNews(responseData.data))
      } else {
        alert('დაფიქსირდა შეცდომა')
      }
      console.log(responseData.data, 'News')
    } catch (error) {
      setError(error.message)
    }
  }

  const AddService = async () => {
    console.log(photo, 'BASE64')
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'AddNews',
          controller: 'Admin',
          pars: {
            NEWS_DESCRIPTION: serviceText,
            NEWS_NAME: serviceName,
            NEWS_IMAGE: photo,
            // IMAGE_FORMAT: format,
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
      console.log(responseData, 'ADD')
    } catch (error) {
      setError(error.message)
    }
  }

  const EditService = async (id) => {
    console.log(photo, 'BASE64')
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'EditNews',
          controller: 'Admin',
          pars: {
            NEWS_DESCRIPTION: serviceText,
            NEWS_NAME: serviceName,
            NEWS_ID: id,
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
      console.log(responseData, 'ADD')
    } catch (error) {
      setError(error.message)
    }
  }
  const EditServicePhoto = async (id) => {
    console.log(photo, 'BASE64')
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'EditNewsImage',
          controller: 'Admin',
          pars: {
            NEWS_IMAGE: photo,
            NEWS_ID: id,
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
      console.log(responseData, 'ADD')
    } catch (error) {
      setError(error.message)
    }
  }
  const DeleteService = async (id) => {
    console.log(photo, 'BASE64')
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'DeleteNews',
          controller: 'Admin',
          pars: {
            NEWS_ID: id,
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
      console.log(responseData, 'ADD')
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchServiceList()
  }, [])

  const handleSubmit = () => {}

  return (
    <Loyout>
      <div className="page_container">
        <div className="contact_main_container">
          <div className="news_left_container">
            <p className="news_container_header">არსებული დეტალები</p>
            <div className="existing_details">
              {NEWS.length > 0 ? (
                NEWS.map((val, idx) => {
                  return (
                    <div className="News_card" key={idx}>
                      <div className="news_img_container">
                        <img
                          src={val.NEWS_IMAGE}
                          alt="new photo"
                          className="news_img"
                          title="შეცვალე ფოტო"
                          onClick={() =>
                            setEditPhoto({
                              editable: true,
                              serviceId: val.UID,
                            })
                          }
                        />
                      </div>
                      <div className="news_body_container">
                        <p className="news_title">{val.NEWS_NAME}</p>
                        <p className="news_description">
                          {val.NEWS_DESCRIPTION}
                        </p>
                      </div>
                      <img
                        src={Delete}
                        alt="delete"
                        className="delete_btn"
                        title="წაშლა"
                        onClick={() => DeleteService(val.UID)}
                      />
                      <img
                        src={Edit}
                        alt="delete"
                        className="edit_btn"
                        title="რედაქტირება"
                        onClick={() =>
                          setEdit({
                            editable: true,
                            serviceId: val.UID,
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
          <div className="contact_right_container">
            <p className="news_container_header">განაახლე დეტალები</p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (edit.editable == true) {
                  EditService(edit.serviceId)
                } else {
                  AddService()
                }
              }}
              className="contact-form"
            >
              <div className="contact-inp-cont">
                <label className="label" htmlFor="password">
                  {edit.editable ? 'შეცვალე' : 'შეიყვანე'} სიახლის დასახელება
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={(val) => setServiceName(val.target.value)}
                  variant="outlined"
                  label="მომხმარებელი"
                  className="user-input"
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="password">
                  {edit.editable ? 'შეცვალე' : 'შეიყვანე'} სრული სიახლის ტექსტი
                </label>
                <textarea
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={(val) => setServiceText(val.target.value)}
                  variant="outlined"
                  label="მომხმარებელი"
                  className="textarea-user-input"
                />
              </div>
              {edit.editable ? null : (
                <div className="contact-inp-cont">
                  <label className="label" htmlFor="password">
                    ატვირთეთ სიახლის ფოტო
                  </label>
                  <input
                    id="userName"
                    name="userName"
                    type="file"
                    onChange={(val) => handleFileChange(val)}
                    variant="outlined"
                    label="მომხმარებელი"
                    className="user-input"
                  />
                </div>
              )}
              <div className="flex_btns">
                <button className="submit-btn" type="submit">
                  {edit.editable ? 'შეცვლა' : 'დამატება'}
                </button>
                <button
                  className="cancel-btn"
                  type="button"
                  onClick={() => window.location.reload()}
                >
                  გაუქმება
                </button>
              </div>
            </form>
            {editPhoto.editable ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  EditServicePhoto(editPhoto.serviceId)
                }}
                className="contact-form"
              >
                <div className="contact-inp-cont">
                  <label className="label" htmlFor="password">
                    განაახლე სიახლის ფოტო
                  </label>
                  <input
                    id="userName"
                    name="userName"
                    type="file"
                    onChange={(val) => handleFileChange(val)}
                    variant="outlined"
                    label="მომხმარებელი"
                    className="user-input"
                  />
                </div>

                <div className="flex_btns">
                  <button className="submit-btn" type="submit">
                    {edit.editable ? 'შეცვლა' : 'დამატება'}
                  </button>
                  <button
                    className="cancel-btn"
                    type="button"
                    onClick={() => window.location.reload()}
                  >
                    გაუქმება
                  </button>
                </div>
              </form>
            ) : null}
          </div>
        </div>
      </div>
    </Loyout>
  )
}
