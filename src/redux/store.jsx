import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { setLayoutNavRight } from "./reducers/LayoutNavRightReducers";
import {
  productDetailsReducers,
  productLatestsReducers,
  productListsReducers,
} from "./reducers/ProductReducers";

const reducer = combineReducers({
  layoutNavRight: setLayoutNavRight,
  productLatests: productLatestsReducers,
  productLists: productListsReducers,
  productDetails: productDetailsReducers,
});

const middleware = [thunk];
const initialState = {};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
