import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/services/api";

// Async thunks
export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async (_, { rejectWithValue }) => {
        try {
            // Update this to match router.get("/my", protect, ...) 
            const response = await api.get("/orders/my"); 
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Failed to fetch orders");
        }
    }
);

export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await api.post("/orders", orderData);
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Failed to create order");
        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    "orders/updateStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/orders/${id}/status`, { status });
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Failed to update order status");
        }
    }
);

const initialState = {
    orders: [],
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        clearOrderError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Orders
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Order
            .addCase(createOrder.fulfilled, (state, action) => {
                state.orders.push(action.payload);
            })
            // Update Order Status
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const index = state.orders.findIndex(ord => ord._id === action.payload._id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            });
    },
});

export const { clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
