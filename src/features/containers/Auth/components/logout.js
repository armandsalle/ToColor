import React, { useEffect } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from "../actions"
import PropTypes from "prop-types"

const Logout = props => {
  const { onLogout } = props

  useEffect(() => {
    onLogout()
  }, [onLogout])

  return <Redirect to="/" />
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)
