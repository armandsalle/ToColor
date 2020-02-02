import React, { useState } from "react"
import Button from "../button/button"
import PropTypes from "prop-types"

import Input from "./input"
import { updateObject, checkValidity } from "../../../shared/utility"

import "./authForm.css"

const AuthForm = props => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your email"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  })

  const [formIsValid, setFormIsValid] = useState(false)

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, controls[controlName].validation),
        touched: true
      })
    })

    let formIsValid = true

    for (let inputIdentifiers in updatedControls) {
      formIsValid = updatedControls[inputIdentifiers].valid && formIsValid
    }

    //console.log(a)
    setControls(updatedControls)
    setFormIsValid(formIsValid)
  }

  const formElementsArray = []

  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    })
  }

  let form = formElementsArray.map(el => (
    <Input
      elementType={el.config.elementType}
      elementConfig={el.config.elementConfig}
      value={el.config.value}
      key={el.id}
      invalid={!el.config.valid}
      touched={el.config.touched}
      shouldValidate={el.config.validation}
      changed={event => inputChangedHandler(event, el.id)}
    />
  ))

  return (
    <form className="auth-form" onSubmit={e => props.submitForm(e, controls.email.value, controls.password.value)}>
      {form}
      <Button type="success" disabled={!formIsValid}>
        {props.btnText}
      </Button>
    </form>
  )
}

AuthForm.propTypes = {
  btnText: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired
}

export default AuthForm
