import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById, clearSelected } from "../features/events/eventsSlice";

export default function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected: event, selectedLoading, selectedError } = useSelector(
    (state) => state.events
  );

  useEffect(() => {
    dispatch(fetchEventById(id));
    return () => dispatch(clearSelected());
  }, [dispatch, id]);

  if (selectedLoading) return <p>Loading event...</p>;
  if (selectedError) return <p>Error: {selectedError}</p>;
  if (!event) return null;

  const venue = event._embedded?.venues?.[0];
  const classification = event.classifications?.[0];
  const price = event.priceRanges?.[0];
  const image =
    event.images?.find((img) => img.ratio === "16_9" && img.width > 1000) ||
    event.images?.[0];

  return (
    <div>
      <Link to="/events">← Back to events</Link>
      <h1>{event.name}</h1>
      {image && <img src={image.url} alt={event.name} width="600" />}

      <p>
        <strong>Date:</strong> {event.dates?.start?.localDate}
        {event.dates?.start?.localTime && ` at ${event.dates.start.localTime}`}
      </p>
      <p>
        <strong>Venue:</strong> {venue?.name}
      </p>
      <p>
        <strong>Location:</strong>{" "}
        {[venue?.address?.line1, venue?.city?.name, venue?.state?.name, venue?.country?.name]
          .filter(Boolean)
          .join(", ")}
      </p>
      <p>
        <strong>Category:</strong>{" "}
        {[classification?.segment?.name, classification?.genre?.name]
          .filter(Boolean)
          .join(" / ")}
      </p>
      {price && (
        <p>
          <strong>Price:</strong> {price.min} - {price.max} {price.currency}
        </p>
      )}
      {event.info && <p>{event.info}</p>}
      {event.url && (
        <a href={event.url} target="_blank" rel="noreferrer">
          View on Ticketmaster
        </a>
      )}
    </div>
  );
}