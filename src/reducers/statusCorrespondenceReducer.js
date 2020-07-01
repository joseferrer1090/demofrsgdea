import {
  COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA,
  COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA_EXITO,
  COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA_ERROR,
  OBTENER_STATUS_CORRESPONDENCIA_VER,
  OBTENER_STATUS_CORRESPONDENCIA_VER_EXITO,
  OBTENER_STATUS_CORRESPONDENCIA_VER_ERROR,
  OBTENER_STATUS_CORRESPONDENCIA_EDITAR,
  OBTENER_STATUS_CORRESPONDENCIA_EDITAR_ERROR,
  OBTNER_STATUS_CORRESPONDENCIA_EDITAR_EXITO,
} from "./../types/index";

const initialState = {
  estados: [],
  estado: {},
  error: null,
  loading: false,
  notification: false,
  notificationerror: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA_EXITO:
      return {
        ...state,
        estados: action.payload,
        loading: false,
        error: false,
      };

    case COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA_ERROR:
      return {
        ...state,
        estados: [],
        error: true,
        loading: false,
      };

    case OBTENER_STATUS_CORRESPONDENCIA_VER:
      return {
        ...state,
        error: null,
        loading: false,
      };

    case OBTENER_STATUS_CORRESPONDENCIA_VER_EXITO:
      return {
        ...state,
        estado: action.payload,
        error: false,
        loading: false,
      };

    case OBTENER_STATUS_CORRESPONDENCIA_VER_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };

    case OBTNER_STATUS_CORRESPONDENCIA_EDITAR_EXITO:
      return {
        ...state,
        error: null,
        notification: true,
      };
    case OBTENER_STATUS_CORRESPONDENCIA_EDITAR_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        notificationerror: true,
      };

    default:
      return state;
  }
}
