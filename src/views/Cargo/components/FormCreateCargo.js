import React from "react";
import PropTypes from "prop-types";
import CargoForm from "./Forms/CargoForm";

const dataCargo = {
  conglomerateId: "",
  conglomerado_responsable: "",
  companyId: "",
  empresa_responsable: "",
  headquarterId: "",
  sede_responsable: "",
  dependencyId: "",
  dependencia_responsable: "",
  code: "",
  name: "",
  description: "",
  status: ""
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
