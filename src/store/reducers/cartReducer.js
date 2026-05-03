export default function cartReducer(state = [], action) {
  switch (action.type) {
    case "cart/add": {
      const exists = state.find(item => item.product_id === action.payload.product_id);
      if (exists) {
        return state.map(item =>
          item.product_id === action.payload.product_id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, qty: 1 }];
    }
    case "cart/remove":
      return state.filter(item => item.product_id !== action.payload);
    case "cart/setQty":
      return state.map(item =>
        item.product_id === action.payload.product_id
          ? { ...item, qty: action.payload.qty }
          : item
      );
    case "cart/clear":
      return [];
    default:
      return state;
  }
}
