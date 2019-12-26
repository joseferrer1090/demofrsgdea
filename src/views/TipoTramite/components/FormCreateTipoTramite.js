import React from 'react';
import PropTypes from 'prop-types';
import TipoTramiteForm from './Forms/TipoTramiteForm';

const FormCreateTipoTramite = () => {
  return (
    <div className="animated fadeIn">
      <div className="row">
        <TipoTramiteForm />
      </div>
    </div>
  );
};

FormCreateTipoTramite.propTypes = {};

export default FormCreateTipoTramite;
