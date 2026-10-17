import { Link } from "react-router-dom";
import { formatDate, formatTime, dateParts } from "../utils/format";

export default function RegisteredEventCard({ event, onCancel }) {
  const parts = dateParts(event.date);
  const time = formatTime(event.time);

  return (
    <article className="event-card">
      <div className="event-card-media">
        {event.image ? (
          <img src={event.image} alt={event.name} loading="lazy" />
        ) : (
          <div className="img-placeholder">No image</div>
        )}
        {parts && (
          <div className="date-badge">
            <span className="date-day">{parts.day}</span>
            <span className="date-month">{parts.month}</span>
          </div>
        )}
        {event.category && <span className="category-tag">{event.category}</span>}
      </div>

      <div className="event-card-body">
        <h3 className="event-title">{event.name}</h3>

        <ul className="event-meta">
          <li>
            <span className="meta-icon">📅</span>
            <span>{formatDate(event.date)}</span>
          </li>
          {time && (
            <li>
              <span className="meta-icon">🕒</span>
              <span>{time}</span>
            </li>
          )}
          {event.venue && (
            <li>
              <span className="meta-icon">📍</span>
              <span>
                {event.venue}
                {event.city && `, ${event.city}`}
              </span>
            </li>
          )}
        </ul>

        <div className="card-actions">
          <Link to={`/events/${event.id}`} className="btn btn-outline">
            Details
          </Link>
          {onCancel && (
            <button className="btn-danger" onClick={() => onCancel(event.id)}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </article>
  );
}