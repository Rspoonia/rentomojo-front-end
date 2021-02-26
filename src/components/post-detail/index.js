import React, { useEffect, useState } from 'react'
import Loader from '../loader/loader'
import {
  API_URL,
  FETCHER,
  POST_END_POINT,
  COMMENTS_POINT,
} from '../../constant'
import { TrashIcon } from '../images/trashIcon'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { PopupModal } from '../modal'
/**
 * TODO: needs to add animation
 * for show post detail with comments
 */

export default function PostDetail(props) {
  const postUrlParams = props.location.pathname.split('/') ?? []
  /**
   * for toggle comments
   */
  const [showComments, setShowComments] = useState(false)
  /**
   * for store post detail
   */
  const [postData, setPostData] = useState([])
  /**
   * for get list of comments of a particular post
   */
  const [commentData, setCommentData] = useState([])

  /**
   * for get list of comments of a particular post
   */
  const [showAlert, setShowAlert] = useState(false)
  /**
   * for show erro messages
   */
  const [message, setMessage] = useState({
    modalHeading: '',
    modalMessage: '',
    isError: false,
  })

  /**
   * for fetch post detail data
   */
  const postDetailFetcher = async () => {
    const res = await FETCHER(`${API_URL}${POST_END_POINT}/${postUrlParams[2]}`)
    if (res.status === 200) {
      const tempPostData = await res.json()
      setPostData(tempPostData)
    } else {
      setShowAlert(true)
      setMessage({
        modalHeading: 'Alert',
        modalMessage: "Oop's, something went wrong, please try again later",
        isError: true,
      })
    }
  }
  /**
   * for get data while page load
   */
  useEffect(() => {
    postDetailFetcher()
  }, [])
  /**
   * for show and hide comments
   */
  const fetchCommentList = async () => {
    const res = await FETCHER(
      `${API_URL}${COMMENTS_POINT}?postId=${postUrlParams[2]}`
    )
    if (res.status === 200) {
      const tempCommentData = await res.json()
      setCommentData(tempCommentData)
    } else {
      setShowAlert(true)
      setMessage({
        modalHeading: 'Alert',
        modalMessage: "Oop's, something went wrong, please try again later",
        isError: true,
      })
    }
  }
  const toggleComments = () => {
    !showComments && !commentData.length && fetchCommentList()
    setShowComments(!showComments)
  }
  /**
   * need to fix delete request
   * confirm and write headers
   */
  const deleteReqHandler = async () => {
    const res = await FETCHER(
      `${API_URL}sss${POST_END_POINT}/${postUrlParams[2]}`,
      {
        method: 'DELETE',
      }
    )
    if (res.code === 200) {
      props.history.push('/')
    } else {
      setShowAlert(true)
      setMessage({
        modalHeading: 'Alert',
        modalMessage: "Oop's, something went wrong, please try again later",
        isError: true,
      })
    }
  }
  const deletePostHandler = () => {
    setMessage({
      modalHeading: 'Alert',
      modalMessage: 'Are you sure to want to Delete this post',
      isError: false,
    })
    setShowAlert(true)
  }
  const primaryModalAction = () => {
    setShowAlert(false)
    if (message.isError) {
      !postData.length && postDetailFetcher()
      postData.id && fetchCommentList()
    } else {
      deleteReqHandler()
    }
  }

  return (
    <div className="post-detail">
      {postData.length === 0 && !showAlert ? (
        <Loader />
      ) : (
        <div>
          <PopupModal
            show={showAlert}
            setShow={setShowAlert}
            confirmAction={primaryModalAction}
            message={message}
          />
          <span className="d-flex justify-content-between mb-8">
            <h2>
              {postData.title?.charAt(0).toUpperCase() ?? ''}
              {postData.title?.slice(1) ?? ''}
            </h2>
            <Button
              className="btn btn-outline-danger"
              onClick={() => deletePostHandler()}
            >
              <TrashIcon />
              <span className="ml-8">Delete</span>
            </Button>
          </span>
          <div>
            {postData.body?.charAt(0).toUpperCase() ?? ''}
            {postData.body?.slice(1) ?? ''}
          </div>
          <div className="comment-wrapper">
            <h3 className="comment-heading">Comments</h3>
            <Button className="comment-button" onClick={() => toggleComments()}>
              {showComments ? 'Hide Comments' : 'Show Comments'}
            </Button>
          </div>
          {showComments &&
            (!commentData.length ? (
              <Loader />
            ) : (
              <>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Comments</th>
                    </tr>
                  </thead>
                  {commentData.map((comment, index) => (
                    <CommentUI
                      comment={comment}
                      key={comment.id}
                      currIndex={index}
                    />
                  ))}
                </Table>
              </>
            ))}
        </div>
      )}
    </div>
  )
}

/**
 * for show comments with random time
 */

const CommentUI = ({ comment, currIndex }) => {
  return (
    <tbody>
      <tr>
        <td>{currIndex + 1}</td>
        <td>
          <div>{comment.name}</div>
          <div className="comment-time">
            {parseInt(Math.random() * 24)} Hours ago
          </div>
        </td>
        <td>{comment.body}</td>
      </tr>
    </tbody>
  )
}
