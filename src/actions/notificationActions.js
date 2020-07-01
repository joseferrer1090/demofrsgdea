import { STATUS_CORRESPONDENCIA_NOTIFICACION } from "./../types/index";

export function addNotification(active, message, level) {
  return {
    type: STATUS_CORRESPONDENCIA_NOTIFICACION,
    active: active,
    message: message,
    level: level,
  };
}
