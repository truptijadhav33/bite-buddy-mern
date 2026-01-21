import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const fetchGalleryItems = createAsyncThunk(
    "gallery/fetchGalleryItems",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/gallery");
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Failed to fetch gallery items");
        }
    }
);

export const createGalleryItem = createAsyncThunk(
    "gallery/createGalleryItem",
    async (itemData, { rejectWithValue }) => {
        try {
            const response = await api.post("/gallery", itemData);
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Failed to create gallery item");
        }
    }
);

export const deleteGalleryItem = createAsyncThunk(
    "gallery/deleteGalleryItem",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/gallery/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Failed to delete gallery item");
        }
    }
);

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const gallerySlice = createSlice({
    name: "gallery",
    initialState,
    reducers: {
        clearGalleryError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
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
            .addCase(createGalleryItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deleteGalleryItem.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    },
});

export const { clearGalleryError } = gallerySlice.actions;
export default gallerySlice.reducer;
