import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEvents } from "../features/events/eventsSlice";

export default function Events() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Events</h1>
      {list.map((event) => (
        <div key={event.id}>
          <img src={event.images?.[0]?.url} alt={event.name} width="200" />
          <h3>{event.name}</h3>
          <p>{event.dates?.start?.localDate}</p>
          <p>{event._embedded?.venues?.[0]?.name}</p>
          <Link to={`/events/${event.id}`}>View details</Link>
        </div>
      ))}
    </div>
  );
}