import { combineReducers } from "redux";

import shoppingCartReducer from "./shoppingCartReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  shoppingCartReducer,
  user: userReducer,
});

export default rootReducer;
