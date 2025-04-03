// features/contact/contactSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../Utils/Api';
import { API_ENDPOINTS } from '../../Utils/Constant';

export const submitContactForm = createAsyncThunk(
  'contact/submitContactForm',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(API_ENDPOINTS.CONTACT.CREATE, formData);
      return {
        ...res.data, // includes contact
        message: 'Thank you! Your message has been received 👏', // your custom message
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
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
        state.successMessage = action.payload.message || 'Submitted!';
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong.';
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
