import React from 'react';
import './styles.css'
function Filter({text,value,handler=()=>{}}) {
  return (
    <label className="filter">
      <input
        className={`filter-input filter-input--${value}`}
        type="radio"
        name="filter"
        value={value}
        onChange={handler}
      />
      <span className="filter-text">{text}</span>
    </label>
  )
}
export default Filter