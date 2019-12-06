import React from 'react';
import PropTypes from 'prop-types';
import RolesForm from './Forms/RolesForm';

// import ListaRoles from "./../componentsPermission/ListaRoles";
// import NuevaListaRoles from "./../componentsPermission/NuevaListaRoles";

const dataRoles = {
  codigo: '',
  nombre: '',
  descripcion: '',
  modulos: [],
  entidades: [],
  entidades_search: [],
  estado: '',
  permisos: []
};

const FormCreateRoles = props => {
  // this.state = {
  //   favourites: []
  // };

  // addFavourite(id) {
  //   const newSet = this.state.favourites.concat([id]);
  //   console.log("voy por este lado", id);
  //   this.setState({
  //     favourites: newSet
  //   });
  // }

  // deleteFavourite(id) {
  //   const { favourites } = this.state;
  //   const newList = [...favourites.slice(0, id), ...favourites.slice(id + 1)];
  //   this.setState({
  //     favourites: newList
  //   });
  // }

  return (
    <div className="animated fadeIn">
      <div className="container">
        <RolesForm roles={dataRoles} />
      </div>
    </div>
  );
};

FormCreateRoles.propTypes = {
  roles: PropTypes.object.isRequired
};

export default FormCreateRoles;
