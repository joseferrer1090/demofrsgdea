import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/ie11"; // For IE 11 support
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store/store";
import { I18nextProvider } from "react-i18next";
import i18n from "./config/i18n";
import { createBrowserHistory } from "history";
import $ from "jquery";
import "jquery";
import "./../node_modules/jquery-ui-dist/jquery-ui.min.js";
window.$ = window.jQuery = window.jquery = $;

// import {loadConglomerados} from "./actions/actionsCreators";

// store.dispatch(loadConglomerados());

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
