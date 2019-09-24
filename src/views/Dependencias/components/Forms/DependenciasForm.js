import React, { useState, useEffect } from 'react';
import { Formik, withFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Row,
  Col,
  Buttom,
  CustomInput
} from 'reactstrap';
import {
  DEPENDENCIES,
  CONGLOMERATES_STATUS,
  COMPANYS_STATUS,
  HEADQUARTERS_STATUS,
  CHARGES_STATUS
} from './../../../../services/EndPoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { withTranslation } from 'react-i18next';

const DependenciaForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    handleReset,
    t
  } = props;

  const [optionsConglomerate, setOptionsConglomerate] = useState([]);
  const [optionsCompanys, setOptionsCompanys] = useState([]);
  const [optionsHeadquarters, setOptionsHeadquarters] = useState([]);
  const [optionsCharges, setOptionsCharges] = useState([]);

  useEffect(() => {
    getDataConglomerates();
    getDataCompanys();
    getDataHeadquarters();
    getDataCharges();
  }, []);

  const getDataConglomerates = data => {
    fetch(CONGLOMERATES_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        setOptionsConglomerate(data);
      })
      .catch(Error => console.log(' ', Error));
  };

  const mapOptionsConglomerate = optionsConglomerate.map((aux, idx) => {
    return (
      <option key={aux.id} value={aux.id}>
        {aux.name}
      </option>
    );
  });

  const getDataCompanys = data => {
    fetch(COMPANYS_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        setOptionsCompanys(data);
        // this.setState({
        //   dataConglomerates: data
        // });
      })
      .catch(Error => console.log(' ', Error));
  };

  const mapOptionsCompanys = optionsCompanys.map((aux, idx) => {
    return (
      <option key={aux.id} value={aux.id}>
        {aux.name}
      </option>
    );
  });

  const getDataHeadquarters = data => {
    fetch(HEADQUARTERS_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        setOptionsHeadquarters(data);
        // this.setState({
        //   dataConglomerates: data
        // });
      })
      .catch(Error => console.log(' ', Error));
  };

  const mapOptionsHeadquarters = optionsHeadquarters.map((aux, idx) => {
    return (
      <option key={aux.id} value={aux.id}>
        {aux.name}
      </option>
    );
  });

  const getDataCharges = data => {
    fetch(CHARGES_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        setOptionsCharges(data);
        // this.setState({
        //   dataConglomerates: data
        // });
      })
      .catch(Error => console.log(' ', Error));
  };

  const mapOptionsCharges = optionsCharges.map((aux, idx) => {
    return (
      <option key={aux.id} value={aux.id}>
        {aux.name}
      </option>
    );
  });

  return (
    <div>
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <Card>
            <ToastContainer />
            <CardHeader>{t('app_dependencia_tab_title')}</CardHeader>
            <CardBody>
              <form className="form" role="form">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_dependencia_form_registrar_conglomerado')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      {/* <SelectConglomerado
                        name={'conglomerateId'}
                        onChange={e =>
                          setFieldValue('conglomerateId', e.target.value)
                        }
                        value={values.conglomerateId}
                        className={`form-control form-control-sm ${errors.conglomerateId &&
                          touched.conglomerateId &&
                          'is-invalid'}`}
                      /> */}
                      <select
                        name="conglomerateId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.conglomerateId}
                        className={`form-control form-control-sm ${errors.conglomerateId &&
                          touched.conglomerateId &&
                          'is-invalid'}`}
                      >
                        <option value={''}>
                          --{' '}
                          {t(
                            'app_dependencia_form_registrar_select_conglomerado'
                          )}{' '}
                          --
                        </option>
                        {mapOptionsConglomerate}
                      </select>
                      <div style={{ color: '#D54B4B' }}>
                        {errors.conglomerateId && touched.conglomerateId ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="conglomerateId" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_dependencia_form_registrar_empresa')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      {/* <SelectCompany
                        conglomerateId={props.values.conglomerateId}
                        name="companyId"
                        value={values.companyId}
                        onChange={e =>
                          setFieldValue('companyId', e.target.value)
                        }
                        className={`form-control form-control-sm ${errors.companyId &&
                          touched.companyId &&
                          'is-invalid'}`}
                      ></SelectCompany> */}
                      <select
                        name={'companyId'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.companyId}
                        className={`form-control form-control-sm ${errors.companyId &&
                          touched.companyId &&
                          'is-invalid'}`}
                      >
                        {' '}
                        <option value={''}>
                          {' '}
                          --{' '}
                          {t(
                            'app_dependencia_form_registrar_select_empresa'
                          )}{' '}
                          --
                        </option>
                        {mapOptionsCompanys}{' '}
                      </select>
                      <div style={{ color: '#D54B4B' }}>
                        {errors.companyId && touched.companyId ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="companyId" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_dependencia_form_registrar_sede')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      {/* <SelectHeadquarter
                        companyId={props.values.companyId}
                        name={'headquarterId'}
                        onChange={e =>
                          setFieldValue('headquarterId', e.target.value)
                        }
                        className={`form-control form-control-sm ${errors.headquarterId &&
                          touched.headquarterId &&
                          'is-invalid'}`}
                      ></SelectHeadquarter> */}
                      <select
                        name={'headquarterId'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.headquarterId}
                        className={`form-control form-control-sm ${errors.headquarterId &&
                          touched.headquarterId &&
                          'is-invalid'}`}
                      >
                        <option value={''}>
                          -- {t('app_dependencia_form_registrar_select_sede')}{' '}
                          --
                        </option>
                        {mapOptionsHeadquarters}
                      </select>
                      <div style={{ color: '#D54B4B' }}>
                        {errors.headquarterId && touched.headquarterId ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="headquarterId" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_dependencia_form_registrar_codigo')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <input
                        name={'code'}
                        type="text"
                        placeholder=""
                        onChange={e => {
                          setFieldValue('code', e.target.value.toUpperCase());
                        }}
                        onBlur={handleBlur}
                        value={values.code}
                        className={`form-control form-control-sm ${errors.code &&
                          touched.code &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.code && touched.code ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="code" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_dependencia_form_registrar_nombre')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <input
                        name={'name'}
                        onChange={e => {
                          setFieldValue('name', e.target.value.toUpperCase());
                        }}
                        onBlur={handleBlur}
                        value={values.name}
                        type="text"
                        placeholder=""
                        className={`form-control form-control-sm ${errors.name &&
                          touched.name &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.name && touched.name ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="name" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_dependencia_form_registrar_descripcion')}{' '}
                      </label>
                      <textarea
                        name={'description'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        className="form-control form-control-sm"
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.description && touched.description ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="description" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" />
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t(
                          'app_dependencia_form_registrar_cargo_responsable'
                        )}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <select
                        name={'chargeId'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.chargeId}
                        className={`form-control form-control-sm ${errors.chargeId &&
                          touched.chargeId &&
                          'is-invalid'}`}
                      >
                        {' '}
                        <option value={''}>
                          --{' '}
                          {t(
                            'app_dependencia_form_registrar_select_cargo_responsable'
                          )}{' '}
                          --
                        </option>
                        {mapOptionsCharges}{' '}
                      </select>
                      <div style={{ color: '#D54B4B' }}>
                        {errors.chargeId && touched.chargeId ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="chargeId" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_dependencia_form_registrar_estado')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <div className="text-justify">
                        <CustomInput
                          name={'status'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.status}
                          type="checkbox"
                          id="CheckboxEditDependencia"
                          label={t(
                            'app_dependencia_form_registrar_estado_descripcion'
                          )}
                          className={
                            errors.status &&
                            touched.status &&
                            'invalid-feedback'
                          }
                        />
                        {/* <p
                              className="text-muted"
                              style={{ textAlign: "justify" }}
                            >
                              Si esta opción se encuentra activada, representa
                              que la dependencia es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario la dependencia no se elimina del sistema
                              solo quedará inactivo e invisibles para cada uno
                              de los módulos correspondiente del sistema.
                            </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardBody>
            <CardFooter>
              <div className="float-right">
                <button
                  type="submit"
                  className="btn btn-outline-secondary btn-sm"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <i className=" fa fa-spinner fa-spin" />
                  ) : (
                    <div>
                      <i className="fa fa-save" />{' '}
                      {t('app_dependencia_form_registrar_boton_guardar')}
                    </div>
                  )}
                </button>
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default withTranslation('translations')(
  withFormik({
    mapPropsToValues: props => ({
      conglomerateId: props.dependencia.conglomerateId,
      companyId: props.dependencia.companyId,
      headquarterId: props.dependencia.headquarterId,
      code: props.dependencia.code,
      name: props.dependencia.name,
      description: props.dependencia.description,
      chargeId: props.dependencia.chargeId,
      status: props.dependencia.status
    }),
    validationSchema: Yup.object().shape({
      conglomerateId: Yup.string()
        .ensure()
        .required(' Por favor seleccione un conglomerado.'),
      companyId: Yup.string()
        .ensure()
        .required(' Por favor seleccione una empresa.'),
      headquarterId: Yup.string()
        .ensure()
        .required(' Por favor seleccione una sede.'),
      code: Yup.string()
        .required(' Por favor introduzca un código alfanumérico.')
        .matches(/^[0-9a-zA-Z]+$/, ' No es un código alfanumérico.')
        .min(2, ' Mínimo 2 caracteres.')
        .max(15, ' Máximo 15 caracteres.'),
      name: Yup.string().required(' Por favor introduzca un nombre.'),
      description: Yup.string(),
      chargeId: Yup.string()
        .required(' Por favor seleccione un cargo.')
        .ensure(),
      status: Yup.bool().test(
        'Activo',
        'Es necesario activar el conglomerado.',
        value => value === true
      )
    }),
    handleSubmit: (values, { setSubmitting, resetForm }) => {
      const tipoEstado = data => {
        let tipo = null;
        if (data === true) {
          return (tipo = 1);
        } else if (data === false) {
          return (tipo = 0);
        }
        return null;
      };
      setTimeout(() => {
        fetch(DEPENDENCIES, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + window.btoa('sgdea:123456')
          },
          body: JSON.stringify({
            description: values.description,
            code: values.code,
            name: values.name,
            headquarterId: values.headquarterId,
            chargeId: values.chargeId,
            status: tipoEstado(values.status),
            userName: 'jferrer'
          })
        })
          .then(response =>
            response.json().then(data => {
              if (response.status === 201) {
                toast.success('Se creo la dependencia con éxito.', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: '60px'
                  })
                });
              } else if (response.status === 400) {
                toast.error('Error, la dependencia  ya existe.', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: '60px'
                  })
                });
              } else if (response.status === 500) {
                toast.error('Error, no se pudo crear la dependencia.', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: '60px'
                  })
                });
              }
            })
          )
          .catch(error => {
            toast.error(`Error ${error}`, {
              position: toast.POSITION.TOP_RIGHT,
              className: css({
                marginTop: '60px'
              })
            });
          });
        setSubmitting(false);
        resetForm();
      }, 1000);
    }
  })(DependenciaForm)
);

//--------------------//

class SelectConglomerado extends React.Component {
  state = {
    dataConglomerate: []
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
    this.props.onChange('conglomerateId', value);
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
          className={this.props.className}
        >
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
    id: this.props.conglomerateId
  };

  static getDerivedStateFromProps(props, state) {
    if (props.conglomerateId !== state.id) {
      return {
        id: props.conglomerateId
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.conglomerateId !== prevProps.conglomerateId) {
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
        >
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
    id: this.props.companyId
  };

  static getDerivedStateFromProps(props, state) {
    if (props.companyId !== state.id) {
      return {
        companyId: props.companyId
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.companyId !== prevProps.companyId) {
      this.getDataHeadquarter();
    }
  }

  componentDidMount() {
    this.getDataHeadquarter();
  }

  getDataHeadquarter = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/headquarter/company/${this.props.companyId}`,
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
        >
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
