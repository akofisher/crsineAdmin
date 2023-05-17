import React from 'react'
import Logo from '../../Img/restLogo.jpg'
import { aboutDetails, bannerPhoto, sliderBannerPhoto } from '../../data'
import Loyout from '../Loyout'
import './AboutDetails.css'

export default function AboutDetails() {
  const handleSubmit = () => {}
  return (
    <Loyout>
      <div className="page_container">
        <div className="contact_main_container">
          <div className="contact_left_container">
            <p className="contact_container_header">არსებული დეტალები</p>

            <div className="rows">
              <p className="contact_title">ჩვენს შესახებ "ტექსტი":</p>
              <p className="contact_detail">{aboutDetails.aboutText}</p>
            </div>
            <div className="rows">
              <p className="contact_title">ჩვენი ფოტო N1:</p>
              <p className="contact_detail">{aboutDetails.aboutImgOne}</p>
              <img src={Logo} alt="Logo" className="brandLogo" />
            </div>
            <div className="rows">
              <p className="contact_title">ჩვენი ფოტო N2:</p>
              <p className="contact_detail">{aboutDetails.aboutImgOne}</p>
              <img src={Logo} alt="Logo" className="brandLogo" />
            </div>
            <div className="rows">
              <p className="contact_title">სლაიდერის ბანერი:</p>
              <p className="contact_detail">{sliderBannerPhoto.image}</p>
              <img src={Logo} alt="Logo" className="brandLogo" />
            </div>
            <div className="rows">
              <p className="contact_title">ფეიჯების ბანერი:</p>
              <p className="contact_detail">{bannerPhoto.pagesBanner}</p>
              <img src={Logo} alt="Logo" className="brandLogo" />
            </div>
          </div>
          <div className="contact_right_container">
            <p className="contact_container_header">განაახლე დეტალები</p>
            <form onSubmit={() => handleSubmit()} className="contact-form">
              <div className="contact-inp-cont">
                <label className="label" htmlFor="password">
                  შეიყვანეთ ჩვენს შესახებ ტექსტი
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
                  ატვირთეთ ჩვენი ფოტო N1
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
              <div className="contact-inp-cont">
                <label className="label" htmlFor="password">
                  ატვირთეთ ჩვენი ფოტო N2
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
              <div className="contact-inp-cont">
                <label className="label" htmlFor="password">
                  ატვირთეთ სლაიდერის ბანერი
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
              <div className="contact-inp-cont">
                <label className="label" htmlFor="password">
                  ატვირთეთ ფეიჯების ბანერი
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
                შეცვლა
              </button>
            </form>
          </div>
        </div>
      </div>
    </Loyout>
  )
}
