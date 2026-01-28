import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/orders/cartSlice";
import menuReducer from "../features/menu/menuSlice";
import orderReducer from "../features/orders/orderSlice";
import tableReducer from "../features/tables/tableSlice";
import galleryReducer from "../features/gallery/gallerySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    menu: menuReducer,
    orders: orderReducer,
    tables: tableReducer,
    gallery: galleryReducer,
  },
});
