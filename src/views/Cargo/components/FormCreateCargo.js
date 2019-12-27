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

const FormCreateCargo = props => {
  return (
    <div className="animated fadeIn">
      <CargoForm cargo={dataCargo} authorization={props.authorization} />
    </div>
  );
};

FormCreateCargo.propTypes = {
  cargo: PropTypes.object.isRequired,
  authorization: PropTypes.string.isRequired
};

export default FormCreateCargo;
