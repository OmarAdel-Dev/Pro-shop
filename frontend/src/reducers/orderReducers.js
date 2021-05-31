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
    case "CLEAR_ORDER_DETAILS":
      return {
        ...state,
        order: null,
        loading: null,
        error: null,
      }
    default:
      return state;
  }
};

export const orderDetailsReducers = (
  state = {},
  action
) => {
  switch (action.type) {
    case "ORDER_DETAILS_REQUEST":
      return {
        loading: true   
      };
    case "ORDER_DETAILS_SUCCESS":
      return {
        ...state,
        loading: false,
        order: action.payload
      };
    case "ORDER_DETAILS_FAIL":
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

