import React, { useRef } from 'react'
import './index.css'
import { useState } from 'react'
import { Ref } from 'react'

export default function Index({addPost}) {

    // let [title, setTitle] = useState("")
    let title = useRef()
    let [status, setStatus] = useState("upcoming")

    let resetForm = () => {
        title.current.value = ''
    }

    let upload_post = (e) => {
        e.preventDefault();
        
        let post = {
            id : Math.floor(Math.random()*10000),
            title : title.current.value,
            status : status
        }

        addPost(post)
    }

  return (
    <form className = "post-form" onSubmit={upload_post}>
        <h1>Create Post</h1>
        <div className="form-control">
            <label htmlFor="">Title</label>
            <input type="text" ref={title}/>
        </div>
        <div className="form-control">
            <label htmlFor="">Status</label>
            <select name ="" id="" value={status} onChange={(e)=>setStatus(e.target.value)}>
                <option value="dropped">Dropped</option>
                <option value="ongoing">Ongnig</option>
                <option value="upcoming">Upcoming</option>
            </select>
        </div>
        <div className="form-control">
            <button type='submit'>Post Now</button>
        </div>
    </form>
  )
}
