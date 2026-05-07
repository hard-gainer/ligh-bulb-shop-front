const initial = {
  currentOrder: null,
  loading: false,
  error: null,
}

export default function ordersReducer(state = initial, action) {
  switch (action.type) {
    case "orders/loading":
      return { ...state, loading: true, error: null }
    case "orders/setCurrentOrder":
      return { ...state, loading: false, currentOrder: action.payload }
    case "orders/error":
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
