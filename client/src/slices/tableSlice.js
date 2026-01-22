import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Async thunks
export const fetchTables = createAsyncThunk(
    "tables/fetchTables",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/tables");
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Failed to fetch tables");
        }
    }
);

export const updateTable = createAsyncThunk(
    "tables/updateTable",
    async ({ id, tableData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/tables/${id}`, tableData);
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Failed to update table");
        }
    }
);

const initialState = {
    tables: [],
    loading: false,
    error: null,
};

const tableSlice = createSlice({
    name: "tables",
    initialState,
    reducers: {
        clearTableError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Tables
            .addCase(fetchTables.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTables.fulfilled, (state, action) => {
                state.loading = false;
                state.tables = action.payload;
            })
            .addCase(fetchTables.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Table
            .addCase(updateTable.fulfilled, (state, action) => {
                const index = state.tables.findIndex(tab => tab._id === action.payload._id);
                if (index !== -1) {
                    state.tables[index] = action.payload;
                }
            });
    },
});

export const { clearTableError } = tableSlice.actions;
export default tableSlice.reducer;
