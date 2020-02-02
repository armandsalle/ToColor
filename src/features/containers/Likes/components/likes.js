import React, { useEffect } from "react"
import { connect } from "react-redux"
import * as actions from "../../Home/actions"
import * as likeActions from "../actions"
import { FillSpinner } from "react-spinners-kit"
import Modal from "../../../components/modal/modal"
import PropTypes from "prop-types"

import "../../Home/components/home.css"
import CardList from "../../../components/cardList/cardList"

const Likes = props => {
  const { onFetchPalettes, getUserLikes, userId, token } = props

  useEffect(() => {
    if (userId && token) {
      getUserLikes(userId, token)
    }

    onFetchPalettes()
  }, [getUserLikes, onFetchPalettes, token, userId])

  const setLike = (id, indexId) => {
    props.onLike(props.userId, props.token, props.palettes, id, indexId, props.likes)
  }

  let paletteLiked = []

  props.palettes.forEach(palette => {
    props.likes.forEach(like => {
      if (palette.id === like.likeId) {
        paletteLiked.push(palette)
      }
    })
  })

  let render = (
    <div className="home-container">
      {props.likesError && !props.isAuthenticated ? <Modal type="error" message="Must be login" /> : null}

      <CardList cards={paletteLiked} likes={props.likes} setLike={setLike} />
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

Likes.propTypes = {
  palettes: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  palettesError: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  likesError: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  onFetchPalettes: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    palettes: state.palettes.palettes,
    loading: state.palettes.loading,
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
    onLike: (userId, token, palettes, paletteId, indexId, likes) => dispatch(likeActions.onLike(userId, token, palettes, paletteId, indexId, likes)),
    getUserLikes: (userId, token) => dispatch(likeActions.getUserLikes(userId, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Likes)
