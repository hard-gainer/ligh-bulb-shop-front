import { combineReducers } from "redux"
import cartReducer from "./cartReducer"
import authReducer from "./authReducer"
import catalogReducer from "./catalogReducer"
import ordersReducer from "./ordersReducer"

export default combineReducers({
  cart: cartReducer,
  auth: authReducer,
  catalog: catalogReducer,
  orders: ordersReducer,
})
