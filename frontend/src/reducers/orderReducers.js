export const orderReducers = (
  state = {},
  action
) => {
  switch (action.type) {
    case "ORDER_CREATE_REQUEST":
      return {
        loading: true   
      };
    case "ORDER_CREATE_SUCCESS":
      return {
        ...state,
        loading: false,
        order: action.payload
      };
    case "ORDER_CREATE_FAIL":
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
