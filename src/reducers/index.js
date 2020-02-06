import { combineReducers } from "redux";
import typeProcedureReducer from "./typeProcedureReducer";
import authenticationReducer from "./authenticationReducer";
import documentaryTypeReducer from "./documentaryTypeReducer";
import alertReducer from "./alert.Reducer";

export default combineReducers({
  typeProcedureReducer,
  authenticationReducer,
  documentaryTypeReducer,
  alertReducer
});
