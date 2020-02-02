import React from "react"
import PropTypes from "prop-types"

const Input = props => {
  let inputElement = null

  const inputClasses = []

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push("error")
  }

  switch (props.elementType) {
    case "input":
      inputElement = <input className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} onChange={props.changed} />
      break
    case "textarea":
      inputElement = <textarea className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} onChange={props.changed} />
      break
    case "select":
      inputElement = (
        <select className={inputClasses.join(" ")} value={props.value} onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      )
      break
    default:
      inputElement = <input className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} onChange={props.changed} />
  }

  return (
    <div className="input-container">
      <label>{props.label}</label>
      {inputElement}
    </div>
  )
}

Input.propTypes = {
  invalid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  shouldValidate: PropTypes.object.isRequired,
  elementType: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  changed: PropTypes.func.isRequired
}

export default Input
