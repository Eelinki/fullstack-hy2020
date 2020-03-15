import React from 'react'
import { useSelector } from 'react-redux'
import {
  Link
} from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => {
    return state.blogs
  })

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return(
    sortedBlogs.map(blog =>
      <p key={blog.id} className='blog'>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </p>
    )
  )
}

export default BlogList