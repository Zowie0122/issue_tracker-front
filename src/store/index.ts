import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { usersApi } from "../services/usersApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(usersApi.middleware),
});

export default store;
