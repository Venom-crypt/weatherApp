const ForecastSkeleton = ({ type = "hourly" }) => {
  if (type === "daily") {
    return (
      <div className="skeleton-grid">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="skeleton skeleton-daily" key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="hourly-reveal-grid">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="skeleton skeleton-hourly" key={index} />
      ))}
    </div>
  );
};

export default ForecastSkeleton;
