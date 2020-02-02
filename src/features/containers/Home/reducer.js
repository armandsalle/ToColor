import * as actionTypes from "../../../shared/actionTypes"
import { updateObject } from "../../../shared/utility"
import update from "react-addons-update"

const initialState = {
  palettes: [],
  loading: false,
  error: null,
  filtre: "new"
}

const setFiltre = (state, action) => {
  const paletteFiltered = [...state.palettes]

  if (action.filtre === "popular") {
    paletteFiltered.sort((a, b) => b.likes - a.likes)
  } else if (action.filtre === "random") {
    paletteFiltered.sort(() => 0.5 - Math.random())
  } else if (action.filtre === "new") {
    paletteFiltered.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  return updateObject(state, { filtre: action.filtre, palettes: paletteFiltered })
}

const fetchPalettesStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const fetchPalettesSuccess = (state, action) => {
  return updateObject(state, {
    palettes: action.palettes,
    loading: false
  })
}

const fetchPalettesFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error })
}

const updatePaletteLike = (state, action) => {
  return update(state, {
    palettes: {
      [action.indexId]: {
        likes: { $set: action.likes }
      }
    },
    loading: { $set: false }
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FILTRE:
      return setFiltre(state, action)
    case actionTypes.FETCH_PALETTES_START:
      return fetchPalettesStart(state, action)
    case actionTypes.FETCH_PALETTES_SUCCESS:
      return fetchPalettesSuccess(state, action)
    case actionTypes.FETCH_PALETTES_FAIL:
      return fetchPalettesFail(state, action)
    case actionTypes.UPDATE_PALETTE_LIKE:
      return updatePaletteLike(state, action)

    default:
      return state
  }
}

export default reducer
