import {
  AGREGAR_USUARIO_TIPO_TRAMITE,
  BORRAR_USUARIO_DISPONIBLE_TIPO_TRAMITE,
  AGREGAR_USUARIO_ORIGINAL_TIPO_TRAMITE,
  OBTENER_TIPO_TRAMITE_EDITAR,
  TIPO_TRAMITE_EDITAR_EXITO,
  TIPO_TRAMITE_EDITAR_ERROR,
  COMENZAR_EDICION_TIPO_TRAMITE,
  TIPO_TRAMITE_EDITADO_EXITO,
  TIPO_TRAMITE_EDITADO_ERROR
} from "./../types/index";

const initialState = {
  users: [],
  original: {},
  assigned: null,
  tramite: {},
  error: null
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
    // Reducers para Editar el Tramite
    case OBTENER_TIPO_TRAMITE_EDITAR:
      return {
        ...state,
        error: null
      };
    case TIPO_TRAMITE_EDITAR_EXITO:
      return {
        ...state,
        error: null,
        tramite: action.payload
      };
    case TIPO_TRAMITE_EDITAR_ERROR:
      return {
        ...state,
        error: true
      };
    case COMENZAR_EDICION_TIPO_TRAMITE:
      return {
        ...state,
        error: null
      };
    case TIPO_TRAMITE_EDITADO_EXITO:
      return {
        ...state,
        error: null
      };
    // Fin

    default:
      return state;
  }
}
