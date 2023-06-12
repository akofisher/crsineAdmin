import React, { useState } from 'react'

const ModalContainer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return <div className="modal-window">Hi</div>
}

export default ModalContainer
