import {
  COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA,
  COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA_EXITO,
  COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA_ERROR,
  OBTENER_STATUS_CORRESPONDENCIA_VER,
  OBTENER_STATUS_CORRESPONDENCIA_VER_EXITO,
  OBTENER_STATUS_CORRESPONDENCIA_VER_ERROR,
  OBTENER_STATUS_CORRESPONDENCIA_EDITAR_ERROR,
  OBTNER_STATUS_CORRESPONDENCIA_EDITAR_EXITO,
} from "./../types/index";

import {
  FILING_STATUS_CORRESPONDENCE_ALL,
  FILING_STATUS_CORRESPONDENCE_VIEW,
  FILING_STATUS_CORRESPONDENCE_UPDATE,
} from "./../services/EndPoints";
import { decode } from "jsonwebtoken";
import store from "./../store/store.js";

// FUNCION PRINCIPAL PARA TENER LOS ESTADOS
export function obtenerEstadosCorrespondencia(estados) {
  return (dispatch) => {
    dispatch(comenzarDescargaEstados());
    fetch(`${FILING_STATUS_CORRESPONDENCE_ALL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        dispatch(comenzarDescargaEstadosExito(resp));
      })
      .catch((err) => {
        dispatch(descargaEstadosError());
        console.log(`Error => ${err}`);
      });
  };
}

const comenzarDescargaEstados = () => ({
  type: COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA,
});

const comenzarDescargaEstadosExito = (estados) => ({
  type: COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA_EXITO,
  payload: estados,
});

const descargaEstadosError = () => ({
  type: COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA_ERROR,
});
// FIN LISTAR ESTADOS

//FUCION PRINCIPAL PARA OBTENER EL STATUS POR ID
const username = decode(localStorage.getItem("auth_token"));
export function obtenerEstadoCorrespondenciaID(id) {
  return (dispatch) => {
    dispatch(comenzarDescargaEstado());
    fetch(
      `${FILING_STATUS_CORRESPONDENCE_VIEW}${id}?username=${username.user_name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        dispatch(comenzarDescargaEstadoExito(resp));
      })
      .catch((err) => {
        console.log(`Error => ${err}`);
        dispatch(comenzarDescargaEstadoError());
      });
  };
}

const comenzarDescargaEstado = () => ({
  type: OBTENER_STATUS_CORRESPONDENCIA_VER,
});

const comenzarDescargaEstadoExito = (id) => ({
  type: OBTENER_STATUS_CORRESPONDENCIA_VER_EXITO,
  payload: id,
});

const comenzarDescargaEstadoError = () => ({
  type: OBTENER_STATUS_CORRESPONDENCIA_VER_ERROR,
});
// FIN VER ESTADO POR ID

// FUNCION PRINCIPAL PARA EDITAR EL ESTADO
const auth = localStorage.getItem("auth_token");
export function editarEstadoCorrespondencia(estado) {
  return (dispatch) => {
    fetch(`${FILING_STATUS_CORRESPONDENCE_UPDATE}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
      body: JSON.stringify(estado),
    })
      .then((resp) => {
        if (resp.ok) {
          console.log(resp);
          dispatch(estadoEditarExito());
        } else if (resp.status === 400) {
          console.log("Verificar el object que se envia", resp);
          dispatch(estadoEditarError());
        } else if (resp.status === 500) {
          console.log("Error no se puede modificar el estado", resp);
          dispatch(estadoEditarError());
        }
      })
      .catch((err) => {
        console.log(`Error => ${err}`);
        dispatch(estadoEditarError());
      });
  };
}

const estadoEditarError = () => ({
  type: OBTENER_STATUS_CORRESPONDENCIA_EDITAR_ERROR,
});

const estadoEditarExito = () => ({
  type: OBTNER_STATUS_CORRESPONDENCIA_EDITAR_EXITO,
});

// FIN
