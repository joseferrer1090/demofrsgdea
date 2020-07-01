import { STATUS_CORRESPONDENCIA_NOTIFICACION } from "./../types/index";

const initialState = { active: null, message: "", level: "" };

export default function (state = initialState, action) {
  switch (action.type) {
    case STATUS_CORRESPONDENCIA_NOTIFICACION:
      return Object.assign({}, state, {
        active: action.active,
        message: action.message,
        level: action.level,
      });
    default:
      console.log("notification reducer :: default", action.type);
      return state;
  }
}
