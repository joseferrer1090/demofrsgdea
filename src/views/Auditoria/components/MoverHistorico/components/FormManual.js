import React from 'react';
import PropTypes from 'prop-types';
import ManualForm from './Forms/ManualForm';

const dataManualForm = {
  operacion: '',
  modulo: '',
  entidad: '',
  accion: '',
  fechaDesde: '',
  fechaHasta: ''
};
const FormManual = () => {
  return (
    <div className="animated fadeIn">
      <ManualForm auditoriaMHManualForm={dataManualForm} />
    </div>
  );
};
FormManual.propTypes = {
  auditoriaMHManualForm: PropTypes.object.isRequired
};

export default FormManual;
