import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/services/api";

// Async thunks
export const fetchCategories = createAsyncThunk("menu/fetchCategories", async () => {
  const response = await api.get("/categories");
  return response.data; // Expecting an array of strings
});

export const fetchMenuItems = createAsyncThunk(
    "menu/fetchMenuItems",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/menu");
            // CHANGE: response.data IS the array [{}, {}]
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch menu items");
        }
    }
);

export const createMenuItem = createAsyncThunk(
    "menu/createMenuItem",
    async (itemData, { rejectWithValue }) => {
        try {
            // Axios will automatically send this as JSON
            const response = await api.post("/menu", itemData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to create menu item");
        }
    }
);

export const deleteMenuItem = createAsyncThunk(
    "menu/deleteMenuItem",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/menu/${id}`); // Ensure your API route is correct
            return id; // Return the ID so we can filter it out of the state
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

const initialState = {
    items: [],
    categories: ["Starters", "Main Course", "Desserts", "Beverages", "Sides"],
    loading: false,
    error: null,
};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        clearMenuError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Categories
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                // This ensures state.categories is ALWAYS an array
                state.categories = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Menu Items
            .addCase(fetchMenuItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMenuItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchMenuItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Menu Item
            .addCase(createMenuItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Delete Menu Item
            .addCase(deleteMenuItem.fulfilled, (state, action) => {
                // This is the critical part for the UI to update!
                state.items = state.items.filter((item) => item._id !== action.payload);
                state.loading = false;
            })
    },
});

export const { clearMenuError } = menuSlice.actions;
export default menuSlice.reducer;
