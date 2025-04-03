import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../Utils/Api'; // Use your existing Api.js

// Async API call
export const submitContactForm = createAsyncThunk(
  'contact/submitContactForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/contact', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    loading: false,
    successMessage: '',
    error: null,
  },
  reducers: {
    resetContactState: (state) => {
      state.loading = false;
      state.successMessage = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || 'Form submitted!';
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to submit.';
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
