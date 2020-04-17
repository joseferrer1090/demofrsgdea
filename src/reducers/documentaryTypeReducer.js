import {
  AGREGAR_USUARIO_DISPONIBLE,
  BORRAR_USUARIO_DISPONIBLE,
  AGREGAR_USUARIO_ORIGINAL,
  OBTENER_TIPO_DOCUMENTAL_RADICACION,
  TIPO_DOCUMENTAL_RADICACION_EDITAR_EXITO,
  TIPO_DOCUMENTAL_RADICACION_EDITAR_ERROR,
  TIPO_DOCUMENTAL_RADICACION_EDITADO_EXITO,
  TIPO_DOCUMENTAL_RADICACION_EDITADO_ERROR,
  AGREGAR_USUARIO_TIPO_DOCUMENTAL_RADICACION_EDITAR,
  BORRAR_USUARIO_TIPO_DOCUMENTAL_RADICACION_EDITAR,
  ASIGNAR_USUARIO_ORIGINAL_TIPO_DOCUMENTAL_RADICACION_EDITAR
} from "./../types/index";

// defino los estado
const initialState = {
  users: [],
  original: {},
  assigned: null,
  tipodocumental: {},
  error: null
};

// la funcion principal dependiendo de las acciones
export default function(state = initialState, action) {
  switch (action.type) {
    case AGREGAR_USUARIO_DISPONIBLE:
      return {
        ...state,
        users: [...state.users, action.payload],
        assigned: null
      };

    case BORRAR_USUARIO_DISPONIBLE:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        assigned: false
      };
    case AGREGAR_USUARIO_ORIGINAL: {
      return {
        ...state,
        original: action.payload,
        assigned: true
      };
    }
    /* Reducers para la edicion del tipo documental de radicacion  */
    case OBTENER_TIPO_DOCUMENTAL_RADICACION:
      return {
        ...state,
        error: null
      };
    case TIPO_DOCUMENTAL_RADICACION_EDITAR_EXITO:
      return {
        ...state,
        error: null,
        tipodocumental: action.payload
      };
    case TIPO_DOCUMENTAL_RADICACION_EDITAR_EXITO:
      return {
        ...state,
        error: true
      };

    case AGREGAR_USUARIO_TIPO_DOCUMENTAL_RADICACION_EDITAR:
      return {
        ...state,
        tipodocumental: {
          ...state.tipodocumental,
          users: [...state.tipodocumental.users, action.payload]
        }
      };

    case BORRAR_USUARIO_TIPO_DOCUMENTAL_RADICACION_EDITAR:
      return {
        ...state,
        tipodocumental: {
          ...state.tipodocumental,
          users: state.tipodocumental.users.filter(
            user => user.id !== action.payload
          )
        },
        assigned: false
      };
    case ASIGNAR_USUARIO_ORIGINAL_TIPO_DOCUMENTAL_RADICACION_EDITAR:
      return {
        ...state,
        tipodocumental: {
          ...state.tipodocumental,
          original: action.payload
        },
        assigned: true
      };

    default:
      return state;
  }
}
