import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  useParams
} from 'react-router-dom'

const Blog = () => {
  const id = useParams().id

  const blogs = useSelector(state => {
    return state.blogs
  })

  const blog = blogs.find(b => b.id === id)

  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))

  const like = (e) => {
    dispatch(likeBlog(blog.id, {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }))
  }

  const remove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author} ?`)) {
      try {
        dispatch(deleteBlog(blog.id))
      } catch (error) {
        dispatch(setNotification('unauthorized', 5))
      }
    }
  }

  return (
    <div className="blog-post">
      <h2>{blog.title} <span style={{ fontStyle: 'italic', fontWeight: 400 }}>{blog.author}</span></h2>
      <a href={blog.url} className='url'>{blog.url}</a>
      <p><span className="likes-amount">{blog.likes}</span> <button onClick={like}>like</button></p>
      <p>{blog.user.username ?? null}</p>
      { blog.user.username === loggedUser.username &&
        <p><button onClick={remove}>remove</button></p>
      }
    </div>
  )
}

export default Blog
