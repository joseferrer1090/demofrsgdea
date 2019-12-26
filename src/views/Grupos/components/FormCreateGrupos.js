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
// class FormCreateGrupos extends Component {
//   render() {
//     return (
//       <div className="animated fadeIn">
//         <div className="container">
//           <GrupoUsuariosForm grupoUsuarios={dataGrupoUsers}/>
//         </div>
//       </div>
//     );
//   }
// }
// export default FormCreateGrupos;
const FormCreateGrupos = () => {
  return (
    <div className="animated fadeIn">
      <div className="container">
        <GrupoUsuariosForm grupoUsuarios={dataGrupoUsers} />
      </div>
    </div>
  );
};
FormCreateGrupos.propTypes = {
  grupoUsuarios: PropTypes.object.isRequired
};
export default FormCreateGrupos;
