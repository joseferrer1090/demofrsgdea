import React from 'react';
import PropTypes from 'prop-types';
import CiudadForm from './Forms/CiudadForm';
const dataCiudad = {
  countryId: '',
  departmentId: '',
  code: '',
  name: '',
  status: ''
};
const FormCreateCiudad = () => {
  return (
    <div className="animated fadeIn">
      <CiudadForm ciudad={dataCiudad} />
    </div>
  );
};
FormCreateCiudad.propTypes = {
  ciudad: PropTypes.object.isRequired
};
export default FormCreateCiudad;
