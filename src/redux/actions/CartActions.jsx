import axios from "axios";
import {
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM,
} from "./../constants/CartConstants";

export const addToCartActions =
  (id, qty, size, sizeUpdate) => async (dispatch, getState) => {
    dispatch({
      type: CART_ADD_ITEM_REQUEST,
    });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM_SUCCESS,
      payload: {
        product: data._id,
        name: data.name,
        price: data.price,
        sizes: data.sizes,
        color: data.color,
        image: data.images[0],
        qty,
        size,
        sizeUpdate,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeItemCartActions =
  (id, size) => async (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: { id, size },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
