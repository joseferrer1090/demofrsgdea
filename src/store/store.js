import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./../reducers";
import thunk from "redux-thunk";

// const initialState = []; => comento esta linea porque ya mi reducers traer el state initial

const store = createStore(
  reducer,
  //initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // applyMiddleware(thunk).__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
