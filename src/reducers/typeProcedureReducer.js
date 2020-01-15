import {
  AGREGAR_USUARIO_TIPO_TRAMITE,
  BORRAR_USUARIO_DISPONIBLE_TIPO_TRAMITE,
  AGREGAR_USUARIO_ORIGINAL_TIPO_TRAMITE
} from "./../types/index";

const initialState = {
  users: [],
  original: {},
  assigned: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AGREGAR_USUARIO_TIPO_TRAMITE:
      return {
        ...state,
        users: [...state.users, action.payload],
        assigned: null
      };
    case BORRAR_USUARIO_DISPONIBLE_TIPO_TRAMITE:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        assigned: false
      };
    case AGREGAR_USUARIO_ORIGINAL_TIPO_TRAMITE:
      return {
        ...state,
        original: action.payload,
        assigned: true
      };
    default:
      return state;
  }
}
