import {
  AGREGAR_USUARIO_TIPO_TRAMITE,
  BORRAR_USUARIO_DISPONIBLE_TIPO_TRAMITE,
  AGREGAR_USUARIO_ORIGINAL_TIPO_TRAMITE
} from "../types/index";

export const agregarUserAction = user => {
  return {
    type: AGREGAR_USUARIO_TIPO_TRAMITE,
    payload: user
  };
};

export const borrarUserAction = id => {
  return {
    type: BORRAR_USUARIO_DISPONIBLE_TIPO_TRAMITE,
    payload: id
  };
};

export const agregarOriginal = id => {
  return {
    type: AGREGAR_USUARIO_ORIGINAL_TIPO_TRAMITE,
    payload: id
  };
};
