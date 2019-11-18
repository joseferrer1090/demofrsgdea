import React from 'react';
import PropTypes from 'prop-types';
import TipoTercerosForm from './Forms/TipoTercerosForm';

const dataTipoTercerosForm = {
  code: '',
  name: '',
  status: '',
  description: ''
};

const FormCreateTipoTercero = () => {
  return <TipoTercerosForm TipoTercerosForm={dataTipoTercerosForm} />;
};

FormCreateTipoTercero.propTypes = {
  TipoTercerosForm: PropTypes.object.isRequired
};

export default FormCreateTipoTercero;
