import { configureStore } from "@reduxjs/toolkit";
import itemsReucer from "./items";
import dataReucer from "./data";

const store = configureStore({
  reducer: {
    items: itemsReucer,
    data: dataReucer,
  },
});

export default store;
