import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

// Async thunks
export const fetchCategories = createAsyncThunk(
    "menu/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/menu/categories");
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Failed to fetch categories");
        }
    }
);

export const fetchMenuItems = createAsyncThunk(
    "menu/fetchMenuItems",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/menu/items");
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Failed to fetch menu items");
        }
    }
);

export const createMenuItem = createAsyncThunk(
    "menu/createMenuItem",
    async (itemData, { rejectWithValue }) => {
        try {
            const response = await api.post("/menu/items", itemData);
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Failed to create menu item");
        }
    }
);

export const deleteMenuItem = createAsyncThunk(
    "menu/deleteMenuItem",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/menu/items/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Failed to delete menu item");
        }
    }
);

const initialState = {
    items: [],
    categories: [],
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
                state.categories = action.payload;
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
                state.items = action.payload;
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
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    },
});

export const { clearMenuError } = menuSlice.actions;
export default menuSlice.reducer;
