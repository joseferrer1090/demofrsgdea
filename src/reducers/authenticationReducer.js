import { userConstants } from "./../constants/user.constants";
let user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? {
      isLogginIn: true,
      isLogginOut: false,
      isVerifying: true,
      loginError: false,
      logoutError: false,
      isAuthenticated: true,
      user,
      permissions: {}
    }
  : {
      isLogginIn: false,
      isLogginOut: false,
      isVerifying: false,
      loginError: false,
      logoutError: false,
      isAuthenticated: false,
      user,
      permissions: null
    };

// fucnion principal
export default function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        user: action.user,
        permisos: {},
        isLogginIn: true,
        loginError: false
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        user: action.user,
        permissions: action.permissions,
        isAuthenticated: true,
        isLogginIn: false
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        isLogginIn: false,
        isAuthenticated: false,
        loginError: true
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        isLogginOut: false
      };
    default:
      return state;
  }
}
