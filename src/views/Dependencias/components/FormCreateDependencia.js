import React from 'react';
import PropTypes from 'prop-types';
import DependenciaForm from './Forms/DependenciasForm';

const dataDependencia = {
  conglomerateId: '',
  companyId: '',
  headquarterId: '',
  code: '',
  name: '',
  description: '',
  chargeId: '',
  status: ''
};

const FromCreateDependencia = () => {
  return (
    <div className="animated fadeIn">
      <div className="container">
        <DependenciaForm dependencia={dataDependencia} />
      </div>
    </div>
  );
};

FromCreateDependencia.propTypes = {
  dependencia: PropTypes.object.isRequired
};

export default FromCreateDependencia;
