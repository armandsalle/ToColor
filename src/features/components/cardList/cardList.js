import React from "react"
import PropTypes from "prop-types"

import "./cardList.css"
import Card from "../card/card"

const CardList = props => {
  const likeHandler = (id, indexId) => {
    props.setLike(id, indexId)
  }

  const checkLiked = card => {
    const likes = props.likes.filter(e => e.likeId === card.id)
    return likes.length > 0
  }

  const cardsItems = props.cards.map((card, index) => (
  <Card key={card.id} id={card.id} indexId={index} likes={card.likes} liked={checkLiked(card)} colors={card.colors} date={card.date} likeHandler={likeHandler} />
  ))

  return <div className="card-list">{cardsItems}</div>
}

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  setLike: PropTypes.func.isRequired
}

export default CardList
