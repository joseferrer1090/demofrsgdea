import { AGREGAR_METADATO_PLANTILLA } from "./../types/index";

const initialState = {
  metadata: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AGREGAR_METADATO_PLANTILLA:
      let index = state.metadata.findIndex(aux => aux.id == action.payload.id);
      if (index == -1) {
        return {
          ...state,
          metadata: [...state.metadata, action.payload]
        };
      } else {
        return state;
      }

    default:
      return state;
  }
}
