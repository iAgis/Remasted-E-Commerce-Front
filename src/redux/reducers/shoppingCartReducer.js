function shoppingCartReducer(shoppingCart = [], action) {
  switch (action.type) {
    case "ADD_ITEM":
      return shoppingCart.some((item) => item.id === action.payload.product.id)
        ? shoppingCart.map((item) => {
            if (item.id !== action.payload.product.id) return item;
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity,
            };
          })
        : [
            { ...action.payload.product, quantity: action.payload.quantity },
            ...shoppingCart,
          ];
    case "REMOVE_ITEM":
      return shoppingCart.filter((item) => item.id !== action.payload);
    case "INCREMENT_QUANTITY":
      return shoppingCart.map((item) => {
        if (item.id !== action.payload) return item;
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    case "DECREMENT_QUANTITY":
      return shoppingCart.map((item) => {
        if (item.id !== action.payload) return item;
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      })
    case "EMPTY_CART":
      return [];
    default:
      return shoppingCart;
  }
}

export default shoppingCartReducer;
