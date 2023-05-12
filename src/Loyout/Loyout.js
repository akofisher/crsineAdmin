import React from 'react'
import '.././App.css'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import SideBar from './SideBar/SideBar'

export default function Loyout(props) {
  return (
    <div className="loyout-container">
      <Header />
      <div className="container">
        <SideBar />
        {props.children}
      </div>
      <Footer />
    </div>
  )
}
