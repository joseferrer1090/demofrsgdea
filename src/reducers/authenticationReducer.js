import { userConstants } from "./../constants/user.constants";
let user = JSON.parse(localStorage.getItem("user"));

// permisos
const initialState = user ? { loggedIn: true, user, permissions: {} } : {};

// fucnion principal
export default function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
        permisos: {}
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
        permissions: action.permissions
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
