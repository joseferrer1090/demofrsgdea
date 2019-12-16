import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Loadable from "react-loadable";
import "./App.scss";
import Conglomerado from "./views/Conglomerado/Conglomerado";
import { decode } from "jwt-decode";

// isAuthenticate
const isAuthenticate = () => {
  const token = localStorage.getItem("auth_token");
  try {
    if (token !== null) {
      return true;
    } else {
      return false;
    }
    // Aqui tengo descomponer el token y guardar los datos
    // para crear el HOC de los permisos
    // por el momento esta asi
    // toca optimizar el redux para el login
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticate() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/404" }} />
      )
    }
  />
);

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

const ResetPassword = Loadable({
  loader: () => import("./views/Pages/Forgot/ResetPassword/ResetPassword"),
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
          <Route
            exact
            path="/reset-password"
            name="Reset Password"
            component={ResetPassword}
          />
          <Route path="/404" name="Page 404" component={Page404} />
          <PrivateRoute
            exact
            path="/middleware"
            name="Middleware security"
            component={ViewMiddleware}
          />
          <PrivateRoute path="/" name="Inicio" component={DefaultLayout} />
          {/* <Route path="/404" name="Page 404" component={Page404} />
          <Route path="/500" name="Page 500" component={Page500} /> */}
          {/* <Route path="*" component={Page404} /> */}
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
