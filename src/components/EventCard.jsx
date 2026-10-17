import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const venue = event._embedded?.venues?.[0]?.name;
  const category = event.classifications?.[0]?.segment?.name;

  return (
    <div className="card">
      <img src={event.images?.[0]?.url} alt={event.name} />
      <div className="card-body">
        <h3>{event.name}</h3>
        <p className="muted">{event.dates?.start?.localDate}</p>
        {venue && <p className="muted">{venue}</p>}
        {category && <p className="muted">{category}</p>}
        <Link to={`/events/${event.id}`} className="btn">
          View details
        </Link>
      </div>
    </div>
  );
}