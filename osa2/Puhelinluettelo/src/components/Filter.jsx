const Filter = ({ filter, handleFilterChange }) => {
    return (
    <div>
    <p>Filter shown with:</p>
    <input value={filter} onChange={handleFilterChange} />
  </div>
  )
}

export default Filter