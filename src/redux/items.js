import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    buying: [],
  },
  reducers: {
    add: (state, action) => {
      state.buying.push(action.payload);
    },
    remove: (state, action) => {
      for (let i = 0; i < state.buying.length; i++) {
        if (state.buying[i].id === action.payload) {
          state.buying.splice(i, 1);
        }
      }
    },
    increaseQuantity: (state, action) => {
      for (let i = 0; i < state.buying.length; i++) {
        if (state.buying[i].id === action.payload) {
          state.buying[i].count++;
        }
      }
    },
    decreaseQuantity: (state, action) => {
      for (let i = 0; i < state.buying.length; i++) {
        if (state.buying[i].id === action.payload) {
          if (state.buying[i].count > 1) state.buying[i].count--;
        }
      }
    },
    clear: (state) => {
      state.buying = [];
    },
  },
});

export const { add, remove, clear, decreaseQuantity, increaseQuantity } =
  itemsSlice.actions;

export default itemsSlice.reducer;
