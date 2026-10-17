import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "../features/events/eventsSlice";
import authReducer from "../features/auth/authSlice";
import registrationsReducer from "../features/registrations/registrationsSlice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    auth: authReducer,
    registrations: registrationsReducer,
  },
});

store.subscribe(() => {
  const { auth, registrations } = store.getState();
  localStorage.setItem("users", JSON.stringify(auth.users));
  localStorage.setItem("currentUser", JSON.stringify(auth.user));
  localStorage.setItem("registrations", JSON.stringify(registrations.items));
});