import { Link } from "react-router-dom";
import { formatDate, formatTime, dateParts } from "../utils/format";

export default function EventCard({ event }) {
  const venue = event._embedded?.venues?.[0];
  const category = event.classifications?.[0]?.segment?.name;
  const genre = event.classifications?.[0]?.genre?.name;
  const localDate = event.dates?.start?.localDate;
  const time = formatTime(event.dates?.start?.localTime);
  const parts = dateParts(localDate);
  const image =
    event.images?.find((img) => img.ratio === "16_9" && img.width >= 600) ||
    event.images?.[0];

  return (
    <article className="event-card">
      <div className="event-card-media">
        {image ? (
          <img src={image.url} alt={event.name} loading="lazy" />
        ) : (
          <div className="img-placeholder">No image</div>
        )}
        {parts && (
          <div className="date-badge">
            <span className="date-day">{parts.day}</span>
            <span className="date-month">{parts.month}</span>
          </div>
        )}
        {category && <span className="category-tag">{category}</span>}
      </div>

      <div className="event-card-body">
        <h3 className="event-title">{event.name}</h3>

        <ul className="event-meta">
          <li>
            <span className="meta-icon">📅</span>
            <span>{formatDate(localDate)}</span>
          </li>
          {time && (
            <li>
              <span className="meta-icon">🕒</span>
              <span>{time}</span>
            </li>
          )}
          {venue?.name && (
            <li>
              <span className="meta-icon">📍</span>
              <span>
                {venue.name}
                {venue.city?.name && `, ${venue.city.name}`}
              </span>
            </li>
          )}
          {genre && genre !== "Undefined" && (
            <li>
              <span className="meta-icon">🎟️</span>
              <span>{genre}</span>
            </li>
          )}
        </ul>

        <Link to={`/events/${event.id}`} className="btn btn-block">
          View details
        </Link>
      </div>
    </article>
  );
}