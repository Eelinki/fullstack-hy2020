import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const AddBlog = (props) => {
  const dispatch = useDispatch()

  const addBlog = async (e) => {
    e.preventDefault()

    const blogObject = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value
    }

    dispatch(createBlog(blogObject))

    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''
  }

  return (
    <form onSubmit={addBlog}>
      <p>
        title:
        <input
          type="text"
          name="Title"
          id="title" />
      </p>
      <p>
        author:
        <input
          type="text"
          name="Author"
          id="author" />
      </p>
      <p>
        url:
        <input
          type="text"
          name="Url"
          id="url" />
      </p>
      <input type="submit" id="create-button" value="create" />
    </form>
  )
}

export default AddBlog