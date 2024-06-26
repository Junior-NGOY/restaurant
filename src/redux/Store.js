import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";

export const Store = configureStore({
  reducer: {
    CartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
