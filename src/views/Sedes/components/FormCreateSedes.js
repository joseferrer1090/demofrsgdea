import React from "react";
import PropTypes from "prop-types";
import { Row } from "reactstrap";
import SedesForm from "./Forms/SedesForm";

const dataSede = {
  conglomerado: "",
  empresa: "",
  codigo: "",
  nombre: "",
  descripcion: "",
  pre_radicacion: "",
  sec_radicacion: "",
  pais: "",
  departamento: "",
  ciudad: "",
  direccion: "",
  telefono: "",
  c_responsable: "",
  estado: ""
};
const FormCreateSedes = () => {
  return (
    <div className="animated fadeIn">
      <div className="container">
        <Row>
          <div className="col-md-8 offset-md-2">
            <SedesForm sede={dataSede} />
          </div>
        </Row>
      </div>
    </div>
  );
};

FormCreateSedes.propTypes = {};

export default FormCreateSedes;
