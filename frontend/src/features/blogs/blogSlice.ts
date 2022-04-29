import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import blogService from './blogService'

interface InitalState {
  blogs:  Array<any>;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  blog:object;
  
}

const initialState: InitalState = {
  blogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  blog:{}
};

// Get all the blogs
export const getAllBlogs:any = createAsyncThunk(
  "blog/get",
  async (thunkAPI) => {
    try {
      return await blogService.getAllBlogs();
    } catch (error) {}
  }
);

// Blog Slice
export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    reset: (state:any) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state:any) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state:any, action: PayloadAction<any>) => {
        state.isLoading = true;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload;
        state.blogs = [];
      })
    },
});
export const { reset } = blogSlice.actions
export default blogSlice.reducer