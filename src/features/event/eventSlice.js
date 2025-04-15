import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../Utils/Constant";
import api from "../../Utils/Api";

// 📤 Create Event
export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(API_ENDPOINTS.EVENTS.CREATE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data; // { message, data }
    } catch (err) {
      return rejectWithValue(
        err.response?.data.error || err.response?.data || err.message
      );
    }
  }
);

// 📥 Get All Events
export const getEvents = createAsyncThunk(
  "event/getEvents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(API_ENDPOINTS.EVENTS.GET_ALL_WITH_GALLERY);
      return res.data; // { data: [...] }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// update event with gallery
export const updateEventWithGallery = createAsyncThunk(
  "event/updateEventWithGallery",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await api.put(
        API_ENDPOINTS.EVENTS.UPDATE_WITH_GALLERY(id),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data; // { message, data }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  successMessage: "",
  events: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = "";
    },
    resetSuccessMessage: (state) => {
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // 👉 Create Event
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload.message || "Event created successfully.";
        // ❌ Don't push manually — getEvents() should be triggered on success in the component
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create event.";
      })

      // 👉 Get All Events
      .addCase(getEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.data || [];
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch events.";
      })
      // 👉 Update Event with Gallery
      .addCase(updateEventWithGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEventWithGallery.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload.message || "Event updated successfully.";
        // ❌ Don't push manually — getEvents() should be triggered on success in the component
      })
      .addCase(updateEventWithGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update event.";
      });
  },
});

export const { clearState, resetSuccessMessage } = eventSlice.actions;
export default eventSlice.reducer;
