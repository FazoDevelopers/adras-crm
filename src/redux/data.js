import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    main_banners: [],
    news_products: [],
    stock_banners: [],
    most_sold: [],
    categories: [],
  },
  reducers: {
    setMainBanners: (state, action) => {
      state.main_banners = action.payload;
    },
    setNewProducts: (state, action) => {
      state.news_products = action.payload;
    },
    setStockBanners: (state, action) => {
      state.stock_banners = action.payload;
    },
    setMostSold: (state, action) => {
      state.most_sold = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const {
  setMainBanners,
  setNewProducts,
  setStockBanners,
  setMostSold,
  setCategories,
} = dataSlice.actions;

export default dataSlice.reducer;
