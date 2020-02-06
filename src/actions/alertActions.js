import { alertConstanst } from "../constants/alerts.constants";

export const alertActions = {
  success,
  error,
  clear
};

function success(message) {
  return {
    type: alertConstanst.SUCCESS,
    message
  };
}

function error(message) {
  return {
    type: alertConstanst.ERROR,
    message
  };
}

function clear() {
  return {
    type: alertConstanst.CLEAR
  };
}
