import * as actionTypes from "../../../shared/actionTypes"
import axios from "../../../axiosPalettes"

export const postPaletteInit = () => {
  return {
    type: actionTypes.POST_PALETTE_INIT
  }
}

export const postPaletteSuccess = palette => {
  return {
    type: actionTypes.POST_PALETTE_SUCCESS,
    palette: palette
  }
}

export const postPaletteFail = error => {
  return {
    type: actionTypes.POST_PALETTE_FAIL,
    error: error
  }
}

export const postPaletteStart = () => {
  return {
    type: actionTypes.POST_PALETTE_START
  }
}

export const postPalette = (palatteData, token) => {
  return dispatch => {
    dispatch(postPaletteStart())
    axios
      .post("/palettes.json?auth=" + token, palatteData)
      .then(response => {
        dispatch(postPaletteSuccess(response.data))
      })
      .catch(error => {
        dispatch(postPaletteFail(error))
      })
  }
}
