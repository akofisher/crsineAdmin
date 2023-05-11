import React from 'react'
import '.././App.css'
import Footer from './Footer/Footer'
import Header from './Header/Header'

export default function Loyout(props) {
  return (
    <div className="loyout-container">
      <Header />
      <div className="container">
        <div className="sideBar">Side Bar</div>
        {props.children}
      </div>
      <Footer />
    </div>
  )
}
