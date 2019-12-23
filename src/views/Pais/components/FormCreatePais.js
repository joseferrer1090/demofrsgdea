import React from "react";
import PropTypes from "prop-types";
import FormPais from "./Forms/FormPais";

const dataPais = {
  code: "",
  name: "",
  status: ""
};

const FormCreatePais = props => {
  const auth = props.authorization;
  console.log(auth);
  return (
    <div className="animated fadeIn">
      <FormPais pais={dataPais} authorization={auth} />
    </div>
  );
};

FormCreatePais.propTypes = {
  pais: PropTypes.object.isRequired
};
export default FormCreatePais;
