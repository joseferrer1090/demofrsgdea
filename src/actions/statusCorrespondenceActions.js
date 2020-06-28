import {
  COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA,
  COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA_EXITO,
  COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA_ERROR,
} from "./../types/index";

import { FILING_STATUS_CORRESPONDENCE_ALL } from "./../services/EndPoints";

export function obtenerEstadosCorrespondencia(estados, auth) {
  return (dispatch) => {
    dispatch(COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA());
    fetch(`${FILING_STATUS_CORRESPONDENCE_ALL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth,
      },
    })
      .then((resp) => {
        dispatch(COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA_EXITO(resp.data));
        console.log(resp.data);
      })
      .catch((err) => {
        dispatch(COMENZAR_DESCARGA_STATUS_CORRESPONDENCIA_ERROR());
        console.log(`Error => ${err}`);
      });
  };
}
