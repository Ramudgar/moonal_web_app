import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Utils/Api";
import { API_ENDPOINTS } from "../../Utils/Constant";

export const createDelearship = createAsyncThunk(
  "delearship/postDelearship",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(API_ENDPOINTS.DELEARSHIP.CREATE, formData);
      return {
        ...res.data,
        message: "Thank you! Your message has been received 👏",
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const delearshipSlice = createSlice({
  name: "delearship",
  initialState: {
    loading: false,
    successMessage: "",
    error: null,
  },
  reducers: {
    resetDelearshipState: (state) => {
      state.loading = false;
      state.successMessage = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDelearship.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDelearship.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || "Submitted!";
      })
      .addCase(createDelearship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong.";
      });
  },
});

export const { resetDelearshipState } = delearshipSlice.actions;
export default delearshipSlice.reducer;
