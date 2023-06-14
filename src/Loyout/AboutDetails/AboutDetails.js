import React, { useState } from 'react'
import Logo from '../../Img/restLogo.jpg'
import { aboutDetails, bannerPhoto } from '../../data'
import Loyout from '../Loyout'
import './AboutDetails.css'

export default function AboutDetails() {
  const [file1, setFile1] = useState(null)
  const [file2, setFile2] = useState(null)
  const [file3, setFile3] = useState(null)
  const [photo1, setPhoto1] = useState('')
  const [photo2, setPhoto2] = useState('')
  const [photo3, setPhoto3] = useState('')
  const [aboutUsText, setAboutUsText] = useState('')

  const handleFileChange1 = (event) => {
    const file = event.target.files[0]
    setFile1(file)

    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        const base64 = reader.result
        setPhoto1(base64)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleFileChange2 = (event) => {
    const file = event.target.files[0]
    setFile2(file)

    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        const base64 = reader.result
        setPhoto2(base64)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleFileChange3 = (event) => {
    const file = event.target.files[0]
    setFile3(file)

    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        const base64 = reader.result
        setPhoto3(base64)
      }

      reader.readAsDataURL(file)
    }
  }

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
              <p className="contact_title">ფეიჯების ბანერი:</p>
              <p className="contact_detail">{bannerPhoto.pagesBanner}</p>
              <img src={Logo} alt="Logo" className="brandLogo" />
            </div>
          </div>
          <div className="contact_right_container">
            <p className="contact_container_header">განაახლე დეტალები</p>
            <form onSubmit={(e) => e.preventDefault()} className="contact-form">
              <div className="contact-inp-cont">
                <label className="label" htmlFor="aboutText">
                  შეიყვანეთ ჩვენს შესახებ ტექსტი
                </label>
                <textarea
                  id="aboutText"
                  name="aboutText"
                  type="text"
                  onChange={(val) => setAboutUsText(val.target.value)}
                  variant="outlined"
                  className="textarea-user-input"
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="photo1">
                  ატვირთეთ ჩვენი ფოტო N1
                </label>
                <input
                  id="photo1"
                  name="photo1"
                  type="file"
                  onChange={(val) => handleFileChange1(val.target.value)}
                  variant="outlined"
                  className="user-input"
                  accept="image/*"
                />
              </div>
              <div className="contact-inp-cont">
                <label className="label" htmlFor="photo2">
                  ატვირთეთ ჩვენი ფოტო N2
                </label>
                <input
                  id="photo2"
                  name="photo2"
                  type="file"
                  onChange={(val) => handleFileChange2(val.target.value)}
                  variant="outlined"
                  className="user-input"
                  accept="image/*"
                />
              </div>

              <div className="contact-inp-cont">
                <label className="label" htmlFor="photo3">
                  ატვირთეთ ფეიჯების ბანერი
                </label>
                <input
                  id="photo3"
                  name="photo3"
                  type="file"
                  onChange={(val) => handleFileChange3(val.target.value)}
                  variant="outlined"
                  className="user-input"
                  accept="image/*"
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
