import * as actionTypes from "../../../shared/actionTypes"
import { updatePaletteLike } from "../Home"
import axios from "axios"

///////
// Post list of likes for users
///////

export const postUserLikeStart = () => {
  return {
    type: actionTypes.SET_USER_LIKE_START
  }
}

export const postUserDislikeStart = () => {
  return {
    type: actionTypes.SET_USER_DISLIKE_START
  }
}

export const postUserLikeSuccess = () => {
  return {
    type: actionTypes.SET_USER_LIKE_SUCCESS
  }
}

export const postUserLikeFail = error => {
  return {
    type: actionTypes.SET_USER_LIKE_FAIL,
    error: error
  }
}

export const postUserLike = (userId, token, paletteId) => {
  return dispatch => {
    dispatch(postUserLikeStart())

    axios
      .post(`https://tocolor-c1acd.firebaseio.com/users/${userId}/likes.json?auth=${token}`, { likeId: paletteId })
      .then(res => {
        dispatch(getUserLikes(userId, token))
        dispatch(postUserLikeSuccess())
      })
      .catch(err => {
        dispatch(postUserLikeFail(err))
      })
  }
}

export const postUserDislike = (userId, token, paletteId, id) => {
  return dispatch => {
    dispatch(postUserDislikeStart())

    axios
      .delete(`https://tocolor-c1acd.firebaseio.com/users/${userId}/likes/${id}.json?auth=${token}`, { likeId: paletteId })
      .then(res => {
        dispatch(getUserLikes(userId, token))
        dispatch(postUserLikeSuccess())
      })
      .catch(err => {
        dispatch(postUserLikeFail(err))
      })
  }
}

///////
// Get list of likes for users
///////

const getUserLikesSuccess = likes => {
  return {
    type: actionTypes.GET_USER_LIKES_SUCCESS,
    likes: likes
  }
}

const getUserLikesFail = error => {
  return {
    type: actionTypes.GET_USER_LIKES_FAIL,
    error: error
  }
}

const toggleLike = (userId, token, palettes, paletteId, indexId, likes) => {
  return dispatch => {
    const [palette] = palettes.filter(e => e.id === paletteId)

    const likedPalette = likes.filter(e => e.likeId.toString() === palette.id.toString())

    if (likedPalette.length === 0) {
      palette.likes++
      dispatch(postUserLike(userId, token, paletteId))
    } else {
      palette.likes--

      dispatch(postUserDislike(userId, token, paletteId, likedPalette[0].id))
    }

    axios
      .put(`https://tocolor-c1acd.firebaseio.com/palettes/${paletteId}.json?auth=${token}`, palette)
      .then(res => {
        dispatch(updatePaletteLike(palette, indexId))

        dispatch(postLikeSuccess())
      })
      .catch(err => {
        dispatch(postLikeFail(err))
      })
  }
}

export const getUserLikes = (userId, token) => {
  return dispatch => {
    axios
      .get(`https://tocolor-c1acd.firebaseio.com/users/${userId}/likes.json?auth=${token}`)
      .then(res => {
        const fetchedLikes = []

        for (let key in res.data) {
          fetchedLikes.push({
            ...res.data[key],
            id: key
          })
        }

        dispatch(getUserLikesSuccess(fetchedLikes))
      })
      .catch(err => {
        dispatch(getUserLikesFail(err))
      })
  }
}

///////
// Update like in reducer and firebase
///////

export const postLikeStart = () => {
  return {
    type: actionTypes.POST_LIKE_START
  }
}

export const postLikeSuccess = () => {
  return {
    type: actionTypes.POST_LIKE_SUCCESS
  }
}

export const postLikeFail = error => {
  return {
    type: actionTypes.POST_LIKE_FAIL,
    error: error
  }
}

export const onLike = (userId, token, palettes, paletteId, indexId, likes) => {
  return dispatch => {
    dispatch(postLikeStart())

    if (!token || !userId) {
      return dispatch(postLikeFail("Must be login"))
    }

    dispatch(toggleLike(userId, token, palettes, paletteId, indexId, likes))
  }
}
