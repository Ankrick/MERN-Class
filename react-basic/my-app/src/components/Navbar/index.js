import React from 'react'
import style from './index.css'

export default function Navbar({setShowModal}) {
  return (
    <nav>
      <div class="navbar">
        <div className="container">
          <h1>logo</h1>
          <ul>
            <li>Home</li>
            <li>Posts</li>
            <li onClick={()=>setShowModal(true)}>Sign in</li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
