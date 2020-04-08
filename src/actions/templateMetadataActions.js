import {
  AGREGAR_METADATO_PLANTILLA,
  ELIMINAR_METADATO_PLANTILLA,
  RESET_METADATO_PLANTILLA,
  AGREGAR_METADATO_PLANTILLA_EDITAR,
  ELIMINAR_METADATO_PLANTILLA_EDITAR,
} from "./../types/index";

export const agregarMetadataAction = (metadata) => {
  return {
    type: AGREGAR_METADATO_PLANTILLA,
    payload: metadata,
  };
};

export const eliminarMetadataAction = (id) => {
  return {
    type: ELIMINAR_METADATO_PLANTILLA,
    payload: id,
  };
};

export const resetMetadatoAction = () => {
  return {
    type: RESET_METADATO_PLANTILLA,
  };
};

export const agregarMetadaEditAction = (metadata) => {
  return {
    type: AGREGAR_METADATO_PLANTILLA_EDITAR,
    payload: metadata,
  };
};
