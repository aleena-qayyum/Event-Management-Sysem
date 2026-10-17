import { createSlice } from "@reduxjs/toolkit";
import { loadFromStorage } from "../../utils/storage";
// read from localStorage safely (bad or missing data won't crash the app)


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