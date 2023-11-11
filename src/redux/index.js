import store from "./store";
import {
  add,
  remove,
  clear,
  decreaseQuantity,
  increaseQuantity,
} from "./items";
import {
  addOrder,
  removeOrder,
  clearOrder,
  decreaseOrderQuantity,
  increaseOrderQuantity,
} from "./admin_buying";
import {
  setMainBanners,
  setMostSold,
  setNewProducts,
  setStockBanners,
} from "./data";

export {
  store,
  add,
  remove,
  clear,
  decreaseQuantity,
  increaseQuantity,
  setMainBanners,
  setMostSold,
  setNewProducts,
  setStockBanners,
  addOrder,
  clearOrder,
  decreaseOrderQuantity,
  increaseOrderQuantity,
  removeOrder,
};
