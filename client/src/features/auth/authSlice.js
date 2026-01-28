import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/services/api";

// ----------------- Async Thunks -----------------

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      await api.post("/auth/register", userData);
      // Auto-login logic
      const loginRes = await api.post("/auth/login", {
        email: userData.email,
        password: userData.password,
      });
      // Synchronize with Interceptor
      localStorage.setItem("accessToken", loginRes.data.accessToken);
      localStorage.setItem("refreshToken", loginRes.data.refreshToken);
      return loginRes.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", userData);
      // Synchronize with Interceptor
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
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
      return rejectWithValue(err.response?.data?.message || "Failed to load user");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await api.post("/auth/logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  } catch (err) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return rejectWithValue(err.response?.data?.message);
  }
});

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data.message; // Success message from backend
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to send reset email");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/auth/reset-password/${token}`, { password });
      return response.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Reset failed or token expired");
    }
  }
);

// ----------------- Slice -----------------


// Helper to handle successful auth (DRY - Don't Repeat Yourself)
const handleAuthSuccess = (state, action) => {
  state.loading = false;
  state.isAuthenticated = true;
  state.user = action.payload.user;
  state.role = action.payload.user?.role; // Fix for nested server response
  state.initialLoading = false;
  state.error = null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
    initialLoading: !!localStorage.getItem("accessToken"), // Wait if token exists
    loading: false,
    error: null,
    role: null,
    message: null,
  },
  reducers: {
    setInitialLoading: (state, action) => {
      state.initialLoading = action.payload;
    },
    clearError: (state) => { state.error = null; },
    clearMessage: (state) => { state.message = null; },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, handleAuthSuccess) // Using the helper
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, handleAuthSuccess) // Using the helper
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOAD USER (Refresh handling)
      .addCase(loadUser.fulfilled, handleAuthSuccess) // Using the helper
      .addCase(loadUser.rejected, (state) => {
        state.user = null;
        state.role = null;
        state.isAuthenticated = false;
        state.initialLoading = false;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.role = null;
        state.loading = false;
      })
      
      // FORGOT/RESET PASSWORD (Keep your existing logic)
      .addCase(forgotPassword.pending, (state) => { state.loading = true; })
      .addCase(forgotPassword.fulfilled, (state, action) => { 
        state.loading = false; 
        state.message = action.payload; 
      })
      .addCase(resetPassword.fulfilled, (state, action) => { 
        state.loading = false; 
        state.message = action.payload; 
      });
  },
});

export const { setInitialLoading, clearError, clearMessage } = authSlice.actions;

export default authSlice.reducer;
