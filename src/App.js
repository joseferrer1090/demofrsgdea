import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Loadable from "react-loadable";
import "./App.scss";
import Conglomerado from "./views/Conglomerado/Conglomerado";
import { decode } from "jsonwebtoken";

// isAuthenticate
const isAuthenticate = () => {
  const token = localStorage.getItem("auth_token");
  const auth = sessionStorage.getItem("auth_token");
  try {
    if (token !== null && auth !== null) {
      return true;
    } else if (token !== null && auth === null) {
      return false;
    } else if (token === null && auth === null) {
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
};

const verifyToken = () => {
  const auth = sessionStorage.getItem("auth_token");
  const token = localStorage.getItem("auth_token");

  const aux = decode(auth);
  const exp = aux.exp;
  const now = new Date().getTime() / 1000;

  try {
    if (now < exp && auth != null && token !== null) {
      return true;
    } else if (exp === null && now !== null) {
      return false;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      try {
        if (verifyToken()) {
          return <Component {...props} />;
        } else if (isAuthenticate()) {
          return <Component {...props} />;
        } else {
          return <div />;
        }
      } catch (error) {
        return <Redirect to={{ pathname: "/logout" }} />;
      }
    }}
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

const Logout = Loadable({
  loader: () => import("./views/Pages/Logout/Logout"),
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
          <Route path="/logout" name="Logout" component={Logout} />
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
