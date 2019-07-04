import React from "react";
import PropTypes from "prop-types";
import CargoForm from "./Forms/CargoForm";

const dataCargo = {
  conglomerado: "",
  conglomerado_responsable: "",
  empresa: "",
  empresa_responsable: "",
  sede: "",
  sede_responsable: "",
  dependencia: "",
  dependencia_responsable: "",
  codigo: "",
  nombre: "",
  descripcion: "",
  estado: ""
};

const FormCreateCargo = () => {
  return (
    <div className="animated fadeIn">
      <CargoForm cargo={dataCargo} />
    </div>
  );
};

FormCreateCargo.propTypes = {};

export default FormCreateCargo;
