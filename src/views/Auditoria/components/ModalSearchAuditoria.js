import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import {
  MODULES,
  ACTIONS,
  ENTITIES,
  CONGLOMERATES_STATUS,
  COMPANYS_STATUS,
  HEADQUARTERS_STATUS,
  DEPENDENCIES_STATUS,
  USERS_STATUS
} from './../../../services/EndPoints';
import { Formik, ErrorMessage, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';

class ModalSearchAuditoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalSearch,
      acciones: '',
      usuarios: '',
      dataModules: [],
      dataEntities: [],
      dataActions: [],
      dataConglomerado: [],
      dataEmpresa: [],
      dataSede: [],
      dataDependencias: [],
      dataUsers: []
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modalSearch
    }));
    this.getDataModule();
    this.getDataEntity();
    this.getDataActions();
    this.getDataConglomerates();
    this.getDataCompanys();
    this.getDataHeadquarters();
    this.getDataDependence();
    this.getDataUsers();
  };

  handleChangeSelect = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getDataModule = data => {
    fetch(MODULES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataModules: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  getDataEntity = data => {
    fetch(ENTITIES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataEntities: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  getDataActions = data => {
    fetch(ACTIONS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataActions: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  getDataConglomerates = data => {
    fetch(CONGLOMERATES_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataConglomerado: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  getDataCompanys = data => {
    fetch(COMPANYS_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataEmpresa: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  getDataHeadquarters = data => {
    fetch(HEADQUARTERS_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataSede: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  getDataDependence = data => {
    fetch(DEPENDENCIES_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataDependencias: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  getDataUsers = data => {
    fetch(USERS_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataUsers: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };
  render() {
    const mapOptionsModules = this.state.dataModules.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });
    const mapOptionsEntities = this.state.dataEntities.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });
    const mapOptionsActions = this.state.dataActions.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    const mapOptionsConglomerate = this.state.dataConglomerado.map(
      (aux, idx) => {
        return (
          <option key={aux.id} value={aux.id}>
            {aux.name}
          </option>
        );
      }
    );

    const mapOptionsCompanys = this.state.dataEmpresa.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    const mapOptionsHeadquarters = this.state.dataSede.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    const mapOptionsDependence = this.state.dataDependencias.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    const mapOptionsUsers = this.state.dataUsers.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            <h5>Consultar auditoría</h5>
          </ModalHeader>
          <Formik
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, '', 2));
                fetch(`http://192.168.10.180:7000/api/sgdea/audit/consult`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + window.btoa('sgdea:123456')
                  },
                  body: JSON.stringify({
                    actionId: values.audit_accciones,
                    from: values.audit_fechaDesde,
                    ip: '',
                    page: 1,
                    size: 50,
                    to: values.audit_fechaHasta,
                    username: 'ccuartas'
                  })
                })
                  .then(response => response.json())
                  .then(response => {
                    console.log(response);
                  })
                  .catch(error => console.log('', error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              audit_fechaDesde: Yup.string(),
              audit_fechaHasta: Yup.string(),
              audit_modulo: Yup.string().ensure(),
              audit_entidad: Yup.string().ensure(),
              audit_accciones: Yup.string().ensure(),
              audit_conglomerado: Yup.string().ensure(),
              audit_empresa: Yup.string().ensure(),
              audit_sede: Yup.string().ensure(),
              audit_dependencia: Yup.string().ensure(),
              audit_usuarios: Yup.string().ensure()
            })}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <form className="">
                      <div className="row">
                        <div className="col-sm-6  ">
                          <label>Fecha desde</label>
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            placeholder="Desde"
                            name="audit_fechaDesde"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.audit_fechaDesde}
                          />
                        </div>
                        <div className="col-sm-6">
                          <label>Fecha hasta</label>
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            placeholder="Hasta"
                            name="audit_fechaHasta"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.audit_fechaHasta}
                          />
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-sm-6">
                          <label>Módulo</label>
                          <select
                            name="audit_modulo"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.audit_modulo}
                            className="form-control form-control-sm"
                          >
                            <option value={''}>-- Seleccione --</option>
                            {mapOptionsModules}
                          </select>
                        </div>
                        <div className="col-sm-6">
                          <label>Entidad</label>
                          <select
                            name="audit_entidad"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.audit_entidad}
                            className="form-control form-control-sm"
                          >
                            <option value={''}>-- Seleccione --</option>
                            {mapOptionsEntities}
                          </select>
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-sm-12">
                          <label>Acciones</label>
                          <select
                            name="audit_accciones"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.audit_accciones}
                            className="form-control form-control-sm"
                          >
                            <option value={''}>-- Seleccione --</option>
                            {mapOptionsActions}
                          </select>
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-sm-6">
                          <label>Conglomerado</label>
                          <select
                            name="audit_conglomerado"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.audit_conglomerado}
                            className="form-control form-control-sm"
                          >
                            <option value={''}>-- Seleccione --</option>
                            {mapOptionsConglomerate}
                          </select>
                        </div>
                        <div className="col-sm-6">
                          <label>Empresa</label>
                          <select
                            name="audit_empresa"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.audit_empresa}
                            className="form-control form-control-sm"
                          >
                            <option value={''}>-- Seleccione --</option>
                            {mapOptionsCompanys}
                          </select>
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-sm-6">
                          <label>Sede</label>
                          <select
                            name="audit_sede"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.audit_sede}
                            className="form-control form-control-sm"
                          >
                            <option value={''}>-- Seleccione --</option>
                            {mapOptionsHeadquarters}
                          </select>
                        </div>
                        <div className="col-sm-6">
                          <label>Dependencia</label>
                          <select
                            name="audit_dependencia"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.audit_dependencia}
                            className="form-control form-control-sm"
                          >
                            <option value={''}> -- Seleccione --</option>
                            {mapOptionsDependence}
                          </select>
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-sm-12">
                          <label>Usuarios</label>
                          <select
                            name="audit_usuarios"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.audit_usuarios}
                            className="form-control form-control-sm"
                          >
                            <option value={''}>-- Seleccione --</option>
                            {mapOptionsUsers}
                          </select>
                        </div>
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      type="button"
                      className="btn btn-success btn-sm"
                    >
                      {' '}
                      <i className="fa fa-filter" /> Consultar{' '}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: !this.state.modal });
                      }}
                    >
                      {' '}
                      <i className="fa fa-times" /> Cerrar{' '}
                    </button>
                  </ModalFooter>
                </Fragment>
              );
            }}
          </Formik>
        </Modal>
      </Fragment>
    );
  }
}

// Aca se valida que el props que se va a pasar sea un bool y no cualquier valor
ModalSearchAuditoria.propTypes = {
  modalSearch: PropTypes.bool.isRequired
};

export default ModalSearchAuditoria;
