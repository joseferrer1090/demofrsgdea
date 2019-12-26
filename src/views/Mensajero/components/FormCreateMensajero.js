import React from "react";
import PropTypes from "prop-types";
import MensajeroForm from "./Forms/MensajeroForm";

const dataMensajero = {
  identification: "",
  name: "",
  description: "",
  status: ""
};

const FormCreateMensajero = props => {
  return (
    <div className="animated fadeIn">
      <MensajeroForm
        mensajero={dataMensajero}
        authorization={props.authorization}
      />
    </div>
  );
};

FormCreateMensajero.propType = {
  mensajero: PropTypes.object.isRequired,
  authorization: PropTypes.string.isRequired
};

export default FormCreateMensajero;
