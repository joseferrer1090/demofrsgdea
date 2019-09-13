import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import { Row, Col, CustomInput } from 'reactstrap';
import axios from 'axios';
import { CsvToHtmlTable } from 'react-csv-to-table';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import { withTranslation } from 'react-i18next';

class FormImportTipoLlegada extends React.Component {
  state = {
    file: null,
    username: 'ccuartas'
  };

  onChange = e => {
    this.setState({
      file: e.target.files[0]
    });
  };
  render() {
    return (
      <Fragment>
        <Row>
          <ToastContainer />
          <Col md="4">
            <div className="list-group">
              <a className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">
                    {this.props.t('app_tipoTercero_import_step_1')}
                  </h5>
                </div>
                <p className="mb-1" style={{ textAlign: 'justify' }}>
                  {this.props.t('app_tipoTercero_import_step_1_descripcion')}
                </p>
              </a>
              <a className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">
                    {this.props.t('app_tipoTercero_import_step_2')}
                  </h5>
                </div>
                <p className="mb-1" style={{ textAlign: 'justify' }}>
                  {this.props.t('app_tipoTercero_import_step_2_descripcion')}
                </p>
              </a>
              <a className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">
                    {this.props.t('app_tipoTercero_import_step_3')}
                  </h5>
                </div>
                <p className="mb-1" style={{ textAlign: 'justify' }}>
                  {this.props.t('app_tipoTercero_import_step_3_descripcion')}
                </p>
              </a>
            </div>
          </Col>
          <Col md="8">
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                const formData = new FormData();
                const file = this.state.file;
                const separador = values.separador_csv;
                formData.append('file', file);
                formData.append('separator', separador);
                setTimeout(() => {
                  axios
                    .post(
                      `http://192.168.10.180:7001/api/sgdea/typethirdparty/import/?username=${this.state.username}`,
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
                          'La importación del cargo se hizo satisfactoriamente.',
                          {
                            position: toast.POSITION.TOP_RIGHT,
                            className: css({
                              marginTop: '60px'
                            })
                          }
                        );
                      } else if (response !== 200) {
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
                  .required(' Por favor introduzca un separador.')
                  .max(1, ' Máximo 1 carácter')
                  .min(1, ' Por favor introduzca un separador.'),
                titulos: Yup.bool().test('Activo', '', value => value === true)
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
                                  {this.props.t(
                                    'app_tipoTercero_import_form_separador'
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
                                <div className="" style={{ color: '#D54B4B' }}>
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
                                  {this.props.t(
                                    'app_tipoTercero_import_form_titulos'
                                  )}
                                </label>
                                <CustomInput
                                  name={'titulos'}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.titulos}
                                  type="checkbox"
                                  id="ExampleInputCheckbox3"
                                  label={this.props.t(
                                    'app_tipoTercero_import_form_titulos_label'
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
                                  {this.props.t(
                                    'app_tipoTercero_import_form_archivo'
                                  )}{' '}
                                  <b>CSV</b>{' '}
                                  <span className="text-danger"> * </span>
                                </label>
                                <CustomInput
                                  type="file"
                                  name={'archivo'}
                                  onBlur={handleBlur}
                                  onChange={e => this.onChange(e)}
                                  label={this.props.t(
                                    'app_tipoTercero_import_form_file'
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
                            {this.props.t('app_tipoTercero_import_from_boton')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              }}
            </Formik>
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

export default withTranslation('translations')(FormImportTipoLlegada);

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
