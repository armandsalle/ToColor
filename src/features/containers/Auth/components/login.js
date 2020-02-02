import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import * as actions from "../actions"
import PropTypes from "prop-types"

import { FillSpinner } from "react-spinners-kit"

import "./login.css"
import { Link } from "react-router-dom"
import AuthForm from "../../../components/authForm/authForm"
import Modal from "../../../components/modal/modal"

const Login = props => {
  const onSubmitHandler = (e, email, password) => {
    e.preventDefault()
    props.onAuth(email, password, false)
  }

  let render = (
    <div className="login">
      {props.error ? <Modal type="error" message={props.error.message} /> : null}
      <div className="sub-title">
        Please login to create and likes palette
        <br />
        or
        <br />
        <Link to="/register">create an amazing account</Link>
      </div>
      <AuthForm submitForm={onSubmitHandler} btnText="login"></AuthForm>
    </div>
  )

  if (props.loading) {
    render = (
      <div className="spinner">
        <FillSpinner size={50} color="#282828" loading={props.loading} />
      </div>
    )
  }

  if (props.isAuthenticated) {
    render = <Redirect to={props.authRedirectPath} />
  }

  return render
}

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  isAuthenticated: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  authRedirectPath: PropTypes.string,
  onSetAuthRedirectPath: PropTypes.func
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
