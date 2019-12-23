import React from "react";
import PropTypes from "prop-types";
import DepartamentoForm from "./Forms/DepartamentoForm";
const dataDepartamento = {
  code: "",
  name: "",
  status: "",
  countryId: ""
};
const FormCreateDepartamento = props => {
  console.log(props.authorization);
  return (
    <div className="animated fadeIn">
      <DepartamentoForm
        departamento={dataDepartamento}
        authorization={props.authorization}
      />
    </div>
  );
};

FormCreateDepartamento.propTypes = {
  departamento: PropTypes.object.isRequired,
  authorization: PropTypes.string.isRequired
};
export default FormCreateDepartamento;
