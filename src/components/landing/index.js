import React, { useEffect, useState } from 'react'
import { API_URL, USER_END_POINT, FETCHER } from '../../constant'
import UsersList from './usersList'
import Loader from '../loader/loader'
import Table from 'react-bootstrap/Table'

import './style.css'

export default function Users() {
  const [usersData, setUsersData] = useState([])
  /**
   * for fetch data at initial level
   */
  const fetchAllUsersData = async () => {
    const res = await FETCHER(`${API_URL}${USER_END_POINT}`)
    const usersData = await res.json()
    setUsersData(usersData)
  }

  useEffect(() => {
    fetchAllUsersData()
  }, [])

  return (
    <div className="relative main-content">
      {usersData.length === 0 ? (
        <Loader />
      ) : (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Company Name</th>
            </tr>
          </thead>
          {usersData.map((user, index) => (
            <UsersList user={user} key={user.name} tableIndex={index} />
          ))}
        </Table>
      )}
    </div>
  )
}
