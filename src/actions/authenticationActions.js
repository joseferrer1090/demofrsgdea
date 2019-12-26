import { userService } from "./../services/auth/user.services";
import { userConstants } from "./../constants/user.constants";
import { alertConstant } from "./../constants/alerts.constants";
import { history } from "./../helpers/history";

export const userActions = {
  login,
  logout
};

function login(username, password, grant_type) {
  return dispatch => {
    dispatch(request({ username, password, grant_type }));
    userService.login(username, password, grant_type).then(
      user => {
        console.log(user);
        localStorage.setItem("auth_token", user.data.access_token);
        dispatch(success(user));
        history.push("/#/middleware");
        window.location.reload(true);
      },
      error => {
        console.log(error);
        //dispatch(failure(error));
      }
    );
  };
  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}
