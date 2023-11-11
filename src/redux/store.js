import { configureStore } from "@reduxjs/toolkit";
import itemsReucer from "./items";
import adminOrderReucer from "./admin_buying";
import dataReucer from "./data";

const store = configureStore({
  reducer: {
    items: itemsReucer,
    adminOrder: adminOrderReucer,
    data: dataReucer,
  },
});

export default store;
