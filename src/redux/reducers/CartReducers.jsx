import {
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_RESET,
  CART_REMOVE_ITEM,
} from "./../constants/CartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case CART_ADD_ITEM_SUCCESS: {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (x) => x.product === newItem.product && x.size === newItem.size
      );
      if (existingItemIndex !== -1) {
        if (!newItem.sizeUpdate) {
          return {
            ...state,
            loading: false,
            success: true,
            cartItems: state.cartItems.map((item, index) =>
              index === existingItemIndex
                ? {
                    product: newItem.product,
                    name: newItem.name,
                    price: newItem.price,
                    sizes: newItem.sizes,
                    color: newItem.color,
                    image: newItem.image,
                    qty: newItem.qty,
                    size: newItem.size,
                  }
                : item
            ),
          };
        } else {
          const existingSizeIndex = state.cartItems.findIndex(
            (x) =>
              x.product === newItem.product && x.size === newItem.sizeUpdate
          );
          if (existingSizeIndex !== -1) {
            const updatedCartItems = state.cartItems
              .map((item, index) => {
                if (index === existingSizeIndex) {
                  return {
                    ...item,
                    qty:
                      item.qty + newItem.qty > 49 ? 50 : item.qty + newItem.qty,
                  };
                }
                return item;
              })
              .filter((item, index) => index !== existingItemIndex);
            return {
              ...state,
              loading: false,
              success: true,
              cartItems: updatedCartItems,
            };
          } else {
            return {
              ...state,
              loading: false,
              success: true,
              cartItems: state.cartItems.map((item, index) =>
                index === existingItemIndex
                  ? { ...item, size: newItem.sizeUpdate || item.size }
                  : item
              ),
            };
          }
        }
      } else {
        return {
          ...state,
          loading: false,
          success: true,
          cartItems: [...state.cartItems, newItem],
        };
      }
    }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) =>
            item.product !== action.payload.id ||
            item.size !== action.payload.size
        ),
      };
    case CART_ADD_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
