import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://app.ticketmaster.com/discovery/v2";
const API_KEY = import.meta.env.VITE_TM_API_KEY;

export const fetchEvents = createAsyncThunk("events/fetchEvents", async (_, { rejectWithValue }) => 
{ try{
    const res = await fetch(
        `${BASE_URL}/events.json?apikey=${API_KEY}&size=20&sort=date,asc`
    );
    if(!res.ok){
        throw new Error(`Request failed (${res.status})`);
    }
    const data = await res.json();
      return data._embedded?.events || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const eventsSlice = createSlice(
    {
        name: 'events',
        initialState:{
            list:[],
            loading:false,
            error:null,
        },
        reducers:{},
        extraReducers: (builder) => {
            builder
                .addCase(fetchEvents.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchEvents.fulfilled, (state, action) =>{
                    state.loading = false;
                    state.list = action.payload;

                })
                .addCase(fetchEvents.rejected, (state, action) =>
                {
                    state.loading = false;
                    state.error = action.payload || "Something went wrong";
                });
            },

    }
);
export default eventsSlice.reducer;