import React from 'react';
import PropTypes from 'prop-types';
import MensajeroForm from './Forms/MensajeroForm';

const dataMensajero = {
  identification: '',
  name: '',
  description: '',
  status: ''
};

const FormCreateMensajero = () => {
  return (
    <div className="animated fadeIn">
      <MensajeroForm mensajero={dataMensajero} />
    </div>
  );
};

FormCreateMensajero.propType = {
  mensajero: PropTypes.object.isRequired
};

export default FormCreateMensajero;
