import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggleable'
import AddBlog from './components/AddBlog'
import './App.css'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import BlogList from './components/BlogList'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [dispatch])

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
      dispatch(setNotification('wrong username or password', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
  }

  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()

      dispatch(setNotification(`new blog ${response.title} added`, 5))
    } catch (exception) {
      dispatch(setNotification('invalid blog', 5))
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification />

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
    <Router>
      <div className='App'>
        <div className='navigation'>
          <ul>
            <li><Link to='/'>blogs</Link></li>
            <li><Link to='/users'>users</Link></li>
            <li>{user.name} logged in <button onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>

        <h2>blogs</h2>

        <Notification />

        <Switch>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/user/:id'>
            <User />
          </Route>
          <Route path='/blogs/:id'>
            <Blog />
          </Route>
          <Route path='/'>
            <h2>create new</h2>
            <Toggleable buttonLabel='new blog' ref={blogFormRef}>
              <AddBlog handleSubmit={addBlog} />
            </Toggleable>

            <BlogList />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App