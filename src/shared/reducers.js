import { combineReducers } from "redux"
import authReducer from "../features/containers/Auth"
import likeReducer from "../features/containers/Likes"
import palettesReducer from "../features/containers/Home"
import createReducer from "../features/containers/Create"

const reducers = combineReducers({ auth: authReducer, palettes: palettesReducer, create: createReducer, likes: likeReducer })

export default reducers
