import * as actionTypes from "../../../shared/actionTypes"
import { updateObject } from "../../../shared/utility"

const initialState = {
  likes: [],
  loading: false,
  error: null
}

const postLikeError = (state, action) => {
  return updateObject(state, { error: action.error })
}

const postLikeStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const postLikeSuccess = (state, action) => {
  return updateObject(state, { loading: false })
}

const setLikeUserStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const setLikeUserSuccess = (state, action) => {
  return updateObject(state, { loading: false })
}

const setLikeUserFail = (state, action) => {
  return updateObject(state, { error: action.error })
}

const getUserLikesSuccess = (state, action) => {
  return updateObject(state, { likes: action.likes })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_LIKE_START:
      return postLikeStart(state, action)
    case actionTypes.POST_LIKE_SUCCESS:
      return postLikeSuccess(state, action)
    case actionTypes.POST_LIKE_FAIL:
      return postLikeError(state, action)
    case actionTypes.SET_USER_LIKE_START:
      return setLikeUserStart(state, action)
    case actionTypes.SET_USER_LIKE_SUCCESS:
      return setLikeUserSuccess(state, action)
    case actionTypes.SET_USER_LIKE_FAIL:
      return setLikeUserFail(state, action)
    case actionTypes.GET_USER_LIKES_SUCCESS:
      return getUserLikesSuccess(state, action)

    default:
      return state
  }
}

export default reducer
