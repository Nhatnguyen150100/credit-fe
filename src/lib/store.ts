import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "./reducer/userSlice";
import generalReducer from "./reducer/generalSlice";
import loanApplicationReducer from "./reducer/loanApplicationSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['general']
};

const rootReducer = combineReducers({
  user: userReducer,
  general: generalReducer,
  loanApplication: loanApplicationReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Infer the `IRootState` and `AppDispatch` types from the store itself
export type IRootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
