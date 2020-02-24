import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlog = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (e) => {
    e.preventDefault()

    handleSubmit({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <p>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          id="title"
          onChange={({ target }) => setTitle(target.value)} />
      </p>
      <p>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          id="author"
          onChange={({ target }) => setAuthor(target.value)} />
      </p>
      <p>
        url:
        <input
          type="text"
          value={url}
          name="Url"
          id="url"
          onChange={({ target }) => setUrl(target.value)} />
      </p>
      <input type="submit" id="create-button" value="create" />
    </form>
  )
}

AddBlog.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default AddBlog