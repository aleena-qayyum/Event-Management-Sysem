import { createSlice } from "@reduxjs/toolkit";
import { loadFromStorage } from "../../utils/storage";

const registrationsSlice = createSlice({
  name: "registrations",
  initialState: {
    items: loadFromStorage("registrations", []),
  },
  reducers: {
    registerForEvent: (state, action) => {
      const { userId, event } = action.payload;
      const alreadyRegistered = state.items.some(
        (r) => r.userId === userId && r.event.id === event.id
      );
      if (alreadyRegistered) return; // safety net against duplicates

      state.items.push({
        id: `${userId}_${event.id}`,
        userId,
        event,
      });
    },
    cancelRegistration: (state, action) => {
      const { userId, eventId } = action.payload;
      state.items = state.items.filter(
        (r) => !(r.userId === userId && r.event.id === eventId)
      );
    },
  },
});

export const { registerForEvent, cancelRegistration } = registrationsSlice.actions;
export default registrationsSlice.reducer;