import {
  COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA,
  COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA_EXITO,
  COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA_ERROR,
} from "./../types/index";

const initialState = {
  estados: [],
  error: null,
  loading: false,
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

    default:
      return state;
  }
}
