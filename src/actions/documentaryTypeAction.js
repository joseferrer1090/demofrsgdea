import {
  AGREGAR_USUARIO_DISPONIBLE,
  AGREGAR_USUARIO_ORIGINAL,
  BORRAR_USUARIO_DISPONIBLE,
  OBTENER_TIPO_DOCUMENTAL_RADICACION,
  TIPO_DOCUMENTAL_RADICACION_EDITAR_EXITO,
  AGREGAR_USUARIO_TIPO_DOCUMENTAL_RADICACION_EDITAR,
  BORRAR_USUARIO_TIPO_DOCUMENTAL_RADICACION_EDITAR,
  ASIGNAR_USUARIO_ORIGINAL_TIPO_DOCUMENTAL_RADICACION_EDITAR
} from "./../types/index";
import { decode } from "jsonwebtoken";
import { TYPEDOCUMENTARY_SHOW } from "./../services/EndPoints";

export const agregarUsuarioDisponible = user => {
  return {
    type: AGREGAR_USUARIO_DISPONIBLE,
    payload: user
  };
};

export const borrarUsuarioDiponible = id => {
  return {
    type: BORRAR_USUARIO_DISPONIBLE,
    payload: id
  };
};

export const agregarUsuarioOriginal = id => {
  return {
    type: AGREGAR_USUARIO_ORIGINAL,
    payload: id
  };
};

export function obtenerTipoDocumentalAction(id) {
  const auth = localStorage.getItem("auth_token");
  const username = decode(auth);
  return dispatch => {
    dispatch(obtenerTipoDocumentalEditar());
    fetch(`${TYPEDOCUMENTARY_SHOW}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(obtenerTipoDocumentalEditatExito(data));
        console.log(data);
      })
      .catch(err => console.log(err));
  };
}

const obtenerTipoDocumentalEditar = () => ({
  type: OBTENER_TIPO_DOCUMENTAL_RADICACION
});

const obtenerTipoDocumentalEditatExito = tipodocumental => ({
  type: TIPO_DOCUMENTAL_RADICACION_EDITAR_EXITO,
  payload: tipodocumental
});

export const agregarusuarioTipodocumentaleditar = user => ({
  type: AGREGAR_USUARIO_TIPO_DOCUMENTAL_RADICACION_EDITAR,
  payload: user
});

export const borrarusuarioTipodocumentaleditar = id => ({
  type: BORRAR_USUARIO_TIPO_DOCUMENTAL_RADICACION_EDITAR,
  payload: id
});

export const asignarOriginalTipodocumentaleditar = id => ({
  type: ASIGNAR_USUARIO_ORIGINAL_TIPO_DOCUMENTAL_RADICACION_EDITAR,
  payload: id
});
