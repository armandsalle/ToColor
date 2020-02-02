import React from "react"
import PropTypes from "prop-types"

import "./button.css"

const Button = props => {
  const classes = ["button", props.type]

  return (
    <button className={classes.join(" ")} onClick={props.clicked} disabled={props.disabled}>
      {props.children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(["success", "error"]).isRequired,
  clicked: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired
}

export default Button
