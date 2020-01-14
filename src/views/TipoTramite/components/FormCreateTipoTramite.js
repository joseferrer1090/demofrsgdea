import React from "react";
import PropTypes from "prop-types";
import TipoTramiteForm from "./Forms/TipoTramiteForm";

const FormCreateTipoTramite = props => {
  return (
    <div className="animated fadeIn">
      <div className="row">
        <TipoTramiteForm authorization={props.authorization} />
      </div>
    </div>
  );
};

FormCreateTipoTramite.propTypes = {
  authorization: PropTypes.string.isRequired
};

export default FormCreateTipoTramite;
