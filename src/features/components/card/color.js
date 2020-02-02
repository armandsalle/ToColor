import React, { useState } from "react"
import PropTypes from "prop-types"

const Color = props => {
  const [isCopied, setCopied] = useState(false)

  const copy = color => {
    navigator.clipboard.writeText(color)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <div className="color" style={{ backgroundColor: props.color }}>
      <p onClick={() => copy(props.color)}>{props.color}</p>
      <div className="popin-copied" style={{ display: isCopied ? "block" : "none" }}>
        copied!
      </div>
    </div>
  )
}

Color.propTypes = {
  color: PropTypes.string.isRequired
}

export default Color
