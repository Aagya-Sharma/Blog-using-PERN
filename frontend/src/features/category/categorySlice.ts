import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import categoryService from './categoryService'

interface InitalState {
  categories:  Array<any>;
  articles:  Array<any>;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  category:object;
  article:object
  
}

const initialState: InitalState = {
  categories: [],
  articles:[],
  article:{},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  category:{}
};

// Get all the blogs
export const getAllCategories:any = createAsyncThunk(
  "category/get",
  async (thunkAPI) => {
    try {
      return await categoryService.getAllCategories();
    } catch (error) {}
  }
);

// Get all the blogs of a category
export const getBlogsWithCategory:any = createAsyncThunk(
  "category/blogs/get",
  async (categoryId,thunkAPI) => {
    try {
      return await categoryService.getBlogsWithCategory(categoryId);
    } catch (error) {}
  }
);

// Blog Slice
export const categorySlice = createSlice({
  name: "category",
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
      .addCase(getAllCategories.pending, (state:any) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state:any, action: PayloadAction<any>) => {
        state.isLoading = true;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload;
        state.categories = [];
      })
      .addCase(getBlogsWithCategory.pending, (state:any) => {
        state.isLoading = true;
      })
      .addCase(getBlogsWithCategory.fulfilled, (state:any, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.articles = action.payload;
      })
      .addCase(getBlogsWithCategory.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload;
        state.articles = [];
      })
    },
});
export const { reset } = categorySlice.actions
export default categorySlice.reducer