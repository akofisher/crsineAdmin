import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../API'
import { getCookie } from '../../Cookies'
import { setAbout } from '../../Store/CarWash/CarWashActCreat'
import { selectAbout } from '../../Store/CarWash/CarWashSelector'
import api from '../../useApiCall'
import Loyout from '../Loyout'
import './ContactDetails.css'

export default function ContactDetails() {
  const handleSubmit = () => { }
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [name, setName] = useState(0)
  const [email, setEmail] = useState(0)
  const [address, setAddress] = useState(0)
  const [phone, setPhone] = useState(0)
  const [instagram, setInstagram] = useState(0)
  const [facebook, setFacebook] = useState(0)
  const [aboutUsText, setAboutUsText] = useState(0)
  let token = getCookie('token')
  let uid = getCookie('uid')
  const CONTACT = useSelector(selectAbout)

  const fetchContactDetails = async () => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'GetContactInfo',
          controller: 'Services',
          pars: '',
        }),
      }
      const responseData = await api.fetchData(url, options)
      dispatch(setAbout(responseData.data))
    } catch (error) {
      setError(error.message)
    }
  }
  const editContactDetails = async () => {
    try {
      const url = API
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'UpdateContactInfo',
          controller: 'Admin',
          pars: {
            CONTACT_NAME: name !== 0 ? name : CONTACT.CONTACT_NAME,
            ADDRESS: address !== 0 ? address : CONTACT.ADDRESS,
            PHONE: phone !== 0 ? phone : CONTACT.PHONE,
            FACEBOOK: facebook !== 0 ? facebook : CONTACT.FACEBOOK,
            INSTAGRAM: instagram !== 0 ? instagram : CONTACT.INSTAGRAM,
            EMAIL: email !== 0 ? email : CONTACT.EMAIL,
            ABOUT_TEXT: aboutUsText !== 0 ? aboutUsText : CONTACT.ABOUT_TEXT,
            ADMIN_ID: uid,
            TOKEN: token,
          },
        }),
      }
      const responseData = await api.fetchData(url, options)
      if (responseData.status == 'success') {
        window.location.reload()
      } else {
        alert('დაფიქსირდა შეცდომა')
        window.location.reload()
      }
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchContactDetails()
  }, [])

  return (
    <Loyout>
      <div className="page_container">
        <div className="contact_main_container">
          <div className="contact_left_container">
            <p className="contact_container_header">არსებული დეტალები</p>
            <div className="rows">
              <p className="contact_title">Brand Name:</p>
              <p className="contact_detail">{CONTACT.CONTACT_NAME}</p>
            </div>
            <div className="rows">
              <p className="contact_title">Address:</p>
              <p className="contact_detail">{CONTACT.ADDRESS}</p>
            </div>
            <div className="rows">
              <p className="contact_title">Email:</p>
              <p className="contact_detail">{CONTACT.EMAIL}</p>
            </div>
            <div className="rows">
              <p className="contact_title">Phone:</p>
              <p className="contact_detail">{CONTACT.PHONE}</p>
            </div>
            <div className="rows">
              <p className="contact_title">Instagram:</p>
              <p className="contact_detail">{CONTACT.INSTAGRAM}</p>
            </div>
            <div className="rows">
              <p className="contact_title">Facebook:</p>
              <p className="contact_detail">{CONTACT.FACEBOOK}</p>
            </div>
            <div className="rows">
              <p className="contact_title">About us text:</p>
              <p className="contact_detail">{CONTACT.ABOUT_TEXT}</p>
            </div>
          </div>

          <div className="contact_right_container">
            <p className="contact_container_header">განაახლე დეტალები</p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                editContactDetails()
              }}
              className="contact-form"
            >
              <div className="contact-inp-cont">
                <label className="label" htmlFor="Name">
                  ბრენდის სახელი
                </label>
                <input
                  id="Name"
                  name="Name"
                  type="text"
                  onChange={(val) => setName(val.target.value)}
                  variant="outlined"
                  label="მომხმარებელი"
                  className="user-input"
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="address">
                  შეიყვანეთ მისამართი
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  onChange={(val) => setAddress(val.target.value)}
                  variant="outlined"
                  label="მომხმარებელი"
                  className="user-input"
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="email">
                  შეიყვანეთ ელ-ფოსტა
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  onChange={(val) => setEmail(val.target.value)}
                  variant="outlined"
                  label="მომხმარებელი"
                  className="user-input"
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="phone">
                  შეიყვანეთ მობილური ნომერი
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  onChange={(val) => setPhone(val.target.value)}
                  variant="outlined"
                  label="მომხმარებელი"
                  className="user-input"
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="instagram">
                  შეიყვანეთ Instagram ლინკი
                </label>
                <input
                  id="instagram"
                  name="instagram"
                  type="text"
                  onChange={(val) => setInstagram(val.target.value)}
                  variant="outlined"
                  label="მომხმარებელი"
                  className="user-input"
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="facebook">
                  შეიყვანეთ Facebook ლინკი
                </label>
                <input
                  id="facebook"
                  name="facebook"
                  type="text"
                  onChange={(val) => setFacebook(val.target.value)}
                  variant="outlined"
                  label="მომხმარებელი"
                  className="user-input"
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="aboutText">
                  შეიყვანეთ ჩვენს შესახებ ტექსტი
                </label>
                <textarea
                  id="aboutText"
                  name="aboutText"
                  type="text"
                  onChange={(val) => {
                    if (val.target.value.length > 500) {
                      alert('დაშვებული სიმბოლოების რაოდენობა 500-ია')
                    } else {
                      setAboutUsText(val.target.value)
                    }
                  }}
                  variant="outlined"
                  className="textarea-user-input"
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
