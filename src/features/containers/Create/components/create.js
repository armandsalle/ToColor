import React from "react"
import * as actions from "../actions"
import { connect } from "react-redux"
import { FillSpinner } from "react-spinners-kit"
import PropTypes from "prop-types"

import "./create.css"
import CreateCard from "../../../components/createCard/createCard"
import { Redirect } from "react-router-dom"

const Create = props => {
  const { initNewPalette } = props

  initNewPalette()

  if (!props.isAuthenticated) {
    return <Redirect to="/" />
  }

  const submitHandler = colors => {
    const newPalette = {
      colors,
      likes: 0,
      id: colors
        .map(color => color.slice(1))
        .join("")
        .toLowerCase(),
      date: new Date(),
      userId: props.userId
    }

    props.onPostPalette(newPalette, props.token)
  }

  let render = (
    <div className="create-section">
      <div className="sub-title">Create a palette</div>
      <CreateCard submit={submitHandler} />
    </div>
  )

  if (props.loading) {
    render = (
      <div className="spinner">
        <FillSpinner size={50} color="#282828" loading={props.loading} />
      </div>
    )
  }

  if (props.palette) {
    render = <Redirect to="/" />
  }

  return render
}

Create.propTypes = {
  palette: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  token: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onPostPalette: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    palette: state.create.palette !== null,
    loading: state.create.loading,
    error: state.create.error,
    userId: state.auth.userId,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initNewPalette: () => dispatch(actions.postPaletteInit()),
    onPostPalette: (palette, token) => dispatch(actions.postPalette(palette, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create)
