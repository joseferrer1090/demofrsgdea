import {
  COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA,
  COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA_EXITO,
  COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA_ERROR,
} from "./../types/index";

import { FILING_STATUS_CORRESPONDENCE_ALL } from "./../services/EndPoints";

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
