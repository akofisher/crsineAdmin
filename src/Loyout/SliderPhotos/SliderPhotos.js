import React from 'react'
import Delete from '../../Img/delete.png'
import IMAGE from '../../Img/restLogo.jpg'
import Loyout from '../Loyout'
import './SliderPhotos.css'

export default function SliderPhotos() {
  const Photos = [0, 1, 2, 3, 4, 5, 6, 7]
  return (
    <Loyout>
      <div className="page_container">
        <div className="flexible_slider_contianer">
          <div className="left_slider_container">
            <p className="news_container_header">არსებული ფოტოები</p>
            <div className="photos_container">
              {Photos
                ? Photos.map((val, idx) => {
                    return (
                      <div key={val} className="slider_img">
                        <img src={IMAGE} alt="" className="slider_img" />
                        <img
                          src={Delete}
                          alt="delete"
                          className="delete_slider_btn"
                          title="წაშლა"
                        />
                      </div>
                    )
                  })
                : null}
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
                onChange={(val) => console.log()}
                variant="outlined"
                label="მომხმარებელი"
                className="user-input"
              />

              <button className="submit-btn" type="button">
                ფოტოს დამატება
              </button>
            </div>
          </div>
        </div>
      </div>
    </Loyout>
  )
}
