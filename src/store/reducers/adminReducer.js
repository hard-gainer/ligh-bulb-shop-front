const initial = {
  products: [],
  orders: [],
  categories: [],
  promos: [],
  loading: false,
  error: null,
}

export default function adminReducer(state = initial, action) {
  switch (action.type) {
    case "admin/loading":
      return { ...state, loading: true, error: null }
    case "admin/setProducts":
      return { ...state, loading: false, products: action.payload }
    case "admin/addProduct":
      return { ...state, products: [...state.products, action.payload] }
    case "admin/updateProduct":
      return {
        ...state,
        products: state.products.map(p =>
          p.product_id === action.payload.product_id ? action.payload : p
        ),
      }
    case "admin/removeProduct":
      return {
        ...state,
        products: state.products.filter(p => p.product_id !== action.payload),
      }
    case "admin/setOrders":
      return { ...state, loading: false, orders: action.payload }
    case "admin/updateOrder":
      return {
        ...state,
        orders: state.orders.map(o =>
          o.order_id === action.payload.order_id ? action.payload : o
        ),
      }
    case "admin/setCategories":
      return { ...state, categories: action.payload }
    case "admin/addCategory":
      return { ...state, categories: [...state.categories, action.payload] }
    case "admin/setPromos":
      return { ...state, loading: false, promos: action.payload }
    case "admin/addPromo":
      return { ...state, promos: [...state.promos, action.payload] }
    case "admin/error":
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
