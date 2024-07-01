import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { setLayoutNavRight } from "./reducers/LayoutNavRightReducers";
import {
  productDetailsReducers,
  productLatestsReducers,
  productListsReducers,
  productsRelatedReducers,
} from "./reducers/ProductReducers";
import { cartReducer } from "./reducers/CartReducers";

const reducer = combineReducers({
  layoutNavRight: setLayoutNavRight,
  productLatests: productLatestsReducers,
  productLists: productListsReducers,
  productDetails: productDetailsReducers,
  cart: cartReducer,
  productsRelated: productsRelatedReducers,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
