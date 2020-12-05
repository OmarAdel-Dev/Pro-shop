export const cartItemsReducers = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const tempItem = action.payload;
      const existItem = state.cartItems.find(
        (item) => item.product === tempItem.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === tempItem.product ? tempItem : item
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, tempItem] };
      }
    case "CART_REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    default:
      return state;
  }
};
