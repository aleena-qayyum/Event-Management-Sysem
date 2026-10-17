import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { fetchEvents } from "../features/events/eventsSlice";

const CATEGORIES = ["Music", "Sports", "Arts & Theatre", "Film", "Miscellaneous"];

export default function Events() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.events);

  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  // initial load
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchEvents({ keyword, city, category }));
  };

  const handleCategory = (cat) => {
    setCategory(cat);
    dispatch(fetchEvents({ keyword, city, category: cat }));
  };

  const handleReset = () => {
    setKeyword("");
    setCity("");
    setCategory("");
    dispatch(fetchEvents());
  };

    return (
    <div>
      <h1>Events</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search events..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" className="btn-outline" onClick={handleReset}>
          Reset
        </button>
      </form>

      <div className="categories">
        <button
          className={`chip ${category === "" ? "active" : ""}`}
          onClick={() => handleCategory("")}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`chip ${category === cat ? "active" : ""}`}
            onClick={() => handleCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <p className="message">Loading events...</p>}
      {error && <p className="message error">Error: {error}</p>}
      {!loading && !error && list.length === 0 && (
        <p className="message">No events found.</p>
      )}

      <div className="grid">
        {!loading && list.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </div>
  );
}