import React from "react";
import PropTypes from "prop-types";
import CiudadForm from "./Forms/CiudadForm";
const dataCiudad = {
  countryId: "",
  departmentId: "",
  code: "",
  name: "",
  status: ""
};
const FormCreateCiudad = props => {
  return (
    <div className="animated fadeIn">
      <CiudadForm ciudad={dataCiudad} authorization={props.authorization} />
    </div>
  );
};
FormCreateCiudad.propTypes = {
  ciudad: PropTypes.object.isRequired,
  authorization: PropTypes.string.isRequired
};
export default FormCreateCiudad;
