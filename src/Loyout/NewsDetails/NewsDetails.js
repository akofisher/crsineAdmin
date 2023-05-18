import React from 'react'
import Delete from '../../Img/delete.png'
import Edit from '../../Img/edit.png'
import SomePhoto from '../../Img/restLogo.jpg'
import { newsDetails } from '../../data'
import Loyout from '../Loyout'
import './NewsDetails.css'

export default function NewsDetails() {
  const handleSubmit = () => {}
  return (
    <Loyout>
      <div className="page_container">
        <div className="contact_main_container">
          <div className="news_left_container">
            <p className="news_container_header">არსებული დეტალები</p>
            <div className="existing_details">
              {newsDetails.map((val, idx) => {
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
                      <p className="news_date">{val.newsDate}</p>
                      <p className="news_title">{val.newsName}</p>
                      <p className="news_description">{val.newsDescription}</p>
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
                <label className="label" htmlFor="userName">
                  ჩაწერეთ თვე და რიცხვი (მაგ: 20 Jan)
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
                  შეიყვანეთ სიახლის დასახელება
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
                  შეიყვანეთ სრული სიახლის ტექსტი
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
