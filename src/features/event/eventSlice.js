import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../Utils/Constant";
import api from "../../Utils/Api";

// this is for creating an event
export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(API_ENDPOINTS.EVENTS.CREATE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// create a slice for event
const eventSlice = createSlice({
  name: "event",
  initialState: {
    loading: false,
    error: null,
    successMessage: "",
    events: [],
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.events.push(action.payload.data);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearState } = eventSlice.actions;
export default eventSlice.reducer;
