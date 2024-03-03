import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';

export default function BlogDetail() {
    let params = useParams();
    let url = 'http://localhost:3001/blogs/'+params.id
    let { data : blog, loading, error } = useFetch(url);

    let navigate = useNavigate();

    useEffect(()=>{
        if (error) {
            setTimeout(() => {
                navigate('/')
            }, 1500);
        }
    },[error, navigate])

  return (
    <div>
        {error && <div>{error}</div>}
        {loading && <div>loading...</div>}
        {blog && (<div>
            <h2>{blog.title}</h2>
            <p>Posted by -{blog.author}</p>
            <p>{blog.body}</p>
        </div>)}
    </div>
  )
}
