import {createStore}  from "redux";
import reducer from "./../reducers";

// const initialState = []; => comento esta linea porque ya mi reducers traer el state initial


 const store = createStore(
    reducer, 
    // initialState, 
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;