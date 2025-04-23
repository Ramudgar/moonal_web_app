// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "../features/contact/contactSlice";
import delearshipReducer from "../features/delearship/delearshipSlice";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice";
import eventReducer from "../features/event/eventSlice";
import galleryReducer from "../features/Gallery/gallerySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
    delearship: delearshipReducer,
    products: productReducer,
    event: eventReducer,
    gallery: galleryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools:
    import.meta.env.MODE !== "production"
      ? {
          name: "Moonal Redux DevTools",
          trace: true, //false in production
          traceLimit: 25,
        }
      : false,

  // preloadedState: {
  //   auth: {
  //     user: null,
  //     loading: false,
  //     error: null,
  //     successMessage: "",
  //   },
  //   contact: {
  //     loading: false,
  //     error: null,
  //     successMessage: "",
  //   },
  //   delearship: {
  //     loading: false,
  //     error: null,
  //     successMessage: "",
  //   },
  // },
  // enhancers: [],
});
