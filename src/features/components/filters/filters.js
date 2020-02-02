import React from "react"

import "./filters.css"

const Filtres = props => {
  return (
    <div className="filters">
      <p className="filtre" onClick={e => props.setFiltre("new")}>
        New
      </p>
      <p className="filtre" onClick={e => props.setFiltre("popular")}>
        Popular
      </p>
      <p className="filtre" onClick={e => props.setFiltre("random")}>
        Random
      </p>
    </div>
  )
}

export default Filtres
