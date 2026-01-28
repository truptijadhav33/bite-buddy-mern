import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/services/api";

// 1. Fetch Items
export const fetchGalleryItems = createAsyncThunk(
  "gallery/fetchGalleryItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/gallery");
      // Since our controller returns { success: true, data: [...] }
      return response.data.data || response.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);

// 2. Create Item (Now supports FormData)
export const createGalleryItem = createAsyncThunk(
  "gallery/createGalleryItem",
  async (formData, { rejectWithValue }) => {
    try {
      // NOTE: Axios automatically sets 'Content-Type: multipart/form-data' 
      // when it detects formData as the body.
      const response = await api.post("/gallery", formData);
      
      // Our controller returns { success: true, data: newItem }
      return response.data.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Upload failed");
    }
  }
);

// 3. Delete Item
export const deleteGalleryItem = createAsyncThunk(
  "gallery/deleteGalleryItem",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/gallery/${id}`);
      return id; // Return ID so we can filter it out of the UI
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearGalleryError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      // Fetching
      .addCase(fetchGalleryItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGalleryItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGalleryItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Creating
      .addCase(createGalleryItem.fulfilled, (state, action) => {
        // Add the new item to the beginning of the list (so it shows at the top)
        state.items.unshift(action.payload);
      })
      // Deleting
      .addCase(deleteGalleryItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export const { clearGalleryError } = gallerySlice.actions;
export default gallerySlice.reducer;
