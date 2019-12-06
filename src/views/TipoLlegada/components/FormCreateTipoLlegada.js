import React from 'react';
import PropTypes from 'prop-types';
import TipoLlegadaForm from './Forms/TipoLlegadaForm';

const dataTipollegada = {
  code: '',
  name: '',
  description: '',
  status: ''
};
const FormCreateTipoLlegada = () => {
  return (
    <div className="animated fadeIn">
      <TipoLlegadaForm tipollegada={dataTipollegada} />
    </div>
  );
};
FormCreateTipoLlegada.propTypes = {
  tipollegada: PropTypes.object.isRequired
};

export default FormCreateTipoLlegada;
