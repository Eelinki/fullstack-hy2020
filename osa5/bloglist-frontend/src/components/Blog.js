import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, loggedUser }) => {
  const [expanded, setExpanded] = useState(false)

  const like = (e) => {
    handleLike(blog.id, {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    })
  }

  const remove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author} ?`)) {
      handleRemove(blog.id)
    }
  }

  if (expanded) {
    return (
      <div className="blog-post" style={{
        border: '2px solid black',
        margin: '3px',
        padding: '2px'
      }}>
        <p>
          <span id="blog-title" style={{
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer'
          }} onClick={() => setExpanded(!expanded)}>{blog.title}</span> <span>
            {blog.author}
          </span>
        </p>
        <p>{blog.url}</p>
        <p><span className="likes-amount">{blog.likes}</span> <button onClick={like}>like</button></p>
        <p>{blog.user.username}</p>
        { blog.user.username === loggedUser.username &&
          <p><button onClick={remove}>remove</button></p>
        }
      </div>
    )
  }

  return (
    <div className="blog-post">
      <span id="blog-title" style={{
        color: 'blue',
        textDecoration: 'underline',
        cursor: 'pointer'
      }} onClick={() => setExpanded(!expanded)}>{blog.title}</span> {blog.author}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog
