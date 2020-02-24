import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggleable'
import AddBlog from './components/AddBlog'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
  }

  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()

      setBlogs(blogs.concat(response))

      setNotificationMessage(`new blog ${response.title} added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setNotificationMessage('invalid blog')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (id, blogObject) => {
    try {
      const response = await blogService.update(id, blogObject)

      setBlogs(blogs.map(b => b.id !== id ? b : { ...b, likes: response.likes }))
    } catch (exception) {
      setNotificationMessage('unauthorized')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleRemove = async (id) => {
    try {
      await blogService.remove(id)

      setBlogs(blogs.filter(b => b.id !== id))

      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setNotificationMessage('unauthorized')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        { notificationMessage &&
          <p style={{
            border: '3px solid black',
            fontSize: '1.6em',
            padding: '3px'
          }}>{notificationMessage}</p>
        }
        <form onSubmit={handleLogin}>
          <p>
            username
            <input
              type="text"
              value={username}
              name="Username"
              id="username"
              onChange={({ target }) => setUsername(target.value)} />
          </p>
          <p>
            password
            <input
              type="password"
              value={password}
              name="Password"
              id="password"
              onChange={({ target }) => setPassword(target.value)} />
          </p>
          <input type="submit" id="login-button" value="Login" />
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      { notificationMessage &&
        <p style={{
          border: '3px solid black',
          fontSize: '1.6em',
          padding: '3px'
        }}>{notificationMessage}</p>
      }

      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

      <h2>create new</h2>
      <Toggleable buttonLabel='new blog' ref={blogFormRef}>
        <AddBlog handleSubmit={addBlog} />
      </Toggleable>

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} loggedUser={user} />
      )}
    </div>
  )
}

export default App