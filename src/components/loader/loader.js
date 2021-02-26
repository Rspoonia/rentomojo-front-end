import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

export default function Loader() {
  return (
    <Spinner animation="border" variant="primary" className="custom-spinner">
      <span className="sr-only">Loading...</span>
    </Spinner>
  )
}
