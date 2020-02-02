import React, { useEffect } from "react"
import { connect } from "react-redux"
import * as actions from "../actions"
import * as likeActions from "../../Likes"
import { FillSpinner } from "react-spinners-kit"
import Modal from "../../../components/modal/modal"
import PropTypes from "prop-types"

import "./home.css"
import Filters from "../../../components/filters/filters"
import CardList from "../../../components/cardList/cardList"

const Home = props => {
  const { onFetchPalettes, onSetFiltre, getUserLikes, userId, token } = props

  useEffect(() => {
    if (userId && token) {
      getUserLikes(userId, token)
    }

    onFetchPalettes()
  }, [getUserLikes, onFetchPalettes, token, userId])

  const setLike = (id, indexId) => {
    props.onLike(props.userId, props.token, props.palettes, id, indexId, props.likes)
  }

  let render = (
    <div className="home-container">
      {props.likesError && !props.isAuthenticated ? <Modal type="error" message="Must be login" /> : null}
      <Filters setFiltre={onSetFiltre} />
      <CardList cards={props.palettes} likes={props.likes} setLike={setLike} />
    </div>
  )

  if (props.loading) {
    render = (
      <div className="spinner">
        <FillSpinner size={50} color="#282828" loading={props.loading} />
      </div>
    )
  }

  return render
}

Home.propTypes = {
  palettes: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  palettesError: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  likesError: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  onFetchPalettes: PropTypes.func.isRequired,
  onSetFiltre: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    palettes: state.palettes.palettes,
    loading: state.palettes.loading,
    filtre: state.palettes.filtre,
    palettesError: state.palettes.error,
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
    token: state.auth.token,
    likesError: state.likes.error,
    likes: state.likes.likes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPalettes: () => dispatch(actions.fetchPalettes()),
    onSetFiltre: filtre => dispatch(actions.setFiltre(filtre)),
    onLike: (userId, token, palettes, paletteId, indexId, likes) => dispatch(likeActions.onLike(userId, token, palettes, paletteId, indexId, likes)),
    getUserLikes: (userId, token) => dispatch(likeActions.getUserLikes(userId, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
