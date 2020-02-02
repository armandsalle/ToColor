import * as actionTypes from "../../../shared/actionTypes"
import axios from "axios"

export const updatePaletteLike = (palette, indexId) => {
  return {
    type: actionTypes.UPDATE_PALETTE_LIKE,
    indexId: indexId,
    likes: palette.likes
  }
}

export const setFiltre = filtre => {
  return {
    type: actionTypes.SET_FILTRE,
    filtre: filtre
  }
}

export const fetchPalettesSuccess = palettes => {
  return {
    type: actionTypes.FETCH_PALETTES_SUCCESS,
    palettes: palettes
  }
}

export const fetchPalettesFail = error => {
  return {
    type: actionTypes.FETCH_PALETTES_FAIL,
    error: error
  }
}

export const fetchPalettesStart = () => {
  return {
    type: actionTypes.FETCH_PALETTES_START
  }
}

export const fetchPalettes = () => {
  return dispatch => {
    dispatch(fetchPalettesStart())

    axios
      .get(`https://tocolor-c1acd.firebaseio.com/palettes.json`)
      .then(res => {
        const fetchedPalettes = []

        for (let key in res.data) {
          fetchedPalettes.push({
            ...res.data[key],
            id: key
          })
        }

        fetchedPalettes.sort(() => 0.5 - Math.random())

        dispatch(fetchPalettesSuccess(fetchedPalettes))
      })
      .catch(err => {
        dispatch(fetchPalettesFail(err))
      })
  }
}
