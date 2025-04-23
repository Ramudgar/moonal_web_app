import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../Utils/Constant";
import api from "../../Utils/Api";
// get all galleryies with event
export const getGallery = createAsyncThunk(
  "gallery/getGallery",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(API_ENDPOINTS.GALLERY.GET_ALL_WITH_EVENT);
    //  console.log("res", res.data.data);
      return res.data; // { data: [...] }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 📤 update Gallery thunk
export const updateGallery = createAsyncThunk(
  "gallery/updateGallery",
  async ({ eventId, formData }, { rejectWithValue }) => {
    try {
      const res = await api.put(
        API_ENDPOINTS.GALLERY.UPDATE(eventId),
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

//   slice for gallery
const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    loading: false,
    error: null,
    success: null,
    gallery: [],
  },
  reducers: {
    resetGalleryState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getGallery.fulfilled, (state, action) => {
        state.loading = false;
        state.success = null;
        state.gallery = action.payload.data || [];
      })
      .addCase(getGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch gallery.";
      })
      .addCase(updateGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateGallery.fulfilled, (state, action) => {
        state.loading = false;
        state.success =
          action.payload.message || "Gallery updated successfully!";
      })
      .addCase(updateGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update gallery.";
      });
  },
});

export const { resetGalleryState } = gallerySlice.actions;
export default gallerySlice.reducer;
