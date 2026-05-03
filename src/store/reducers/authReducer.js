export default function authReducer(state = { user: null }, action) {
  switch (action.type) {
    case "auth/setUser":
      return { ...state, user: action.payload };
    case "auth/logout":
      return { user: null };
    default:
      return state;
  }
}
