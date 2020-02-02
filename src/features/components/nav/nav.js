import React, { useState } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import "./nav.css"
import { connect } from "react-redux"

const Nav = props => {
  const [toggleMenu, setMenu] = useState(false)

  let navItems = (
    <div className="nav-items">
      <Link to="/">Palettes</Link>
      <Link to="/login">Login</Link>
    </div>
  )

  if (props.isAuthenticated) {
    navItems = (
      <div className="nav-items">
        <Link to="/" onClick={() => setMenu(false)}>
          Palettes
        </Link>
        <div className="nav-dots">
          <div className="svg-container" onClick={() => setMenu(!toggleMenu)}>
            <svg width="16" height="4" viewBox="0 0 16 4" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 1.46957 12.2107 0.96086 12.5858 0.585787C12.9609 0.210714 13.4696 0 14 0C14.5304 0 15.0391 0.210714 15.4142 0.585787C15.7893 0.96086 16 1.46957 16 2C16 2.53043 15.7893 3.03914 15.4142 3.41421C15.0391 3.78929 14.5304 4 14 4C13.4696 4 12.9609 3.78929 12.5858 3.41421C12.2107 3.03914 12 2.53043 12 2ZM6 2C6 1.46957 6.21071 0.96086 6.58579 0.585787C6.96086 0.210714 7.46957 0 8 0C8.53043 0 9.03914 0.210714 9.41421 0.585787C9.78929 0.96086 10 1.46957 10 2C10 2.53043 9.78929 3.03914 9.41421 3.41421C9.03914 3.78929 8.53043 4 8 4C7.46957 4 6.96086 3.78929 6.58579 3.41421C6.21071 3.03914 6 2.53043 6 2ZM0 2C0 1.46957 0.210714 0.96086 0.585786 0.585787C0.960859 0.210714 1.46957 0 2 0C2.53043 0 3.03914 0.210714 3.41421 0.585787C3.78929 0.96086 4 1.46957 4 2C4 2.53043 3.78929 3.03914 3.41421 3.41421C3.03914 3.78929 2.53043 4 2 4C1.46957 4 0.960859 3.78929 0.585786 3.41421C0.210714 3.03914 0 2.53043 0 2Z" />
            </svg>
          </div>

          <div className="menu" style={{ display: toggleMenu ? "flex" : "none" }}>
            <Link to="/likes" onClick={() => setMenu(false)}>
              My likes
            </Link>
            <Link to="/create" onClick={() => setMenu(false)}>
              Create
            </Link>
            <Link to="/logout" onClick={() => setMenu(false)}>
              Logout
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <nav>
      <div className="logo">
        <Link to="/">ToColor</Link>
      </div>
      {navItems}
    </nav>
  )
}

Nav.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Nav)
