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

/**
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
   * for fetch post detail data
   */
  const postDetailFetcher = async () => {
    const res = await FETCHER(`${API_URL}${POST_END_POINT}/${postUrlParams[2]}`)
    const tempPostData = await res.json()
    setPostData(tempPostData)
  }

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
    const tempCommentData = await res.json()
    setCommentData(tempCommentData)
  }
  const toggleComments = () => {
    !showComments && !commentData.length && fetchCommentList()
    setShowComments(!showComments)
  }

  return (
    <div className="post-detail">
      {postData.length === 0 ? (
        <Loader />
      ) : (
        <div>
          <span className="d-flex justify-content-between mb-8">
            <h2>
              {postData.title.charAt(0).toUpperCase()}
              {postData.title.slice(1)}
            </h2>
            <Button className="btn btn-outline-danger">
              <TrashIcon />
              <span className="ml-8">Delete</span>
            </Button>
          </span>
          <div>
            {postData.body.charAt(0).toUpperCase()}
            {postData.body.slice(1)}
          </div>
          <div className="comment-wrapper">
            <h3 className="comment-heading">Comments</h3>
            <Button
              className="text-white bg-dark"
              onClick={() => toggleComments()}
            >
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
 * for show comments
 */

const CommentUI = ({ comment, currIndex }) => {
  return (
    <tbody>
      <tr>
        <td>{currIndex}</td>
        <td>{comment.name}</td>
        <td>{comment.body}</td>
      </tr>
    </tbody>
  )
}
