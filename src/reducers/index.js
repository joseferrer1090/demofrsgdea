import { combineReducers } from "redux";
import typeProcedureReducer from "./typeProcedureReducer";
import authenticationReducer from "./authenticationReducer";
import documentaryTypeReducer from "./documentaryTypeReducer";

export default combineReducers({
  users: typeProcedureReducer,
  authenticationReducer,
  documentaryTypeReducer
});
