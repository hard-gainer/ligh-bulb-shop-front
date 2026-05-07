const initial = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
}

export default function authReducer(state = initial, action) {
  switch (action.type) {
    case "auth/loading":
      return { ...state, loading: true, error: null }
    case "auth/setTokens":
      return {
        ...state,
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
      }
    case "auth/setUser":
      return { ...state, user: action.payload, loading: false }
    case "auth/logout":
      return { ...initial }
    case "auth/error":
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
