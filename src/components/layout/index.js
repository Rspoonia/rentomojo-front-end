import React from 'react'
import { LogoIcon } from '../images/logo'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="header-menu">
      <Link to="/">
        <LogoIcon />
      </Link>
      <Link to="/">
        <div>Home</div>
      </Link>
    </div>
  )
}
