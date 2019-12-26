import React from "react";
import EmpresaForm from "./Forms/EmpresaForm";
import PropTypes from "prop-types";

const empresa = {
  conglomerateId: "",
  code: "",
  nit: "",
  name: "",
  description: "",
  chargeId: "",
  status: "",
  cityId: "",
  countryId: "",
  departmentId: ""
};

const FormCreateEmpresa = props => {
  return (
    <div className="animated fadeIn">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <EmpresaForm empresa={empresa} />
          </div>
        </div>
      </div>
    </div>
  );
};

FormCreateEmpresa.propTypes = {
  empresa: PropTypes.object.isRequired
};
export default FormCreateEmpresa;
