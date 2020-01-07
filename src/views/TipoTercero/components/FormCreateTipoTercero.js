import React from "react";
import PropTypes from "prop-types";
import TipoTercerosForm from "./Forms/TipoTercerosForm";

const dataTipoTercerosForm = {
  code: "",
  name: "",
  status: "",
  description: ""
};

const FormCreateTipoTercero = props => {
  return (
    <TipoTercerosForm
      TipoTercerosForm={dataTipoTercerosForm}
      authorization={props.authorization}
    />
  );
};

FormCreateTipoTercero.propTypes = {
  TipoTercerosForm: PropTypes.object.isRequired
};

export default FormCreateTipoTercero;
