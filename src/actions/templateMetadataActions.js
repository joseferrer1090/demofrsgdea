import { AGREGAR_METADATO_PLANTILLA } from "./../types/index";

export const agregarMetadataAction = metadata => {
  return {
    type: AGREGAR_METADATO_PLANTILLA,
    payload: metadata
  };
};
