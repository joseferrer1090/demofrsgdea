import { AGREGAR_METADATO_PLANTILLA } from "./../types/index";

const initialState = {
  metadata: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AGREGAR_METADATO_PLANTILLA:
      return {
        ...state,
        metadata: [...state.metadata, action.payload]
      };

    default:
      return state;
  }
}
