import React, { Component } from "react";
import GrupoUsuariosForm from "../Forms/GrupoUsuariosForm";
const dataGrupoUsers = {
  codigo: "",
  nombre: "",
  descripcion: "",
  conglomerado: "",
  empresa: "",
  sede: "",
  dependencia: "",
  estado: "",
  roles: [],

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
const FormCreateGrupos =()=> {
  return (
    <div className="animated fadeIn">
      <div className="container">
        <GrupoUsuariosForm grupoUsuarios={dataGrupoUsers}/>
      </div>
    </div>
  );
}
export default FormCreateGrupos;
