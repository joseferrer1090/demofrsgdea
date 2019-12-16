import { combineReducers } from "redux";
import usersReducers from "./usersReducer";
import authenticationReducer from "./authenticationReducer";

export default combineReducers({
  users: usersReducers,
  authenticationReducer
});
