import { combineReducers } from "redux";
import usersReducers from "./usersReducer";
import authenticationReducer from "./authenticationReducer";
import documentaryTypeReducer from "./documentaryTypeReducer";

export default combineReducers({
  users: usersReducers,
  authenticationReducer,
  documentaryTypeReducer
});
