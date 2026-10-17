import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cancelRegistration } from "../features/registrations/registrationsSlice";
import RegisteredEventCard from "../components/registeredEventCard";

export default function MyEvents() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const allRegistrations = useSelector((state) => state.registrations.items);

  // only this user's events
  const myEvents = allRegistrations
    .filter((r) => r.userId === user?.id)
    .map((r) => r.event);

  // today as YYYY-MM-DD in local time (same format as the API's localDate)
  const today = new Date().toLocaleDateString("en-CA");

  const upcoming = myEvents
    .filter((e) => !e.date || e.date >= today)
    .sort((a, b) => (a.date || "").localeCompare(b.date || ""));

  const completed = myEvents
    .filter((e) => e.date && e.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));

  const handleCancel = (eventId) => {
    if (window.confirm("Cancel your registration for this event?")) {
      dispatch(cancelRegistration({ userId: user.id, eventId }));
    }
  };

  if (myEvents.length === 0) {
    return (
      <div>
        <h1>My Events</h1>
        <p className="message">
          You haven't registered for any events yet.{" "}
          <Link to="/events">Browse events</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>My Events</h1>

      <h2 className="section-title">Upcoming ({upcoming.length})</h2>
      {upcoming.length === 0 ? (
        <p className="message">No upcoming events.</p>
      ) : (
        <div className="grid">
          {upcoming.map((e) => (
            <RegisteredEventCard key={e.id} event={e} onCancel={handleCancel} />
          ))}
        </div>
      )}

      <h2 className="section-title">Completed ({completed.length})</h2>
      {completed.length === 0 ? (
        <p className="message">No completed events.</p>
      ) : (
        <div className="grid">
          {completed.map((e) => (
            <RegisteredEventCard key={e.id} event={e} />
          ))}
        </div>
      )}
    </div>
  );
}