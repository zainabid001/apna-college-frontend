import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import rootReducer from "./_reducers";

const persistConfig = {
    key: "project",
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});
export const persistor = persistStore(store);