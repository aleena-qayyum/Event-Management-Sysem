import { Routes, Route, Navigate } from "react-router-dom";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/events" />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDetails />} />
    </Routes>
  );
}