import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import blogService from "../features/blogs/blogService";
import blogReducer from "../features/blogs/blogSlice";
import categoryReducer from "../features/category/categorySlice";
import authReducer from "../features/auth/authSlice"


export const store = configureStore({
  reducer: {
    auth:authReducer,
    blogs:blogReducer,
    categories:categoryReducer,

  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;