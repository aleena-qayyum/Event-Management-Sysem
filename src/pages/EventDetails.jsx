import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById, clearSelected } from "../features/events/eventsSlice";
import {
  registerForEvent,
  cancelRegistration,
} from "../features/registrations/registrationsSlice";

export default function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected: event, selectedLoading, selectedError } = useSelector(
    (state) => state.events
  );
  const user = useSelector((state) => state.auth.user);
  const registrations = useSelector((state) => state.registrations.items);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchEventById(id));
    setMessage("");
    return () => dispatch(clearSelected());
  }, [dispatch, id]);

  if (selectedLoading) return <p className="message">Loading event...</p>;
  if (selectedError) return <p className="message error">Error: {selectedError}</p>;
  if (!event) return null;

  const venue = event._embedded?.venues?.[0];
  const classification = event.classifications?.[0];
  const price = event.priceRanges?.[0];
  const image =
    event.images?.find((img) => img.ratio === "16_9" && img.width > 1000) ||
    event.images?.[0];

  const isRegistered =
    user && registrations.some((r) => r.userId === user.id && r.event.id === event.id);

  const handleRegister = () => {
    dispatch(
      registerForEvent({
        userId: user.id,
        event: {
          id: event.id,
          name: event.name,
          date: event.dates?.start?.localDate,
          time: event.dates?.start?.localTime,
          image: image?.url,
          venue: venue?.name,
          city: venue?.city?.name,
          category: classification?.segment?.name,
          url: event.url,
        },
      })
    );
    setMessage("You have successfully registered for this event!");
  };

  const handleCancel = () => {
    dispatch(cancelRegistration({ userId: user.id, eventId: event.id }));
    setMessage("Your registration has been cancelled.");
  };

  return (
    <div>
      <Link to="/events">← Back to events</Link>
      <div className="details">
        <h1>{event.name}</h1>
        {image && <img src={image.url} alt={event.name} />}

        <p>
          <strong>Date:</strong> {event.dates?.start?.localDate}
          {event.dates?.start?.localTime && ` at ${event.dates.start.localTime}`}
        </p>
        <p><strong>Venue:</strong> {venue?.name}</p>
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
          <p><strong>Price:</strong> {price.min} - {price.max} {price.currency}</p>
        )}
        {event.info && <p>{event.info}</p>}

        {message && <p className="alert">{message}</p>}

        <div className="actions">
          {!user ? (
            <Link to="/login" state={{ from: `/events/${id}` }} className="btn">
              Login to register
            </Link>
          ) : isRegistered ? (
            <>
              <button disabled>Registered ✓</button>
              <button className="btn-outline" onClick={handleCancel}>
                Cancel registration
              </button>
            </>
          ) : (
            <button onClick={handleRegister}>Register for this event</button>
          )}

          {event.url && (
            <a href={event.url} target="_blank" rel="noreferrer" className="btn btn-outline">
              View on Ticketmaster
            </a>
          )}
        </div>
      </div>
    </div>
  );
}