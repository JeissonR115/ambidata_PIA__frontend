function FilterInput({text,type="text",handler=()=>{}}) {
  return (
    <label className="filter">
      <input
        className="filter-input"
        type="radio"
        name="filter"
        value={type}
        onChange={handler}
      />
      <span className="filter-text">{text}</span>
    </label>
  )
}
export default FilterInput