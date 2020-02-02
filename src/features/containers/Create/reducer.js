import * as actionTypes from "../../../shared/actionTypes"
import { updateObject } from "../../../shared/utility"

const initialState = {
  palette: null,
  loading: false,
  error: null
}

const postPaletteInit = (state, action) => {
  return updateObject(state, { palette: null })
}

const postPaletteStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const postPaletteSuccess = (state, action) => {
  return updateObject(state, {
    palette: action.palette,
    loading: false
  })
}

const postPaletteFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_PALETTE_INIT:
      return postPaletteInit(state, action)
    case actionTypes.POST_PALETTE_START:
      return postPaletteStart(state, action)
    case actionTypes.POST_PALETTE_SUCCESS:
      return postPaletteSuccess(state, action)
    case actionTypes.POST_PALETTE_FAIL:
      return postPaletteFail(state, action)
    default:
      return state
  }
}

export default reducer
