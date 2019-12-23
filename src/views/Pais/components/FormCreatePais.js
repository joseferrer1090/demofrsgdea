import React from "react";
import PropTypes from "prop-types";
import FormPais from "./Forms/FormPais";

const dataPais = {
  code: "",
  name: "",
  status: ""
};

const FormCreatePais = props => {
  return (
    <div className="animated fadeIn">
      <FormPais pais={dataPais} authorization={props.authorization} />
    </div>
  );
};

FormCreatePais.propTypes = {
  pais: PropTypes.object.isRequired,
  authorization: PropTypes.string.isRequired
};
export default FormCreatePais;
