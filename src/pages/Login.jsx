import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { users, user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // where to go after login (set by ProtectedRoute), default to events
  const from = location.state?.from || "/events";

  if (user) return <Navigate to="/events" replace />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = users.find(
      (u) =>
        u.email.toLowerCase() === form.email.trim().toLowerCase() &&
        u.password === form.password
    );

    if (!found) {
      setError("Invalid email or password");
      return;
    }

    dispatch(login({ id: found.id, name: found.name, email: found.email }));
    navigate(from, { replace: true });
  };

  return (
    <div className="auth-card">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} />
        </div>

        {error && <p className="field-error">{error}</p>}

        <button type="submit">Login</button>
      </form>
      <p className="muted">
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}