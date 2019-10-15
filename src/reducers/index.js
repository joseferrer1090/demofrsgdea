import {combineReducers} from "redux";
import usersReducers from "./usersReducer";

export default combineReducers({
    users: usersReducers
});