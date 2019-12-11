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
        dispatch(success(JSON.parse(user)));
        history.push("/#/middleware");
      },
      error => {
        console.log(error);
        dispatch(failure(error));
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

function logout() {}
