/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE_BLOG':
    const id = action.data.id
    const blogToChange = state.find(b => b.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }

    return state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )
  case 'DELETE_BLOG':
    return state.filter(b => b.id !== action.data.id)
  default:
    return state
  }
}

export const createBlog = (data) => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const initBlogs = (blogs) => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const likeBlog = (id, blog) => {
  return async dispatch => {
    const likedBlog = await blogService.update(id, blog)

    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    const deletedBlog = await blogService.remove(id)

    dispatch({
      type: 'DELETE_BLOG',
      data: deletedBlog
    })
  }
}

export default blogReducer