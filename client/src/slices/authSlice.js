import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

// Async thunks
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Registration failed");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", userData);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Login failed");
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Failed to load user");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/forgotpassword", { email });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Failed to send reset link");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/auth/resetpassword/${token}`, { password });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Failed to reset password");
    }
  }
);

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,
  role: null,
  loading: false,
  initialLoading: true, // New: tracks if first loadUser is complete
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setInitialLoading: (state, action) => {
      state.initialLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.role = action.payload.user.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.role = action.payload.user.role;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Load User
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.initialLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data;
        state.role = action.payload.data.role;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.initialLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.role = null;
        localStorage.removeItem("token");
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.role = action.payload.user.role;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, setInitialLoading } = authSlice.actions;
export default authSlice.reducer;
