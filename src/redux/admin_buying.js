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
      for (let i = 0; i < state.order.length; i++) {
        if (state.order[i].id === action.payload) {
          state.order.splice(i, 1);
        }
      }
    },
    increaseOrderQuantity: (state, action) => {
      for (let i = 0; i < state.order.length; i++) {
        if (state.order[i].id === action.payload) {
          state.order[i].count++;
        }
      }
    },
    decreaseOrderQuantity: (state, action) => {
      for (let i = 0; i < state.order.length; i++) {
        if (state.order[i].id === action.payload) {
          if (state.order[i].count > 1) state.order[i].count--;
        }
      }
    },
    clearOrder: (state) => {
      state.order = [];
    },
  },
});

export const { addOrder, removeOrder, clearOrder, decreaseOrderQuantity, increaseOrderQuantity } =
  adminOrderSlice.actions;

export default adminOrderSlice.reducer;
