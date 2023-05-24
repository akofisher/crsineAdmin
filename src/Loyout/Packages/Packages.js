import React from 'react'
import Delete from '../../Img/delete.png'
import Edit from '../../Img/edit.png'
import { CarPackages, WashPackages } from '../../data'
import Loyout from '../Loyout'
import './Packages.css'

export default function Packages() {
  const handleSubmit = () => {}
  return (
    <Loyout>
      <div className="page_container">
        <div className="packages_main_container">
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
          <div className="packages_container">
            {CarPackages.map((val, idx) => {
              return (
                <div key={idx} className="package_card">
                  <p className="packages_name">{val.packageName}</p>
                  <p className="packages_price">{val.packagePrice}</p>
                  <p className="packages_time">{val.packageTime}</p>
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
          <div className="packages_add_container">
            <label className="dates_header_text" htmlFor="categories">
              პაკეტი - {CarPackages[0].packageName}
            </label>
            <form onSubmit={() => handleSubmit()} className="packages-form">
              <div className="contact-inp-cont">
                <label className="label" htmlFor="userName">
                  ჩაწერეთ პაკეტის სახელი
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
                <label className="label" htmlFor="userName">
                  ჩაწერეთ პაკეტის ფასი
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
                  ჩაწერეთ პაკეტი დრო (მაგ: 20min)
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
                დამატება
              </button>
            </form>
          </div>
        </div>
      </div>
    </Loyout>
  )
}
