import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  CustomInput,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import axios from 'axios';
import { CsvToHtmlTable } from 'react-csv-to-table';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import { Formik, Field, ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import { withTranslation } from 'react-i18next';
import classnames from 'classnames';
import fileTypeDocumentary from './../../../assets/files/FilesImportCSV/type_documentary.csv';
import fileTypeDocumentaryUsers from './../../../assets/files/FilesImportCSV/type_documentary_users.csv';

class FormImportTipoDocumental extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      username: 'ccuartas',
      activeTab: '1'
    };
  }
  toogleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  onChange = e => {
    this.setState({
      file: e.target.files[0]
    });
  };

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <Row>
          <ToastContainer />
          <Col md="4">
            {this.state.activeTab === '1' ? (
              <div className="list-group">
                <a className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{t('app_ciudad_import_step_1')}</h5>
                  </div>
                  <p className="mb-1" style={{ textAlign: 'justify' }}>
                    {t('app_ciudad_import_step_1_descripcion')}
                    <br />
                    <a
                      href={fileTypeDocumentary}
                      download="typedocumentary.csv"
                    >
                      <b>Plantilla de formato de importación</b>
                    </a>
                  </p>
                </a>
                <a className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{t('app_ciudad_import_step_2')}</h5>
                  </div>
                  <p className="mb-1" style={{ textAlign: 'justify' }}>
                    {t('app_ciudad_import_step_2_descripcion')}
                  </p>
                </a>
                <a className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{t('app_ciudad_import_step_3')}</h5>
                  </div>
                  <p className="mb-1" style={{ textAlign: 'justify' }}>
                    {t('app_ciudad_import_step_3_descripcion')}
                  </p>
                </a>
              </div>
            ) : (
              <div className="list-group">
                <a className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{t('app_ciudad_import_step_1')}</h5>
                  </div>
                  <p className="mb-1" style={{ textAlign: 'justify' }}>
                    {t('app_ciudad_import_step_1_descripcion')}
                    <br />
                    <a
                      href={fileTypeDocumentaryUsers}
                      download="typedocumentary_users.csv"
                    >
                      <b>Plantilla de formato de importación</b>
                    </a>
                  </p>
                </a>
              </div>
            )}
          </Col>
          <Col md="8">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '1'
                  })}
                  onClick={() => {
                    this.toogleTab('1');
                  }}
                >
                  Importar tipo documental
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '2'
                  })}
                  onClick={() => {
                    this.toogleTab('2');
                  }}
                >
                  Importar usuarios al tipo de documental
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Formik
                  onSubmit={(values, { setSubmitting }) => {
                    const separator = separador => {
                      let separador_empty = '';
                      if (separador === undefined) {
                        separador = separador_empty;
                        return separador_empty;
                      } else {
                        return separador;
                      }
                    };
                    const formData = new FormData();
                    const file = this.state.file;
                    const separador = values.separador_csv;
                    formData.append('file', file);
                    formData.append(
                      'separator',
                      separator(values.separador_csv)
                    );
                    setTimeout(() => {
                      axios
                        .post(
                          `http://192.168.10.180:7017/api/sgdea/typedocumentary/import/?username=${this.state.username}`,
                          formData,
                          {
                            headers: {
                              'Content-Type': 'multipart/form-data'
                            }
                          }
                        )
                        .then(response => {
                          if (response.status === 200) {
                            toast.success(
                              'La importación del tipo documental se hizo satisfactoriamente.',
                              {
                                position: toast.POSITION.TOP_RIGHT,
                                className: css({
                                  marginTop: '60px'
                                })
                              }
                            );
                          } else if (response.status !== 200) {
                            toast(
                              'No se pudo realizar la importación, por favor verifique el archivo CSV.',
                              {
                                position: toast.POSITION.TOP_RIGHT,
                                className: css({
                                  marginTop: '60px'
                                })
                              }
                            );
                          }
                        })
                        .catch(error => {
                          toast.error(`${error}`, {
                            position: toast.POSITION.TOP_RIGHT,
                            className: css({
                              marginTop: '60px'
                            })
                          });
                        });
                    }, 1000);
                  }}
                  validationSchema={Yup.object().shape({
                    separador_csv: Yup.string()
                      // .required(' Por favor introduzca un separador.')
                      .max(1, ' Máximo 1 carácter')
                      .min(1, ' Por favor introduzca un separador.'),
                    titulos: Yup.bool().test(
                      'Activo',
                      '',
                      value => value === true
                    )
                    // archivo: Yup.mixed(),
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
                        <div className="card">
                          <div className="card-body">
                            <form className="form">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>
                                      {' '}
                                      {t(
                                        'app_ciudad_import_form_separador'
                                      )}{' '}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      name={'separador_csv'}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.separador_csv}
                                      type="text"
                                      className={`form-control form-control-sm ${errors.separador_csv &&
                                        touched.separador_csv &&
                                        'is-invalid'}`}
                                    />
                                    <div
                                      className=""
                                      style={{ color: '#D54B4B' }}
                                    >
                                      {errors.separador_csv &&
                                      touched.separador_csv ? (
                                        <i class="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="separador_csv" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>
                                      {t('app_ciudad_import_form_titulos')}
                                    </label>
                                    <CustomInput
                                      name={'titulos'}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.titulos}
                                      type="checkbox"
                                      id="ExampleInputCheckbox3"
                                      label={t(
                                        'app_ciudad_import_form_titulos_label'
                                      )}
                                      className={
                                        errors.titulos &&
                                        touched.titulos &&
                                        'invalid-feedback'
                                      }
                                    />{' '}
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label>
                                      {t('app_ciudad_import_form_archivo')}{' '}
                                      <b>CSV</b>{' '}
                                      <span className="text-danger"> * </span>
                                    </label>
                                    <CustomInput
                                      type="file"
                                      name={'archivo'}
                                      onBlur={handleBlur}
                                      onChange={e => this.onChange(e)}
                                      label={this.props.t(
                                        'app_ciudad_import_form_file'
                                      )}
                                      className={`form-control ${errors.archivo &&
                                        touched.archivo &&
                                        'is-invalid'}`}
                                    />
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="card-footer">
                            <div className="text-right">
                              <button
                                type="button"
                                className={'btn btn-outline-secondary btn-sm'}
                                onClick={e => {
                                  e.preventDefault();
                                  handleSubmit();
                                }}
                              >
                                <i className="fa fa-save" />{' '}
                                {t('app_ciudad_import_from_boton')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    );
                  }}
                </Formik>
              </TabPane>
              <TabPane tabId="2">
                <Formik
                  onSubmit={(values, { setSubmitting }) => {
                    const separator = separador => {
                      let separador_empty = '';
                      if (separador === undefined) {
                        separador = separador_empty;
                        return separador_empty;
                      } else {
                        return separador;
                      }
                    };
                    const formData = new FormData();
                    const file = this.state.file;
                    const separador = values.separador_csv_users;
                    formData.append('file', file);
                    formData.append(
                      'separator',
                      separator(values.separador_csv_users)
                    );
                    setTimeout(() => {
                      axios
                        .post(
                          `http://192.168.10.180:7020/api/sgdea/typedocumentary/users/import/?username=${this.state.username}`,
                          formData,
                          {
                            headers: {
                              'Content-Type': 'multipart/form-data'
                            }
                          }
                        )
                        .then(response => {
                          if (response.status === 200) {
                            toast.success(
                              'La importación de los usuarios del tipo documental se hizo satisfactoriamente.',
                              {
                                position: toast.POSITION.TOP_RIGHT,
                                className: css({
                                  marginTop: '60px'
                                })
                              }
                            );
                          } else if (response.status !== 200) {
                            toast(
                              'No se pudo realizar la importación, por favor verifique el archivo CSV.',
                              {
                                position: toast.POSITION.TOP_RIGHT,
                                className: css({
                                  marginTop: '60px'
                                })
                              }
                            );
                          }
                        })
                        .catch(error => {
                          toast.error(`${error}`, {
                            position: toast.POSITION.TOP_RIGHT,
                            className: css({
                              marginTop: '60px'
                            })
                          });
                        });
                    }, 1000);
                  }}
                  validationSchema={Yup.object().shape({
                    separador_csv_users: Yup.string()
                      // .required(' Por favor introduzca un separador.')
                      .max(1, ' Máximo 1 carácter')
                      .min(1, ' Por favor introduzca un separador.'),
                    titulos_users: Yup.bool().test(
                      'Activo',
                      '',
                      value => value === true
                    )
                    // archivo: Yup.mixed(),
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
                        <div className="card">
                          <div className="card-body">
                            <form className="form">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>
                                      {' '}
                                      {t(
                                        'app_ciudad_import_form_separador'
                                      )}{' '}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      name={'separador_csv_users'}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.separador_csv_users}
                                      type="text"
                                      className={`form-control form-control-sm ${errors.separador_csv_users &&
                                        touched.separador_csv_users &&
                                        'is-invalid'}`}
                                    />
                                    <div
                                      className=""
                                      style={{ color: '#D54B4B' }}
                                    >
                                      {errors.separador_csv_users &&
                                      touched.separador_csv_users ? (
                                        <i class="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="separador_csv_users" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>
                                      {t('app_ciudad_import_form_titulos')}
                                    </label>
                                    <CustomInput
                                      name={'titulos_users'}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.titulos_users}
                                      type="checkbox"
                                      id="ExampleInputCheckbox3"
                                      label={t(
                                        'app_ciudad_import_form_titulos_label'
                                      )}
                                      className={
                                        errors.titulos_users &&
                                        touched.titulos_users &&
                                        'invalid-feedback'
                                      }
                                    />{' '}
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label>
                                      {t('app_ciudad_import_form_archivo')}{' '}
                                      <b>CSV</b>{' '}
                                      <span className="text-danger"> * </span>
                                    </label>
                                    <CustomInput
                                      type="file"
                                      name={'archivo_users'}
                                      onBlur={handleBlur}
                                      onChange={e => this.onChange(e)}
                                      label={this.props.t(
                                        'app_ciudad_import_form_file'
                                      )}
                                      className={`form-control ${errors.archivo_users &&
                                        touched.archivo_users &&
                                        'is-invalid'}`}
                                    />
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="card-footer">
                            <div className="text-right">
                              <button
                                type="button"
                                className={'btn btn-outline-secondary btn-sm'}
                                onClick={e => {
                                  e.preventDefault();
                                  handleSubmit();
                                }}
                              >
                                <i className="fa fa-save" />{' '}
                                {t('app_ciudad_import_from_boton')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    );
                  }}
                </Formik>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={12}>
            <PreviewFile
              file={this.state.file}
              estilos={'table table-striped table-hover table-bordered'}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default withTranslation('translations')(FormImportTipoDocumental);

class PreviewFile extends React.Component {
  state = {
    loading: false,
    thumb: undefined
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }
    this.setState(
      {
        loading: true
      },
      () => {
        let reader = new FileReader();

        reader.onloadend = () => {
          this.setState({ loading: false, thumb: reader.result });
        };

        reader.readAsBinaryString(nextProps.file);
      }
    );
  }
  render() {
    const { file } = this.props;
    const { loading } = this.state;
    const thumb = this.state.thumb;

    if (!file) {
      return null;
    }

    if (loading) {
      return <p>loading...</p>;
    }

    // console.log(thumb.toString());
    // console.log(file.type);

    return <CsvToHtmlTable data={thumb} tableClassName={this.props.estilos} />;
  }
}
