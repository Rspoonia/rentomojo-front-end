import React from 'react'
import { Link } from 'react-router-dom'

const USER_DETAIL = 'user/'

export default function UsersList({ user, tableIndex }) {
  return (
    <tbody>
      <tr>
        <td>{tableIndex + 1}</td>
        <td>
          <Link to={`${USER_DETAIL}${user.id}`} className="user-detail">
            {user.name}
          </Link>
        </td>
        <td>{user.company.name}</td>
      </tr>
    </tbody>
  )
}
