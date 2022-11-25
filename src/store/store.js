import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { contactsApi } from "./contacts/apiSlice";
import { nodeServerApi } from "./user/serverApiSlice";

export default configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    [nodeServerApi.reducerPath]: nodeServerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      contactsApi.middleware,
      nodeServerApi.middleware,
    ]),
});
