import React from 'react';
import PropTypes from 'prop-types';
import DepartamentoForm from './Forms/DepartamentoForm';
const dataDepartamento = {
  code: '',
  name: '',
  status: '',
  countryId: ''
};
const FormCreateDepartamento = () => {
  return (
    <div className="animated fadeIn">
      <DepartamentoForm departamento={dataDepartamento} />
    </div>
  );
};

FormCreateDepartamento.propTypes = {
  departamento: PropTypes.object.isRequired
};
export default FormCreateDepartamento;
