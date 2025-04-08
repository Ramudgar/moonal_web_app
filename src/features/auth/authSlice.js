import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../Utils/Api";
import { API_ENDPOINTS } from "../../Utils/Constant";

// 🔐 LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post(API_ENDPOINTS.AUTH.LOGIN, userData, {
        withCredentials: true, // send and accept cookies
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ FETCH CURRENT USER
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(API_ENDPOINTS.AUTH.ME, {
        withCredentials: true,
      });
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 🔓 LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post(API_ENDPOINTS.AUTH.LOGOUT, {}, {
        withCredentials: true,
      });
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ⚙️ RESET PASSWORD
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ VERIFY EMAIL
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 🔁 CHANGE PASSWORD
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 🧠 AUTH SLICE
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    error: null,
    successMessage: "",
    isUserChecked: false, // ✅ new flag
  },
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔐 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.successMessage = action.payload.message || "Logged in!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 👤 GET ME
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isUserChecked = false;

      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isUserChecked = true; // ✅ set to true when user is fetched

      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
        state.isUserChecked = true; // ✅ important

      })

      // 🔓 LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.successMessage = "Logged out successfully.";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
