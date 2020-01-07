import React from "react";
import PropTypes from "prop-types";
import RemitenteForm from "./Forms/RemitenteForm";

const dataRemitenteForm = {
  tipoTercero: "",
  elementoComunicacion: "",
  pais: "",
  departamento: "",
  ciudad: "",
  identificacion: "",
  nombre: "",
  email: "",
  direccion: "",
  telefonoFijo: "",
  telefonoCelular: "",
  referencia: "",
  observacion: "",
  estado: ""
};
const FormCreateRemitente = props => {
  return (
    <RemitenteForm
      remitenteForm={dataRemitenteForm}
      authorization={props.authorization}
    />
  );
};
FormCreateRemitente.propTypes = {
  remitenteForm: PropTypes.object.isRequired,
  authorization: PropTypes.string.isRequired
};
export default FormCreateRemitente;
