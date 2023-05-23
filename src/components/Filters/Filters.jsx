import React from 'react'
import PropTypes from 'prop-types'

import { filterButtonName } from '../App/App.jsx'

const Filters = ({ filterButtons, onFilterButtonClick }) => {
  return (
    <ul className="filters">
      <li>
        <button className={filterButtons.All} data-button-name={filterButtonName.ALL} onClick={onFilterButtonClick}>
          {filterButtonName.ALL}
        </button>
      </li>
      <li>
        <button
          className={filterButtons.Active}
          data-button-name={filterButtonName.ACTIVE}
          onClick={onFilterButtonClick}
        >
          {filterButtonName.ACTIVE}
        </button>
      </li>
      <li>
        <button
          className={filterButtons.Completed}
          data-button-name={filterButtonName.COMPLETED}
          onClick={onFilterButtonClick}
        >
          {filterButtonName.COMPLETED}
        </button>
      </li>
    </ul>
  )
}

Filters.defaultProps = {
  onFilterButtonClick: () => {},
  filterButtons: [],
}
Filters.propTypes = {
  onFilterButtonClick: PropTypes.func,
  filterButtons: PropTypes.object,
}

export default Filters
