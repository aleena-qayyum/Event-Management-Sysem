import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://app.ticketmaster.com/discovery/v2";
const API_KEY = import.meta.env.VITE_TM_API_KEY;
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const { keyword, category, city, date } = filters;

      const params = new URLSearchParams({
        apikey: API_KEY,
        size: "20",
        sort: "date,asc",
        // only upcoming events: start from right now
        startDateTime: date || new Date().toISOString().split(".")[0] + "Z",
      });

      if (keyword) params.append("keyword", keyword);
      if (category) params.append("classificationName", category);
      if (city) params.append("city", city);

      const res = await fetch(`${BASE_URL}/events.json?${params}`);
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      return data._embedded?.events || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/events/${id}.json?apikey=${API_KEY}`);
      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearSelected } = eventsSlice.actions;
export default eventsSlice.reducer;