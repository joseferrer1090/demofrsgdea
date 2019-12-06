import React from 'react';
import RadicacionEmailForm from './Forms/RadicacionEmailForm';

const dataRadicacionEmail = {
  protocolo: '',
  host: '',
  puerto: '',
  email: '',
  password: '',
  status: ''
};

const FormCreateRadicacionEmail = () => {
  return (
    <div className="animated fadeIn">
      <RadicacionEmailForm radicacionemail={dataRadicacionEmail} />
    </div>
  );
};

FormCreateRadicacionEmail.propType = {};

export default FormCreateRadicacionEmail;
