import React from "react";
import GrupoUsuariosForm from "../Forms/GrupoUsuariosForm";
import PropTypes from "prop-types";

const dataGrupoUsers = {
  codigo: "",
  nombre: "",
  descripcion: "",
  conglomerado: "",
  empresa: "",
  sede: "",
  dependencia: "",
  estado: "",
  roles: []
};

const FormCreateGrupos = props => {
  return (
    <div className="animated fadeIn">
      <div className="container">
        <GrupoUsuariosForm
          grupoUsuarios={dataGrupoUsers}
          authorization={props.authorization}
        />
      </div>
    </div>
  );
};
FormCreateGrupos.propTypes = {
  grupoUsuarios: PropTypes.object.isRequired,
  authorization: PropTypes.string.isRequired
};
export default FormCreateGrupos;
