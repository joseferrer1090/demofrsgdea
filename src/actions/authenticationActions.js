import { userService } from "./../services/auth/user.services";
import { userConstants } from "./../constants/user.constants";
import { history } from "./../helpers/history";
import { alertActions } from "./alertActions";
import Cookies from "js-cookie";
import decode from "jsonwebtoken";

export const userActions = {
  login,
  logout,
};

function login(username, password, grant_type) {
  return (dispatch) => {
    dispatch(request({ username, password, grant_type }));
    userService.login(username, password, grant_type).then(
      (user) => {
        console.log(user);
        localStorage.setItem("auth_token", user.data.access_token);
        sessionStorage.setItem("auth_token", user.data.access_token);
        dispatch(success(user));
        Cookies.set("auth", `${user.data.access_token}`); // => Creo una cookie para tener el valor del token
        history.replace("/#/middleware");
        window.location.reload(true);
      },
      (user) => {
        if (user.response.status === 400) {
          dispatch(failure(user.response.data.error_description));
          //console.log(user.response.data.error_description);
        }
      }
    );
  };
  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(message) {
    return { type: userConstants.LOGIN_FAILURE, message };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}
