import React, { useState } from "react"
import { ChromePicker } from "react-color"
import PropTypes from "prop-types"

import Button from "../button/button"

const CreateCard = props => {
  const initialState = ["#F1F1F1", "#DBDBDB", "#C5C5C5", "#A9A9A9"]

  const [colors, setColors] = useState([...initialState])
  const [modal, setModal] = useState({ current: null, isOpen: false })
  const [isDisabled, setDisabled] = useState(true)

  const changeColor = (newColor, index) => {
    let newArr = [...colors]
    newArr[index] = newColor.hex

    setColors(newArr)

    if (colors !== initialState) {
      setDisabled(false)
    }
  }

  const colorCards = colors.map((color, index) => (
    <div className="create-color" key={index}>
      <p>{color}</p>
      <div className="new-color" style={{ backgroundColor: color }} onClick={() => setModal({ current: index, isOpen: !modal.isOpen })}></div>
      <div className="color-picker" style={{ display: modal.isOpen && modal.current === index ? "block" : "none" }}>
        <ChromePicker color={color} onChange={color => changeColor(color, index)} disableAlpha={true} />
      </div>
    </div>
  ))

  return (
    <div className="create-wrapper">
      <div className="create-palette">{colorCards}</div>
      <Button type="success" clicked={() => props.submit(colors)} disabled={isDisabled}>
        Create
      </Button>
    </div>
  )
}

CreateCard.propTypes = {
  submit: PropTypes.func.isRequired
}

export default CreateCard
