import { apiLogin, apiRegister, apiGetMe, apiRefreshToken } from "../../api/auth"

export function loginUser(email, password) {
  return async function (dispatch) {
    dispatch({ type: "auth/loading" })
    try {
      const tokens = await apiLogin(email, password)
      dispatch({ type: "auth/setTokens", payload: tokens })
      const user = await apiGetMe(tokens.access_token)
      dispatch({ type: "auth/setUser", payload: user })
      return { success: true, user }
    } catch (e) {
      dispatch({ type: "auth/error", payload: e.message })
      return { success: false, error: e.message }
    }
  }
}

export function registerUser(email, password) {
  return async function (dispatch) {
    dispatch({ type: "auth/loading" })
    try {
      const tokens = await apiRegister(email, password)
      dispatch({ type: "auth/setTokens", payload: tokens })
      const user = await apiGetMe(tokens.access_token)
      dispatch({ type: "auth/setUser", payload: user })
      return { success: true }
    } catch (e) {
      dispatch({ type: "auth/error", payload: e.message })
      return { success: false, error: e.message }
    }
  }
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({ type: "auth/logout" })
  }
}

export function restoreSession() {
  return async function (dispatch, getState) {
    const { accessToken, refreshToken } = getState().auth
    if (!accessToken) return

    try {
      const user = await apiGetMe(accessToken)
      dispatch({ type: "auth/setUser", payload: user })
    } catch {
      if (!refreshToken) {
        dispatch({ type: "auth/logout" })
        return
      }
      try {
        const tokens = await apiRefreshToken(refreshToken)
        dispatch({ type: "auth/setTokens", payload: tokens })
        const user = await apiGetMe(tokens.access_token)
        dispatch({ type: "auth/setUser", payload: user })
      } catch {
        dispatch({ type: "auth/logout" })
      }
    }
  }
}
