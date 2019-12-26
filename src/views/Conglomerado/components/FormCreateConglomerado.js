import React from "react";
import PropTypes from "prop-types";
import ConglomeradoForm from "./Forms/ConglomeradoForm";

const dataConglomerado = {
  codigo: "",
  nombre: "",
  descripcion: "",
  estado: "",
  countryId: "",
  departmentId: "",
  cityId: "",
  chargeId: ""
};

const FormCreateConglomerado = props => {
  return (
    <div className="anitmated fadeIn">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <ConglomeradoForm
              conglomerado={dataConglomerado}
              authorization={props.authorization}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

FormCreateConglomerado.propTypes = {
  conglomerado: PropTypes.object.isRequired,
  authorization: PropTypes.string.isRequired
};

export default FormCreateConglomerado;
