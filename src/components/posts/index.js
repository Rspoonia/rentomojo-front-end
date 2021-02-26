import React, { useEffect, useState } from 'react'
import {
  API_URL,
  FETCHER,
  POST_END_POINT,
  USER_ID,
  USER_END_POINT,
} from '../../constant'
import Loader from '../loader/loader'
import Post from './post'
import { PopupModal } from '../modal'

export default function UserPostDetails(props) {
  const userId = props.location.pathname.split('/')[2] ?? ''
  /**
   * for store user detail of id
   */
  const [userDetail, setUserDetail] = useState([])
  /**
   * for store user data
   */
  const [userData, setUserData] = useState([])
  /**
   * for show alert message on api response error
   */
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
   * TODO: need to create repository file for all api
   * for fetch user posts details
   */
  const userDetailFetcher = async () => {
    try {
      const res = await FETCHER(
        `${API_URL}${POST_END_POINT}?${USER_ID}=${+userId}&skip=0&limit=10`
      )
      if (res.status === 200) {
        const userDetails = await res.json()
        setUserDetail(userDetails)
      } else {
        setShow(true)
      }
    } catch (err) {
      console.error(err)
    }
  }
  /**
   * fetch user detail
   */
  const fetchUserData = async () => {
    const res = await FETCHER(`${API_URL}${USER_END_POINT}/${userId}`)
    if (res.status === 200) {
      const resUserData = await res.json()
      setUserData(resUserData)
    } else {
      setShow(true)
    }
  }

  useEffect(() => {
    userId && fetchUserData()
    userId && userDetailFetcher()
  }, [])

  const refetchListAction = () => {
    setShow(false)
    userData.length === 0 && fetchUserData()
    userDetail.length === 0 && userDetailFetcher()
  }

  return (
    <section>
      {userDetail.length === 0 && !show ? (
        <Loader />
      ) : (
        <>
          <PopupModal
            show={show}
            setShow={setShow}
            confirmAction={refetchListAction}
            message={message}
          />
          <div className="post-detail">
            <h3>{userData.name}</h3>
            <div>
              address: {userData.address?.street ?? ''},{' '}
              {userData.address?.city ?? ''}
            </div>
            <div>company: {userData.company?.name ?? ''}</div>
            <div className="post-wrapper">
              {userDetail.map((post) => (
                <Post post={post} key={post.title} />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  )
}
