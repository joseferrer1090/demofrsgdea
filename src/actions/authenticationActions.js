import { userService } from "./../services/auth/user.services";
import { history } from "./../helpers/history";
import { request } from "http";

export const userActions = {
  login
};

function login(username, password, grant_type) {
  return dispatch => {
    userService.login(username, password, grant_type).then(
      user => {
        dispatch(user);
        history.push("/");
      },
      error => {
        console.log(error);
      }
    );
  };
}
