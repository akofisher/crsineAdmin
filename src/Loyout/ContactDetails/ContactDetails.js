import React from 'react'
import Logo from '../../Img/restLogo.jpg'
import { contactDetails } from '../../data'
import Loyout from '../Loyout'
import './ContactDetails.css'

export default function ContactDetails() {
  const handleSubmit = () => {}
  return (
    <Loyout>
      <div className="page_container">
        <div className="contact_main_container">
          <div className="contact_left_container">
            <p className="contact_container_header">არსებული დეტალები</p>
            <div className="rows">
              <p className="contact_title">Brand Name:</p>
              <p className="contact_detail">{contactDetails.brandName}</p>
            </div>
            <div className="rows">
              <p className="contact_title">Address:</p>
              <p className="contact_detail">{contactDetails.brandAddress}</p>
            </div>
            <div className="rows">
              <p className="contact_title">Email:</p>
              <p className="contact_detail">{contactDetails.email}</p>
            </div>
            <div className="rows">
              <p className="contact_title">Phone:</p>
              <p className="contact_detail">{contactDetails.phone}</p>
            </div>
            <div className="rows">
              <p className="contact_title">Instagram:</p>
              <p className="contact_detail">{contactDetails.instagram}</p>
            </div>
            <div className="rows">
              <p className="contact_title">Facebook:</p>
              <p className="contact_detail">{contactDetails.facebook}</p>
            </div>
            <div className="rows">
              <p className="contact_title">Brand Logo:</p>
              <p className="contact_detail">{contactDetails.brandLogo}</p>
              <img src={Logo} alt="Logo" className="brandLogo" />
            </div>
          </div>
          <div className="contact_right_container">
            <p className="contact_container_header">განაახლე დეტალები</p>
            <form onSubmit={() => handleSubmit()} className="contact-form">
              <div className="contact-inp-cont">
                <label className="label" htmlFor="userName">
                  ბრენდის სახელი
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
                  შეიყვანეთ მისამართი
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
                  შეიყვანეთ ელ-ფოსტა
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
                  შეიყვანეთ მობილური ნომერი
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
                  შეიყვანეთ Instagram ლინკი
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
                  შეიყვანეთ Facebook ლინკი
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
              <div className="contact-inp-cont-logo">
                <label className="label" htmlFor="password">
                  ატვირთეთ ლოგოს ფოტო
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

                <button className="submit-btn" type="button">
                  ლოგოს დამატება
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Loyout>
  )
}
