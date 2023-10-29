import { configureStore } from "@reduxjs/toolkit";
import itemsReucer from "./items";

const store = configureStore({
  reducer: {
    items: itemsReucer,
  },
});

export default store;
