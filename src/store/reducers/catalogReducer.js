const initial = {
  products: [],
  categories: [],
  loading: false,
  error: null,
}

export default function catalogReducer(state = initial, action) {
  switch (action.type) {
    case "catalog/loading":
      return { ...state, loading: true, error: null }
    case "catalog/setProducts":
      return { ...state, loading: false, products: action.payload }
    case "catalog/setCategories":
      return { ...state, categories: action.payload }
    case "catalog/error":
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
