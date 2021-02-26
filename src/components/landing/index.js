import React, { useEffect, useState } from 'react'
import { API_URL, USER_END_POINT, FETCHER } from '../../constant'
import UsersList from './usersList'
import Loader from '../loader/loader'
import Table from 'react-bootstrap/Table'
import { PopupModal } from '../modal'

import './style.css'

export default function Users() {
  /**
   * store all data of user
   */
  const [usersData, setUsersData] = useState([])

  const [message] = useState({
    modalHeading: 'Alert',
    modalMessage: "Oop's something went wrong, please try again letter",
    isError: false,
  })
  /**
   * for show modal while get error or warning
   */
  const [show, setShow] = useState(false)
  /**
   * for fetch data at initial level
   */
  const fetchAllUsersData = async () => {
    /**
     * if user click on false then it should rerender
     */
    setShow(false)
    const res = await FETCHER(`${API_URL}${USER_END_POINT}`)
    if (res.status === 200) {
      const usersData = await res.json()
      setUsersData(usersData)
    } else {
      setShow(true)
    }
  }

  useEffect(() => {
    fetchAllUsersData()
  }, [])

  return (
    <div className="relative main-content">
      {usersData.length === 0 && !show ? (
        <Loader />
      ) : (
        <>
          <PopupModal
            show={show}
            setShow={setShow}
            confirmAction={fetchAllUsersData}
            message={message}
          />
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Company Name</th>
              </tr>
            </thead>
            {usersData?.map((user, index) => (
              <UsersList user={user} key={user.name} tableIndex={index} />
            ))}
          </Table>
        </>
      )}
    </div>
  )
}
