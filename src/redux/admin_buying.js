import { createSlice } from "@reduxjs/toolkit";

export const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState: {
    order: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.order.push(action.payload);
    },
    removeOrder: (state, action) => {
      for (let i = 0; i < state.buying.length; i++) {
        if (state.buying[i].id === action.payload) {
          state.buying.splice(i, 1);
        }
      }
    },
    increaseOrderQuantity: (state, action) => {
      for (let i = 0; i < state.buying.length; i++) {
        if (state.buying[i].id === action.payload) {
          state.buying[i].count++;
        }
      }
    },
    decreaseOrderQuantity: (state, action) => {
      for (let i = 0; i < state.buying.length; i++) {
        if (state.buying[i].id === action.payload) {
          if (state.buying[i].count > 1) state.buying[i].count--;
        }
      }
    },
    clearOrder: (state) => {
      state.buying = [];
    },
  },
});

export const { addOrder, removeOrder, clearOrder, decreaseOrderQuantity, increaseOrderQuantity } =
  adminOrderSlice.actions;

export default adminOrderSlice.reducer;
