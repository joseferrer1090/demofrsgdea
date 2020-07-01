import { combineReducers } from "redux";
import typeProcedureReducer from "./typeProcedureReducer";
import authenticationReducer from "./authenticationReducer";
import documentaryTypeReducer from "./documentaryTypeReducer";
import templateMetadata from "./templateMetadataReducer";
import alertReducer from "./alert.Reducer";
import statusCorrespondenceReducer from "./statusCorrespondenceReducer";

export default combineReducers({
  typeProcedureReducer,
  authenticationReducer,
  documentaryTypeReducer,
  templateMetadata,
  alertReducer,
  statusCorrespondenceReducer,
});
