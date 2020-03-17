import React, { Component } from "react";
import CreatePlantillaForm from "./Forms/CreatePlantillaForm";
import PropTypes from "prop-types";

const FormCreatePlantilla = props => {
  return (
    <div className="">
      <CreatePlantillaForm authorization={props.authorization} />
    </div>
  );
};

// class FormCreatePlantilla extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: dataDependencias,
//       term: ""
//     };
//   }

//   handleSearchInput = event => {
//     this.setState({ term: event.target.value });
//   };

//   searchDependecies = term => {
//     return function(x) {
//       return x.nombre.toLowerCase().includes(term);
//     };
//   };

//   render() {
//     const term = this.state.term;
//     const aux = this.state.data.data
//       .filter(this.searchDependecies(term))
//       .map((aux, id) => {
//         return (
//           <tr key={id}>
//             <td>{id}</td>
//             <td>{aux.nombre.toLowerCase()}</td>
//             <td>
//               <input type="checkbox" />
//             </td>
//           </tr>
//         );
//       });

//     return (

//     );
//   }
// }

FormCreatePlantilla.propTypes = {};

export default FormCreatePlantilla;
