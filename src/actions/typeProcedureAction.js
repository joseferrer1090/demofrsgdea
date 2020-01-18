import {
  AGREGAR_USUARIO_TIPO_TRAMITE,
  BORRAR_USUARIO_DISPONIBLE_TIPO_TRAMITE,
  AGREGAR_USUARIO_ORIGINAL_TIPO_TRAMITE,
  OBTENER_TIPO_TRAMITE_EDITAR,
  TIPO_TRAMITE_EDITAR_EXITO
} from "../types/index";

import { TYPEPROCEDURE } from "./../services/EndPoints";
import { decode } from "jsonwebtoken";

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

export const obtenerTramiteEditar = () => ({
  type: OBTENER_TIPO_TRAMITE_EDITAR
});

export const tipoTramiteEditar = tramite => ({
  type: TIPO_TRAMITE_EDITAR_EXITO,
  payload: tramite
});

export function obtenerTipoTramite(id) {
  const auth = localStorage.getItem("auth_token");
  const username = decode(auth);
  return dispatch => {
    dispatch(obtenerTramiteEditar());
    fetch(`${TYPEPROCEDURE}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        //dispatch(tipoTramiteEditar(data));
        //console.log(data);
      })
      .catch(err => console.log(err));
  };
}
