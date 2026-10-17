import { createSlice } from "@reduxjs/toolkit";

// read from localStorage safely (bad or missing data won't crash the app)
const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: loadFromStorage("users", []),       // every registered account
    user: loadFromStorage("currentUser", null), // the logged-in user, or null
  },
  reducers: {
    register: (state, action) => {
      state.users.push({ id: Date.now().toString(), ...action.payload });
    },
    login: (state, action) => {
      state.user = action.payload; // { id, name, email }
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;