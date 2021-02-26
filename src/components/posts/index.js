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
   * for fetch user posts details
   */
  const userDetailFetcher = async () => {
    try {
      const res = await FETCHER(
        `${API_URL}${POST_END_POINT}?${USER_ID}=${+userId}&skip=0&limit=10`
      )
      const userDetails = await res.json()
      setUserDetail(userDetails)
    } catch (err) {
      console.error(err)
    }
  }
  /**
   * fetch user detail
   */
  const fetchUserData = async () => {
    const res = await FETCHER(`${API_URL}${USER_END_POINT}/${userId}`)
    const userData = await res.json()
    setUserData(userData)
  }

  useEffect(() => {
    userId && fetchUserData()
    userId && userDetailFetcher()
  }, [])

  return (
    <section>
      {userDetail.length === 0 ? (
        <Loader />
      ) : (
        <div className="post-detail">
          <h3>{userData.name}</h3>
          <div>
            address: {userData.address.street ?? ''},{' '}
            {userData.address.city ?? ''}
          </div>
          <div>company: {userData.company.name ?? ''}</div>
          <div className="post-wrapper">
            {userDetail.map((post) => (
              <Post post={post} key={post.title} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
