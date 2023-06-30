import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../API'
import { getCookie } from '../../Cookies'
import Delete from '../../Img/delete.png'
import { setSliderPhotos } from '../../Store/CarWash/CarWashActCreat'
import { selectSliderPhotos } from '../../Store/CarWash/CarWashSelector'
import api from '../../useApiCall'
import Loyout from '../Loyout'
import './SliderPhotos.css'

export default function SliderPhotos() {
  const Photos = [0, 1, 2, 3, 4, 5, 6, 7]
  const [error, setError] = useState('')
  const [file, setFile] = useState('')
  const [format, setFormat] = useState('')
  const [photo, setPhoto] = useState('')
  const dispatch = useDispatch()
  const SLIDER_PHOTOS = useSelector(selectSliderPhotos)
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

  const fetchSliderPhotos = async () => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'GetSliderImages',
          controller: 'Services',
          pars: '',
        }),
      }
      const responseData = await api.fetchData(url, options)
      if (responseData.status == 'success') {
        dispatch(setSliderPhotos(responseData.data))
        console.log(responseData, 'News')
      } else {
      }
      console.log(responseData.data, 'News')
    } catch (error) {
      setError(error.message)
    }
  }

  const DeleteSliderPhoto = async (id) => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'DeleteSlider',
          controller: 'Admin',
          pars: {
            SLIDER_ID: id,
            TOKEN: token,
            ADMIN_ID: uid,
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      if (responseData.status == 'success') {
        window.location.reload()
        console.log(responseData, 'News')
      } else {
        alert('დაფიქსირდა შეცდომა')
      }
      console.log(responseData.data, 'News')
    } catch (error) {
      setError(error.message)
    }
  }

  const AddSliderPhoto = async () => {
    if (photo.length > 0) {
      try {
        const url = API
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ApiMethod: 'AddSlider',
            controller: 'Admin',
            pars: {
              SLIDER_IMAGE: photo,
              TOKEN: token,
              ADMIN_ID: uid,
            },
          }),
        }
        const responseData = await api.fetchData(url, options)
        if (responseData.status == 'success') {
          console.log(responseData, 'News')
          window.location.reload()
        } else {
        }
        console.log(responseData.data, 'News')
      } catch (error) {
        setError(error.message)
      }
    } else {
      alert('გთხოვთ ატვირთოთ ფოტო ფაილი')
    }
  }

  useEffect(() => {
    fetchSliderPhotos()
  }, [])

  return (
    <Loyout>
      <div className="page_container">
        <div className="flexible_slider_contianer">
          <div className="left_slider_container">
            <p className="news_container_header">არსებული ფოტოები</p>
            <div className="photos_container">
              {SLIDER_PHOTOS.length > 0 ? (
                SLIDER_PHOTOS.map((val, idx) => {
                  return (
                    <div key={idx} className="slider_img">
                      <img
                        src={val.SLIDER_IMAGE}
                        alt=""
                        className="slider_img"
                      />
                      <img
                        src={Delete}
                        alt="delete"
                        className="delete_btn"
                        title="წაშლა"
                        onClick={() => DeleteSliderPhoto(val.UID)}
                      />
                    </div>
                  )
                })
              ) : (
                <p className="isNotData">მონაცემები არ მოიძებნა</p>
              )}
            </div>
          </div>
          <div className="right_slider_container">
            <p className="news_container_header">ფოტოს დამატება</p>
            <div className="contact-inp-cont-logo">
              <label className="label" htmlFor="password">
                ატვირთეთ სლაიდერის ფოტო
              </label>
              <input
                id="userName"
                name="userName"
                type="file"
                onChange={(val) => handleFileChange(val)}
                variant="outlined"
                label="მომხმარებელი"
                className="user-input"
                required
              />

              <button
                className="submit-btn"
                type="button"
                onClick={() => AddSliderPhoto()}
              >
                ფოტოს დამატება
              </button>
            </div>
          </div>
        </div>
      </div>
    </Loyout>
  )
}
