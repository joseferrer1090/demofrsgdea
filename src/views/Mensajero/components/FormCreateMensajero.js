import React from "react";
import MensajeroForm from "./Forms/MensajeroForm";

const dataMensajero = {
  identification: "",
  name: "",
  description: "",
  status: ""
};

const FormCreateMensajero = () => {
  return (
    <div className="animated fadeIn">
      <MensajeroForm mensajero={dataMensajero} />
    </div>
  );
};

FormCreateMensajero.propType = {};

export default FormCreateMensajero;
