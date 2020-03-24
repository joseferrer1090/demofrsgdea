import {
  AGREGAR_METADATO_PLANTILLA,
  ELIMINAR_METADATO_PLANTILLA
} from "../types/index";

const initialState = {
  metadata: [],
  error: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AGREGAR_METADATO_PLANTILLA:
      let index = state.metadata.findIndex(aux => aux.id == action.payload.id);
      if (index == -1) {
        return {
          ...state,
          metadata: [...state.metadata, action.payload],
          error: false
        };
      } else {
        return {
          ...state,
          error: true
        };
      }
    case ELIMINAR_METADATO_PLANTILLA:
      return {
        ...state,
        metadata: state.metadata.filter(
          metadata => metadata.id !== action.payload.id
        ),
        error: false
      };
    default:
      return state;
  }
}
