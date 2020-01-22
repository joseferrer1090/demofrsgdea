import {
  AGREGAR_USUARIO_DISPONIBLE,
  AGREGAR_USUARIO_ORIGINAL,
  BORRAR_USUARIO_DISPONIBLE,
  OBTENER_TIPO_DOCUMENTAL_RADICACION
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
    dispatch(obtenerTipoDocumental());
    fetch(`${TYPEDOCUMENTARY_SHOW}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(obtenerTipoDocumental(data));
        console.log(data);
      })
      .catch(err => console.log(err));
  };
}

const obtenerTipoDocumental = () => ({
  type: OBTENER_TIPO_DOCUMENTAL_RADICACION
});
