import React from 'react';
import PropTypes from 'prop-types';
import RemitenteForm from './Forms/RemitenteForm';

const dataRemitenteForm = {
  tipoTercero: '',
  elementoComunicacion: '',
  pais: '',
  departamento: '',
  ciudad: '',
  identificacion: '',
  nombre: '',
  email: '',
  direccion: '',
  telefonoFijo: '',
  telefonoCelular: '',
  referencia: '',
  observacion: '',
  estado: ''
};
const FormCreateRemitente = () => {
  return <RemitenteForm remitenteForm={dataRemitenteForm} />;
};
FormCreateRemitente.propTypes = {
  remitenteForm: PropTypes.object.isRequired
};
export default FormCreateRemitente;
