import React, { Children } from 'react'
import './index.css'
import ReactDom from 'react-dom'


export default function Modal({children, danger=false ,setShowModal}) {
  let className = danger ? 'border-red' : 'border-blue'
  return (
    ReactDom.createPortal(
      <div className="modal-container">
        <div className="modal-backdrop">
          <div className={`modal ${className}`}>
                {children}
                <button onClick={()=>setShowModal(false)}>close</button>
          </div>
        </div>
      </div>,
      document.getElementById('modal')
    )
    
  )
}
