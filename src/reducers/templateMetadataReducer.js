import {
  AGREGAR_METADATO_PLANTILLA,
  ELIMINAR_METADATO_PLANTILLA,
  RESET_METADATO_PLANTILLA,
  AGREGAR_METADATO_PLANTILLA_EDITAR,
  ELIMINAR_METADATO_PLANTILLA_EDITAR,
} from "../types/index";

const initialState = {
  metadata: [],
  error: false,
  metadataedit: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AGREGAR_METADATO_PLANTILLA:
      let index = state.metadata.findIndex(
        (aux) => aux.id === action.payload.id
      );
      if (index === -1) {
        return {
          ...state,
          metadata: [...state.metadata, action.payload],
          error: false,
        };
      } else {
        return {
          ...state,
          error: true,
        };
      }
    case ELIMINAR_METADATO_PLANTILLA:
      return {
        ...state,
        metadata: state.metadata.filter(
          (metadata) => metadata.id !== action.payload.id
        ),
        error: false,
      };
    case RESET_METADATO_PLANTILLA:
      return {
        ...state,
        metadata: [],
        error: false,
      };
    case AGREGAR_METADATO_PLANTILLA_EDITAR:
      let indexe = state.metadataedit.findIndex(
        (aux) => aux.id === action.payload.id
      );
      if (indexe === -1) {
        return {
          metadataedit: [...state.metadataedit, action.payload],
        };
      } else {
        return {
          ...state,
        };
      }
    default:
      return state;
  }
}
