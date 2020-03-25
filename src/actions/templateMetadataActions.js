import {
  AGREGAR_METADATO_PLANTILLA,
  ELIMINAR_METADATO_PLANTILLA,
  RESET_METADATO_PLANTILLA
} from "./../types/index";

export const agregarMetadataAction = metadata => {
  return {
    type: AGREGAR_METADATO_PLANTILLA,
    payload: metadata
  };
};

export const eliminarMetadataAction = id => {
  return {
    type: ELIMINAR_METADATO_PLANTILLA,
    payload: id
  };
};

export const resetMetadatoAction = () => {
  return {
    type: RESET_METADATO_PLANTILLA
  };
};
