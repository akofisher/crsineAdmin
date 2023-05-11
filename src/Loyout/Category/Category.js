import React, { useState } from 'react'
import Loyout from '../Loyout'
import './Category.css'

export default function Category() {
  const [categ, setCateg] = useState('')

  const handleSubmit = () => {
    console.log(categ, 'CATEG')
  }

  return (
    <Loyout>
      <div className="category-container">Page one</div>
    </Loyout>
  )
}
