import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CustomInput,
  Alert
} from 'reactstrap';
import {
  CONGLOMERATES_STATUS,
  COMPANYS_STATUS,
  HEADQUARTERS_STATUS,
  CHARGES_STATUS
} from './../../../services/EndPoints';
import IMGDEPENDENCIA from './../../../assets/img/settings-work-tool.svg';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

class ModalEditDependencia extends React.Component {
  state = {
    modal: this.props.modaledit,
    id: this.props.id,
    userLogged: 'jferrer',
    dataDependence: {},
    dataCharge: {},
    dataDependenceConglomerate: {},
    dataDependenceCompany: {},
    dataDependenceSede: {},
    dataResult: {},
    dataConglomerate: [0],
    dataCompany: [0],
    dataChargeList: [0],
    dataHeadquarterList: [0],
    alertError: false,
    alertSuccess: false,
    alertError400: false,
    t: this.props.t,
    status: 0,
    username: 'ccuartas'
  };

  componentDidMount() {
    this.getDataConglomerate();
    this.getDataCompany();
    this.getDataCharge();
    this.getDataHeadquarterList();
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    this.getDataDependence(id);
  };

  getDataDependence = id => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/dependence/${id}?username=${this.state.username}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + window.btoa('sgdea:123456')
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataDependence: data,
          dataCharge: data.charge,
          dataDependenceConglomerate: data.headquarter.company.conglomerate,
          dataDependenceCompany: data.headquarter.company,
          dataDependenceSede: data.headquarter
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  getDataConglomerate = () => {
    fetch(CONGLOMERATES_STATUS, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + window.btoa('sgdea:123456'),
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataConglomerate: data
        });
      })
      .catch(Error => {
        console.log('', Error);
      });
  };

  getDataCompany = () => {
    fetch(COMPANYS_STATUS, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + window.btoa('sgdea:123456'),
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCompany: data
        });
      })
      .catch(Error => console.log('Error', Error));
  };

  getDataCharge = () => {
    fetch(CHARGES_STATUS, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + window.btoa('sgdea:123456'),
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataChargeList: data
        });
      })
      .catch(Error => console.log('Error', Error));
  };

  getDataHeadquarterList = () => {
    fetch(HEADQUARTERS_STATUS, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + window.btoa('sgdea:123456'),
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataHeadquarterList: data
        });
      })
      .catch(Error => console.log('', Error));
  };

  render() {
    const result = {
      conglomerate: this.state.dataDependenceConglomerate.id,
      company: this.state.dataDependenceCompany.id,
      headquarter: this.state.dataDependenceSede.id,
      charge: this.state.dataCharge.id,
      name: this.state.dataDependence.name,
      code: this.state.dataDependence.code,
      description: this.state.dataDependence.description,
      status: this.state.dataDependence.status
    };
    const conglomerateList = this.state.dataConglomerate.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    const companyList = this.state.dataCompany.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    const headquarterList = this.state.dataHeadquarterList.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    const chargeList = this.state.dataChargeList.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {this.props.t('app_dependencia_modal_actualizar_titulo')}{' '}
            {this.state.dataDependence.name}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={result}
            onSubmit={(values, { setSubmitting }) => {
              const tipoEstado = data => {
                let tipo;
                if (data === true || data === 1) {
                  return (tipo = 1);
                } else if (data === false || data === 0) {
                  return (tipo = 0);
                }
                return 0;
              };

              setTimeout(() => {
                fetch(`http://192.168.10.180:7000/api/sgdea/dependence`, {
                  method: 'PUT',
                  headers: {
                    Authorization: 'Basic ' + window.btoa('sgdea:123456'),
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    id: this.state.id,
                    code: values.code,
                    name: values.name,
                    description: values.description,
                    headquarterId: values.headquarter,
                    chargeId: values.charge,
                    status: tipoEstado(values.status),
                    userName: this.state.userLogged
                  })
                })
                  .then(response => {
                    if (response.status === 200) {
                      this.setState({
                        alertSuccess: true
                      });
                      setTimeout(() => {
                        this.setState(
                          {
                            alertSuccess: false,
                            modal: false
                          },
                          () => this.props.updateTable()
                        );
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertError400: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError400: false
                        });
                      }, 3000);
                    } else if (response.status === 500) {
                      this.setState({
                        alertError: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError: false,
                          modal: !this.state.modal
                        });
                      }, 3000);
                    }
                  })
                  .catch(Error => console.log('Error', Error));
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              conglomerate: Yup.string()
                .ensure()
                .required(' Por favor seleccione un conglomerado.'),
              company: Yup.string()
                .ensure()
                .required(' Por favor seleccione una empresa.'),
              headquarter: Yup.string()
                .ensure()
                .required(' Por favor seleccione una sede.'),
              code: Yup.string()
                .required(' Por favor introduzca un código alfanumérico.')
                .matches(/^[0-9a-zA-Z]+$/, ' No es un código alfanumérico.')
                .min(2, ' Mínimo 2 caracteres.')
                .max(15, ' Máximo 15 caracteres.'),
              name: Yup.string().required(' Por favor introduzca un código.'),
              description: Yup.string().max(250, 'Máximo 250 caracteres.'),
              charge: Yup.string()
                .ensure()
                .required(' Por favor seleccione el cargo.'),
              status: Yup.bool().test('Activado', '', value => value === true)
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
                handleReset,
                setFieldValue,
                setFieldTouched
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <Alert color="danger" isOpen={this.state.alertError400}>
                      Error, la dependencia ya esta asignada.
                    </Alert>
                    <Alert
                      color="danger"
                      isOpen={this.state.alertError}
                      toggle={this.onDismiss}
                    >
                      Error al actualizar la dependencia
                    </Alert>
                    <Alert
                      color="success"
                      isOpen={this.state.alertSuccess}
                      toggle={this.onDismiss}
                    >
                      Se actualizo la dependencia con éxito.
                    </Alert>
                    <form className="form">
                      <div className="row">
                        <div className="col-md-3">
                          <img src={IMGDEPENDENCIA} className="img-thumbnail" />
                        </div>
                        <div className="col-md-9">
                          <div className="">
                            <h5
                              className=""
                              style={{ borderBottom: '1px solid black' }}
                            >
                              {' '}
                              {this.props.t(
                                'app_dependencia_modal_actualizar_titulo_2'
                              )}{' '}
                            </h5>{' '}
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  {this.state.t(
                                    'app_dependencia_form_actualizar_conglomerado'
                                  )}{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <SelectConglomerado
                                  t={this.state.t}
                                  name={'conglomerate'}
                                  onChange={e =>
                                    setFieldValue(
                                      'conglomerate',
                                      e.target.value
                                    )
                                  }
                                  onBlur={() =>
                                    setFieldTouched('conglomerate', true)
                                  }
                                  value={values.conglomerate}
                                  className={`form-control form-control-sm ${errors.conglomerate &&
                                    touched.conglomerate &&
                                    'is-invalid'}`}
                                />
                                {/* <select
                                  name="conglomerate"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.conglomerate}
                                  className="form-control form-control-sm"
                                >
                                  <option value="">
                                    --
                                    {this.props.t(
                                      'app_dependencia_form_actualizar_select_conglomerado'
                                    )}{' '}
                                    --
                                  </option>
                                  {conglomerateList}
                                </select> */}
                                <div style={{ color: '#D54B4B' }}>
                                  {errors.conglomerate &&
                                  touched.conglomerate ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="conglomerate" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  {this.props.t(
                                    'app_dependencia_form_actualizar_empresa'
                                  )}{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <SelectCompany
                                  t={this.state.t}
                                  conglomerate={props.values.conglomerate}
                                  name="company"
                                  value={values.company}
                                  onChange={e =>
                                    setFieldValue('company', e.target.value)
                                  }
                                  onBlur={() =>
                                    setFieldTouched('company', true)
                                  }
                                  className={`form-control form-control-sm ${errors.company &&
                                    touched.company &&
                                    'is-invalid'}`}
                                ></SelectCompany>
                                {/* <select
                                  name="company"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.company}
                                  className="form-control form-control-sm"
                                >
                                  <option value="">
                                    --{' '}
                                    {this.props.t(
                                      'app_dependencia_form_actualizar_select_empresa'
                                    )}{' '}
                                    --
                                  </option>
                                  {companyList}
                                </select> */}
                                <div style={{ color: '#D54B4B' }}>
                                  {errors.company && touched.company ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="company" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  {this.props.t(
                                    'app_dependencia_form_actualizar_sede'
                                  )}{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <SelectHeadquarter
                                  t={this.state.t}
                                  company={props.values.company}
                                  name={'headquarter'}
                                  value={values.headquarter}
                                  onChange={e =>
                                    setFieldValue('headquarter', e.target.value)
                                  }
                                  onBlur={() =>
                                    setFieldTouched('headquarter', true)
                                  }
                                  className={`form-control form-control-sm ${errors.headquarter &&
                                    touched.headquarter &&
                                    'is-invalid'}`}
                                ></SelectHeadquarter>
                                {/* <select
                                  name="headquarter"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.headquarter}
                                  className="form-control form-control-sm"
                                >
                                  <option value={' '}>
                                    --{' '}
                                    {this.props.t(
                                      'app_dependencia_form_actualizar_select_sede'
                                    )}{' '}
                                    --
                                  </option>
                                  {headquarterList}
                                </select> */}
                                <div style={{ color: '#D54B4B' }}>
                                  {errors.headquarter && touched.headquarter ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="headquarter" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  {this.props.t(
                                    'app_dependencia_form_actualizar_codigo'
                                  )}{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <input
                                  name={'code'}
                                  type="text"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.code}
                                  className="form-control form-control-sm"
                                />
                                <div style={{ color: '#D54B4B' }}>
                                  {errors.code && touched.code ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="code" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  {this.props.t(
                                    'app_dependencia_form_actualizar_nombre'
                                  )}{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <input
                                  type="text"
                                  name={'name'}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.name}
                                  className={`form-control form-control-sm ${errors.name &&
                                    touched.name &&
                                    'is-invalid'}`}
                                />
                                <div style={{ color: '#D54B4B' }}>
                                  {errors.name && touched.name ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="name" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  {this.props.t(
                                    'app_dependencia_form_actualizar_cargo_responsable'
                                  )}{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <select
                                  name={'charge'}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.charge}
                                  className="form-control form-control-sm"
                                >
                                  <option value="">
                                    --{' '}
                                    {this.props.t(
                                      'app_dependencia_form_actualizar_select_cargo_responsable'
                                    )}{' '}
                                    --
                                  </option>
                                  {chargeList}
                                </select>
                                <div style={{ color: '#D54B4B' }}>
                                  {errors.charge && touched.charge ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="charge" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  {this.props.t(
                                    'app_dependencia_form_actualizar_descripcion'
                                  )}{' '}
                                </label>
                                <textarea
                                  name={'description'}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.description}
                                  className="form-control"
                                />
                                <div style={{ color: '#D54B4B' }}>
                                  {errors.description && touched.description ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="description" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {this.props.t(
                                    'app_dependencia_form_actualizar_estado'
                                  )}{' '}
                                  <span className="text-danger">*</span>
                                </label>
                                <div className="text-justify">
                                  <Field
                                    name="status"
                                    render={({ field, form }) => {
                                      //console.log("field", field);
                                      return (
                                        // <input
                                        //   type="checkbox"
                                        //   checked={field.value}
                                        //   {...field}
                                        // />
                                        <CustomInput
                                          type="checkbox"
                                          id="dependenciaModalEdit"
                                          label={this.props.t(
                                            'app_dependencia_form_actualizar_estado_descripcion'
                                          )}
                                          {...field}
                                          checked={field.value}
                                          className={
                                            errors.status &&
                                            touched.status &&
                                            'invalid-feedback'
                                          }
                                        />
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className={'btn btn-outline-success btn-sm'}
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <i className="fa fa-pencil" />{' '}
                      {this.props.t(
                        'app_dependencia_form_actualizar_boton_actualizar'
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      {' '}
                      <i className="fa fa-times" />{' '}
                      {this.props.t(
                        'app_dependencia_form_actualizar_boton_cerrar'
                      )}{' '}
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

ModalEditDependencia.propTypes = {
  modalEdit: PropTypes.bool.isRequired,
  t: PropTypes.any
};

export default ModalEditDependencia;

//--------------------//

class SelectConglomerado extends React.Component {
  state = {
    dataConglomerate: [],
    t: this.props.t
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/conglomerate/active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataConglomerate: data
        });
      });
  };

  handleChange = value => {
    this.props.onChange('conglomerate', value);
  };

  handleBlur = () => {
    this.props.onBlur('conglomerateId', true);
  };

  render() {
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value}
          onBlur={this.props.onBlur}
          className={this.props.className}
        >
          <option value={''}>
            --{' '}
            {this.props.t(
              'app_dependencia_form_actualizar_select_conglomerado'
            )}{' '}
            --
          </option>
          {this.state.dataConglomerate.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>
                {aux.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

//--------------------//
class SelectCompany extends React.Component {
  state = {
    dataCompany: [],
    id: this.props.conglomerate,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.conglomerate !== state.id) {
      return {
        id: props.conglomerate
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.conglomerate !== prevProps.conglomerate) {
      this.getDataCompany();
    }
  }

  componentDidMount() {
    this.getDataCompany();
  }

  getDataCompany = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/company/conglomerate/${this.state.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + window.btoa('sgdea:123456')
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCompany: data
        });
      })
      .catch(err => console.log('Error', err));
  };
  render() {
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          className={this.props.className}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
        >
          <option value={''}>
            -- {this.props.t('app_dependencia_form_actualizar_select_empresa')}{' '}
            --
          </option>
          {this.state.dataCompany.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>
                {aux.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

//--------------------//

class SelectHeadquarter extends React.Component {
  state = {
    dataHeadquarter: [],
    id: this.props.company,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.company !== state.id) {
      return {
        id: props.company
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.company !== prevProps.company) {
      this.getDataHeadquarter();
    }
  }

  componentDidMount() {
    this.getDataHeadquarter();
  }

  getDataHeadquarter = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/headquarter/company/${this.props.company}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + window.btoa('sgdea:123456')
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataHeadquarter: data
        });
      })
      .catch(err => console.log('Error', err));
  };

  render() {
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          className={this.props.className}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
        >
          <option value={''}>
            -- {this.props.t('app_dependencia_form_actualizar_select_sede')} --
          </option>
          {this.state.dataHeadquarter.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>
                {aux.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
