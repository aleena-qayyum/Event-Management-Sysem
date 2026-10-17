import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "../features/events/eventsSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    auth: authReducer,
  },
});

// save auth data to localStorage whenever the store changes
store.subscribe(() => {
  const { auth } = store.getState();
  localStorage.setItem("users", JSON.stringify(auth.users));
  localStorage.setItem("currentUser", JSON.stringify(auth.user));
});