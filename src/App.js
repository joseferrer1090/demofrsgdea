import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import "./App.scss";

const loading = () => (
  // <div className="animated fadeIn pt-3 text-center">Loading...</div>
  <div
    className=""
    style={{
      margin: "0",
      position: "absolute",
      top: "50%",
      left: "50%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }}
  >
    <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
    <p>Loading ... </p>
  </div>
);

// Containers
const DefaultLayout = Loadable({
  loader: () => import("./containers/DefaultLayout"),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import("./views/Pages/Login"),
  loading
});

const Register = Loadable({
  loader: () => import("./views/Pages/Register"),
  loading
});

const Page404 = Loadable({
  loader: () => import("./views/Pages/Page404"),
  loading
});

const Page500 = Loadable({
  loader: () => import("./views/Pages/Page500"),
  loading
});

const Forgot = Loadable({
  loader: () => import("./views/Pages/Forgot/Forgot"),
  loading
});

const ViewMiddleware = Loadable({
  loader: () => import("./views/Pages/ViewMiddleware/ViewMiddleware"),
  loading
});

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" name="Login Page" component={Login} />
          <Route exact path="/forgot" name="forgot" component={Forgot} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route
            exact
            path="/middleware"
            name="Middleware security"
            component={ViewMiddleware}
          />
          <Route path="/" name="Inicio" component={DefaultLayout} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
