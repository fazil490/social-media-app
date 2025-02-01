import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import postReducer from "./postSlice"
import { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
}

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store)
export default store;
