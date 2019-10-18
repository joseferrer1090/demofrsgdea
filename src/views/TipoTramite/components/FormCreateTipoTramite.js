import React from "react";
import { Row, Col, CustomInput } from "reactstrap";
import PropTypes from "prop-types";
import TipoTramiteForm from "./Forms/TipoTramiteForm";


const dataTramite = {
  t_correspondencia: "",
  codigo: "",
  nombre: "",
  descripcion: "",
  d_maximos: "",
  estado: "",
  asunto: "",
  plantilla: "",
  workflow: "", 
  user_enabled: [],
  conglomerado: [],
  empresa: [], 
  sede: [], 
  dependencia: []
};

const FormCreateTipoTramite = () => {
  return (
    <div className="animated fadeIn">
      <div className="row">
        <TipoTramiteForm  />
      </div>
    </div>
  );
};

export default FormCreateTipoTramite;
