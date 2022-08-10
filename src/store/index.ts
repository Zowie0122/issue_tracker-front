import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import { usersApi } from '../services/usersApi';
import { issuesApi } from '../services/issuesApi';
import { departmentsApi } from '../services/departmentsApi';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [issuesApi.reducerPath]: issuesApi.reducer,
    [departmentsApi.reducerPath]: departmentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(issuesApi.middleware)
      .concat(departmentsApi.middleware),
});

export default store;
