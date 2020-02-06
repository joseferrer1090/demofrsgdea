import { alertConstanst } from "./../constants/alerts.constants";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case alertConstanst.SUCCESS:
      return {
        type: "success",
        message: action.message
      };
    case alertConstanst.ERROR:
      return {
        type: "danger",
        message: action.message
      };
    case alertConstanst.CLEAR:
      return {};

    default:
      return state;
  }
}
