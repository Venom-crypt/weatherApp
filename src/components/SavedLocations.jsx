const SavedLocations = (props) => {
  const {
    favoriteCities,
    recentSearches,
    onSelectSavedLocation,
    onRemoveFavorite,
  } = props;

  return (
    <div className="saved-locations-panel">
      <div className="saved-section">
        <div className="section-header compact-header">
          <p className="section-eyebrow">Saved Places</p>
          <h2 className="section-title">Favorite Cities</h2>
        </div>

        {favoriteCities.length > 0 ? (
          <div className="saved-chip-list">
            {favoriteCities.map((city) => (
              <div className="saved-chip" key={city.id}>
                <button
                  className="saved-city-button"
                  type="button"
                  onClick={() => onSelectSavedLocation(city)}
                >
                  {city.displayName}
                </button>

                <button
                  className="remove-city-button"
                  type="button"
                  onClick={() => onRemoveFavorite(city.id)}
                  aria-label={`Remove ${city.displayName}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-saved-text">No favorite cities yet.</p>
        )}
      </div>

      <div className="saved-section">
        <div className="section-header compact-header">
          <p className="section-eyebrow">History</p>
          <h2 className="section-title">Recent Searches</h2>
        </div>

        {recentSearches.length > 0 ? (
          <div className="saved-chip-list">
            {recentSearches.map((city) => (
              <button
                className="recent-city-button"
                type="button"
                key={city.id}
                onClick={() => onSelectSavedLocation(city)}
              >
                {city.displayName}
              </button>
            ))}
          </div>
        ) : (
          <p className="empty-saved-text">Recent searches will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default SavedLocations;
