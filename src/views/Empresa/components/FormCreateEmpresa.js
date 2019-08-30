import React from 'react';
import EmpresaForm from './Forms/EmpresaForm';

const empresa = {
  conglomerateId: '',
  code: '',
  nit: '',
  name: '',
  description: '',
  chargeId: '',
  status: ''
};

const FormCreateEmpresa = props => {
  return (
    <div className="animated fadeIn">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <EmpresaForm empresa={empresa} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCreateEmpresa;
