import React from "react"
import PropTypes from "prop-types"
import moment from "moment"

import Color from "./color"
import "./card.css"

const Card = props => {
  const colors = props.colors.map((color, i) => <Color color={color} key={i} />)

  return (
    <div className="card">
      <div className="colors">{colors}</div>
      <div className="infos">
        <div className="likes" onClick={() => props.likeHandler(props.id, props.indexId)}>
          <svg width="18" height="16" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" className={props.liked ? 'liked' : null}>
            <path d="M9.00002 15.7917L7.79169 14.6917C3.50002 10.8 0.666687 8.225 0.666687 5.08333C0.666687 2.50833 2.68335 0.5 5.25002 0.5C6.70002 0.5 8.09169 1.175 9.00002 2.23333C9.90835 1.175 11.3 0.5 12.75 0.5C15.3167 0.5 17.3334 2.50833 17.3334 5.08333C17.3334 8.225 14.5 10.8 10.2084 14.6917L9.00002 15.7917Z" />
          </svg>
          <span>{props.likes}</span>
        </div>
        <div className="date">{moment(new Date(props.date), "YYYYMMDD").fromNow(true)}</div>
      </div>
    </div>
  )
}

Card.propTypes = {
  colors: PropTypes.array.isRequired,
  likes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  date: PropTypes.string.isRequired,
  likeHandler: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default Card
