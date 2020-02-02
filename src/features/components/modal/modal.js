import React from "react"
import PropTypes from "prop-types"

import "./modal.css"

const Modal = props => {
  const classes = ["modal", props.type]

  return <div className={classes.join(" ")}>{props.message}</div>
}

Modal.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default Modal
