const SearchBar = props => {
  const {
    searchInput,
    setSearchInput,
    onSearchSubmit,
    isSearching,
  } = props

  return (
    <form className="search-form" onSubmit={onSearchSubmit}>
      <input
        type="search"
        className="search-input"
        placeholder="Search city, example: Chennai"
        value={searchInput}
        onChange={event => setSearchInput(event.target.value)}
      />

      <button className="search-button" type="submit">
        {isSearching ? '...' : 'Search'}
      </button>
    </form>
  )
}

export default SearchBar