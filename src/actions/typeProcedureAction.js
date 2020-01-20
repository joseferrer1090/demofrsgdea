import {
  AGREGAR_USUARIO_TIPO_TRAMITE,
  BORRAR_USUARIO_DISPONIBLE_TIPO_TRAMITE,
  AGREGAR_USUARIO_ORIGINAL_TIPO_TRAMITE,
  OBTENER_TIPO_TRAMITE_EDITAR,
  TIPO_TRAMITE_EDITAR_EXITO,
  AGREGAR_USUARIO_DISPONIBLE_EDITAR,
  BORRAR_USUARIO_DISPONIBLE_EDITAR
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

export function obtenerTramiteEditarAction(id) {
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
        dispatch(obtenerTipoTramiteExito(data));
        //console.log(data);
      })
      .catch(err => console.log(err));
  };
}

export const obtenerTramiteEditar = () => ({
  type: OBTENER_TIPO_TRAMITE_EDITAR
});

export const obtenerTipoTramiteExito = tramite => ({
  type: TIPO_TRAMITE_EDITAR_EXITO,
  payload: tramite
});

export const agregarUsuarioEditar = user => ({
  type: AGREGAR_USUARIO_DISPONIBLE_EDITAR,
  payload: user
});

export const borrarUsuarioEditar = id => ({
  type: BORRAR_USUARIO_DISPONIBLE_EDITAR,
  payload: id
});
