import React from 'react'
import { useSelector } from 'react-redux'
import {
  Link
} from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => {
    return state.users
  })

  return (
    <div>
      <h2>Users</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {
            users.map(user =>
              <tr key={user.id}>
                <td><Link to={`/user/${user.id}`}>{user.username}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Users