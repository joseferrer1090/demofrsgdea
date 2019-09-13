import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

// const conglomerates = (state = [], action) => {
//     if(action.type === "REPLACE_CONGLOMERATES"){
//         return action.conglomerates;
//     }
//     return state;
// }

export default createStore(combineReducers({}), applyMiddleware(thunk));
