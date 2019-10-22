import React, { useState, useEffect, Fragment, Component } from 'react';
import { Formik, withFormik, ErrorMessage, Field, Form } from 'formik';
import {
  CONGLOMERATES,
  COUNTRIES,
  DEPARTMENTS,
  CITYS,
  CHARGES,
  COMPANY
} from './../../../../services/EndPoints';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  CustomInput,
  CardFooter
} from 'reactstrap';
import Select from 'react-select';
import CustonImageInput from './CustonImageInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { withTranslation } from 'react-i18next';

const UserForm = props => {
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
    setFieldTouched,
    t
  } = props;

  const [conglomerateOptions, setConglomerateOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [sedeOptions, setSedeOptions] = useState([]);
  const [dependenciaOptions, setDependenciaOptions] = useState([]);
  const [cargoOptions, setCargoOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);

  useEffect(() => {
    dataConglomerate();
    dataCompany();
    dataSedes();
    dataDependencia();
    dataCharge();
    deteRoles();
  }, []);

  // useEffect(async () => {
  //   const result = await axios.get(
  //     "http://192.168.10.180:7000/api/sgdea/role/status/1",
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Basic " + window.btoa("sgdea:123456")
  //       }
  //     }
  //   );
  //   setRoleOptions(result.data);
  // }, []);

  const deteRoles = data => {
    fetch('http://192.168.10.180:7000/api/sgdea/role/active', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        setRoleOptions(data);
      })
      .catch(Error => console.log('Error', Error));
  };

  const dataConglomerate = data => {
    fetch(CONGLOMERATES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        setConglomerateOptions(data);
      })
      .catch(error => console.log(' ' + error));
  };

  const dataCompany = data => {
    fetch('http://192.168.10.180:7000/api/sgdea/company/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        setCompanyOptions(data);
      })
      .catch(Error => console.log(' ' + Error));
  };

  const dataSedes = data => {
    fetch('http://192.168.10.180:7000/api/sgdea/headquarter', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        setSedeOptions(data);
      })
      .catch(Error => console.log(' ' + Error));
  };

  const dataDependencia = data => {
    fetch('http://192.168.10.180:7000/api/sgdea/dependence', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        setDependenciaOptions(data);
      })
      .catch(Error => console.log(' ' + Error));
  };

  const dataCharge = data => {
    fetch('http://192.168.10.180:7000/api/sgdea/charge', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        setCargoOptions(data);
      })
      .catch(Error => console.log(' ' + Error));
  };

  const selectConglomerate = conglomerateOptions.map((aux, id) => {
    return (
      <option key={id} value={aux.id}>
        {aux.name}
      </option>
    );
  });

  const selectCompany = companyOptions.map((aux, id) => {
    return (
      <option key={id} value={aux.id}>
        {aux.name}
      </option>
    );
  });

  const selectSede = sedeOptions.map((aux, id) => {
    return (
      <option key={id} value={aux.id}>
        {aux.name}
      </option>
    );
  });

  const selectDependencia = dependenciaOptions.map((aux, id) => {
    return (
      <option key={id} value={aux.id}>
        {aux.name}
      </option>
    );
  });

  const selectCargo = cargoOptions.map((aux, id) => {
    return (
      <option key={id} value={aux.id}>
        {aux.name}
      </option>
    );
  });
  return (
    <Fragment>
      <Card>
        <ToastContainer />
        <CardHeader> {t('app_usuarios_tab_title')}</CardHeader>
        <CardBody>
          <form encType={'multipart/form-data'}>
            <Row>
              <Col sm="3">
                <div className="text-center">
                  {/* <img
                  src={"/assets/img/avatar2.png"}
                  className="img-thumbnail"
                /> */}
                  <br />
                  <br />
                  <Field
                    name={'foto'}
                    component={CustonImageInput}
                    setFieldValue={setFieldValue}
                    // onChange={event => {
                    //   setFieldValue("foto", event.currentTarget.files[0]);
                    // }}
                  />

                  {/* <input
                    type="file"
                    style={{ display: "none" }}
                    // ref={this.inputOpenFileRef}
                    value={values.imageUser}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  /> */}
                  {/* <button
                  type="button"
                  className="btn btn-secondary btn-sm "
                  style={{ width: "160px" }}
                  onClick={showOpenFileDlg}
                >
                  {" "}
                  <i className="fa fa-camera" /> Cambiar imagen{" "}
                </button> */}
                </div>
              </Col>

              <Col sm="9">
                <div className="">
                  {' '}
                  <h5 className="" style={{ borderBottom: '1px solid black' }}>
                    {' '}
                    {t('app_usuarios_form_registrar_titulo_1')}{' '}
                  </h5>{' '}
                </div>
                <br />
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_usuarios_form_registrar_identificacion')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <input
                        name={'identificacion'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.identificacion}
                        type="text"
                        className={`form-control form-control-sm ${errors.identificacion &&
                          touched.identificacion &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.identificacion && touched.identificacion ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="identificacion" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_usuarios_form_registrar_nombre')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <input
                        name={'nombre'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nombre}
                        type="text"
                        className={`form-control form-control-sm ${errors.nombre &&
                          touched.nombre &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.nombre && touched.nombre ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="nombre" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_usuarios_form_registrar_email')}{' '}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        name={'email'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        type="text"
                        className={`form-control form-control-sm ${errors.email &&
                          touched.email &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.email && touched.email ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_usuarios_form_registrar_telefono')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <input
                        name={'telefono'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.telefono}
                        type="text"
                        className={`form-control form-control-sm ${errors.telefono &&
                          touched.telefono &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.telefono && touched.telefono ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="telefono" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_usuarios_form_registrar_direccion')}{' '}
                      </label>
                      <input
                        name={'direccion'}
                        type="text"
                        className="form-control form-control-sm"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.direccion}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {t('app_usuarios_form_registrar_fecha_nacimiento')}{' '}
                      </label>
                      <input
                        name={'f_d_nacimiento'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.f_d_nacimiento}
                        type="date"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <h5 className="" style={{ borderBottom: '1px solid black' }}>
                  {' '}
                  {t('app_usuarios_form_registrar_titulo_2')}{' '}
                </h5>{' '}
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_usuarios_form_registrar_conglomerado')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <SelectConglomerado
                        t={props.t}
                        name={'conglomeradoID'}
                        // onChange={setFieldValue}
                        // onBlur={setFieldTouched}
                        onChange={e =>
                          setFieldValue('conglomeradoID', e.target.value)
                        }
                        value={values.conglomeradoID}
                        className={`form-control form-control-sm ${errors.conglomeradoID &&
                          touched.conglomeradoID &&
                          'is-invalid'}`}
                      ></SelectConglomerado>
                      {/* <select
                        name={"conglomeradoID"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.conglomeradoID}
                        className={`form-control form-control-sm ${errors.conglomeradoID &&
                          touched.conglomeradoID &&
                          "is-invalid"}`}
                      >
                        {" "}
                        <option disabled value={""}>
                          {" "}
                          -- Seleccione --{" "}
                        </option>{" "}
                        {selectConglomerate}
                      </select> */}
                      {touched ? (
                        <div style={{ color: 'red' }}>
                          {' '}
                          <div style={{ color: '#D54B4B' }}>
                            {errors.conglomeradoID && touched.conglomeradoID ? (
                              <i className="fa fa-exclamation-triangle" />
                            ) : null}
                            <ErrorMessage name={'conglomeradoID'} />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_usuarios_form_registrar_empresa')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <SelectCompany
                        t={props.t}
                        conglomerate={props.values.conglomeradoID}
                        name="empresaID"
                        value={values.empresaID}
                        onChange={e =>
                          setFieldValue('empresaID', e.target.value)
                        }
                        className={`form-control form-control-sm ${errors.empresaID &&
                          touched.empresaID &&
                          'is-invalid'}`}
                      ></SelectCompany>
                      {/* <select
                        name={"empresaID"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.empresaID}
                        className={`form-control form-control-sm ${errors.empresaID &&
                          touched.empresaID &&
                          "is-invalid"}`}
                      >
                        {" "}
                        <option value={""}> -- Seleccione -- </option>{" "}
                        {selectCompany}
                      </select> */}
                      <div style={{ color: '#D54B4B' }}>
                        {errors.empresaID && touched.empresaID ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="empresaID" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_usuarios_form_registrar_sede')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <SelectHeadquarter
                        t={props.t}
                        company={props.values.empresaID}
                        name={'sedeID'}
                        onChange={e => setFieldValue('sedeID', e.target.value)}
                        className={`form-control form-control-sm ${errors.sedeID &&
                          touched.sedeID &&
                          'is-invalid'}`}
                      ></SelectHeadquarter>
                      {/* <select
                        name={"sedeID"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.sedeID}
                        className={`form-control form-control-sm ${errors.sedeID &&
                          touched.sedeID &&
                          "is-invalid"}`}
                      >
                        {" "}
                        <option value={""}> -- Seleccione -- </option>{" "}
                        {selectSede}
                      </select> */}
                      <div style={{ color: '#D54B4B' }}>
                        {errors.sedeID && touched.sedeID ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name={'sedeID'} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_usuarios_form_registrar_dependencia')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <SelectDependence
                        t={props.t}
                        headquarter={props.values.sedeID}
                        name={'dependenciaID'}
                        value={values.dependenciaID}
                        onChange={e =>
                          setFieldValue('dependenciaID', e.target.value)
                        }
                        className={`form-control form-control-sm ${errors.dependenciaID &&
                          touched.dependenciaID &&
                          'is-invalid'}`}
                      ></SelectDependence>
                      {/* <select
                        name={"dependenciaID"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.dependenciaID}
                        className={`form-control form-control-sm ${errors.dependenciaID &&
                          touched.dependenciaID &&
                          "is-invalid"}`}
                      >
                        <option value={""}> -- Seleccione -- </option>
                        {selectDependencia}
                        </select>*/}
                      <div style={{ color: '#D54B4B' }}>
                        {errors.dependenciaID && touched.dependenciaID ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="dependenciaID" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_usuarios_form_registrar_cargo')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <select
                        name={'cargoID'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.cargoID}
                        className={`form-control form-control-sm ${errors.cargoID &&
                          touched.cargoID &&
                          'is-invalid'}`}
                      >
                        <option value={''}>
                          {' '}
                          -- {t(
                            'app_usuarios_form_registrar_cargo_select'
                          )} --{' '}
                        </option>
                        {selectCargo}
                      </select>
                      <div style={{ color: '#D54B4B' }}>
                        {errors.cargoID && touched.cargoID ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="cargoID" />
                      </div>
                    </div>
                  </div>
                </div>
                <h5 className="" style={{ borderBottom: '1px solid black' }}>
                  {' '}
                  {t('app_usuarios_form_registrar_titulo_3')}{' '}
                </h5>{' '}
                <br />
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_usuarios_form_registrar_username')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <input
                        name={'username'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        className={`form-control form-control-sm ${errors.username &&
                          touched.username &&
                          'is-invalid'}`}
                        type="text"
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.username && touched.username ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="username" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_usuarios_form_registrar_contraseña')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <input
                        name={'password'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={`form-control form-control-sm ${errors.password &&
                          touched.password &&
                          'is-invalid'}`}
                        type="password"
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.password && touched.password ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t(
                          'app_usuarios_form_registrar_confirmar_contraseña'
                        )}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <input
                        name={'confirm_password'}
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirm_password}
                        className={`form-control form-control-sm ${errors.confirm_password &&
                          touched.confirm_password &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.confirm_password && touched.confirm_password ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="confirm_password" />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_usuarios_form_registrar_roles')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <MySelect
                        t={props.t}
                        name={'rolesID'}
                        value={values.rolesID}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.rolesID}
                        touched={touched.rolesID}
                      />{' '}
                      {touched ? (
                        <div style={{ color: 'red' }}>
                          {' '}
                          <div style={{ color: '#D54B4B' }}>
                            {errors.rolesID && touched.rolesID ? (
                              <i className="fa fa-exclamation-triangle" />
                            ) : null}
                            <ErrorMessage name={'roles'} />
                          </div>
                        </div>
                      ) : null}
                      {/* <select
                        name={"roles"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.roles}
                        className={`form-control form-control-sm ${errors.roles &&
                          touched.roles &&
                          "is-invalid"}`}
                      >
                        <option>--Seleccione--</option>
                      </select> */}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_usuarios_form_registrar_estado')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <div className="text-justify">
                        <CustomInput
                          type="checkbox"
                          id="ExampleCheckBoxInput"
                          label={t(
                            'app_usuarios_form_registrar_estado_descripcion'
                          )}
                          name={'estado'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.estado}
                          className={
                            errors.estado &&
                            touched.estado &&
                            'invalid-feedback'
                          }
                        />
                        {/* <label
                                  className="form-check-label"
                                  htmlFor="exampleCheck1"
                                >
                                  Activar
                                </label> */}
                        {/* <p
                                  className="text-muted"
                                  style={{ textAlign: "justify" }}
                                >
                                  Si esta opción se encuentra activada,
                                  representa que el usuario es visible en el
                                  sistema y se podrán realizar operaciones entre
                                  cada uno de los módulos correspondientes de la
                                  aplicación. En caso contrario el usuario no se
                                  elimina del sistema solo quedará inactivo e
                                  invisibles para cada uno de los módulos
                                  correspondiente del sistema.
                                </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
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
                  {t('app_usuarios_form_registrar_boton_guardar')}
                </div>
              )}
            </button>
          </div>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default withTranslation('translations')(
  withFormik({
    mapPropsToValues: props => ({
      identificacion: props.user.identificacion,
      nombre: props.user.nombre,
      email: props.user.email,
      telefono: props.user.telefono,
      direccion: props.user.direccion,
      f_d_nacimiento: props.user.f_d_nacimiento,
      conglomeradoID: props.user.conglomeradoID,
      empresaID: props.user.empresaID,
      sedeID: props.user.sedeID,
      dependenciaID: props.user.dependenciaID,
      cargoID: props.user.cargoID,
      username: props.user.username,
      password: props.user.password,
      confirm_password: props.user.confirm_password,
      rolesID: props.user.rolesID,
      estado: props.user.estado,
      foto: props.user.foto
    }),
    validationSchema: Yup.object().shape({
      identificacion: Yup.string().required(
        ' Por favor introduzca una identificación.'
      ),
      nombre: Yup.string().required('Por favor introduzca un nombre.'),
      email: Yup.string()
        .email(' Por favor introduzca un email valido.')
        .required(' Por favor introduzca un email.'),
      telefono: Yup.string()
        .matches(
          /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
          ' Número no valido'
        )
        .length(10, ' Mínimo 10 digitos')
        .required(' Por favor introduzca un número.'),
      direccion: Yup.string(),
      f_d_nacimiento: Yup.date()
        .nullable()
        .notRequired(),
      conglomeradoID: Yup.string()
        .ensure()
        .required(' Por favor seleccione un conglomerado.'),
      empresaID: Yup.string()
        .ensure()
        .required(' Por favor seleccione una empresa.'),
      sedeID: Yup.string()
        .ensure()
        .required(' Por favor seleccione una sede'),
      dependenciaID: Yup.string()
        .ensure()
        .required(' Por favor seleccione una dependencia'),
      cargoID: Yup.string()
        .ensure()
        .required(' Por favor selccione un cargo'),
      username: Yup.string().required(' Por favor introduzca un username'),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/, // esta expresion regular valida la contraseña
          ' Contraseña no valida, asegúrese de que lleve al menos una letra en mayuscula, un digito, y un caracter especial.'
        )
        .required(' Por favor introduzca una contraseña.')
        .min(8, '  Mínimo 8 caracteres. ')
        .max(15, ' Máximo 15 caracteres.'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], ' Las contraseñas no coinciden.')
        .required(' Por favor confirme la contraseña.')
        .min(10, ' Mínimo 10 caracteres.')
        .max(200),
      rolesID: Yup.array().of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required()
        })
      ),
      estado: Yup.bool().test(
        'Activo',
        'Se requiere la activacion del usuario',
        value => value === true
      ),
      foto: Yup.mixed()
    }),
    handleSubmit: (values, { setSubmitting, resetForm }) => {
      const formData = new FormData();
      formData.append('photo', values.foto);
      formData.append(
        'user',
        new Blob(
          [
            JSON.stringify({
              identification: values.identificacion,
              name: values.nombre,
              email: values.email,
              phone: values.telefono,
              address: values.direccion,
              birthDate: values.f_d_nacimiento,
              username: values.username,
              password: values.password,
              dependenceId: values.dependenciaID,
              chargeId: values.cargoID,
              userRoleRequests: values.rolesID,
              enabled: values.estado,
              userNameAuthenticate: 'ccuartas'
            })
          ],
          {
            type: 'application/json'
          }
        )
      );
      setTimeout(() => {
        axios
          .post('http://192.168.10.180:7000/api/sgdea/user', formData, {
            headers: {
              Authorization: 'Basic ' + window.btoa('sgdea:123456')
            }
          })
          .then(response => {
            if (response.status === 201) {
              toast.success('Se creo el usuario con éxito.', {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: '60px'
                })
              });
            } else if (response.status === 500) {
              toast.error('El usuario ya existe.', {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: '60px'
                })
              });
            }
          })
          .catch(error => {
            toast.error(`${error}.`, {
              position: toast.POSITION.TOP_RIGHT,
              className: css({
                marginTop: '60px'
              })
            });
          });
        console.log(formData);
      }, 1000);
      setSubmitting(false);
      resetForm();
    }
  })(UserForm)
);
//---------------------------------------//

class MySelect extends React.Component {
  state = {
    dataRoles: [],
    t: this.props.t
  };

  componentDidMount() {
    this.getData();
  }

  handleChange = value => {
    this.props.onChange('rolesID', value);
  };

  handleBlur = () => {
    this.props.onBlur('rolesID', true);
  };

  getData = async () => {
    let url = 'http://192.168.10.180:7000/api/sgdea/role/active';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    });
    const data = await response.json();
    this.setState({
      dataRoles: data
    });
  };

  render() {
    //console.log(this.state.dataRoles);
    const aux = this.state.dataRoles.map((aux, id) => {
      return {
        label: aux.name,
        value: aux.id
      };
    });

    return (
      <div style={{ margin: '0' }}>
        <Select
          name={this.props.name}
          options={aux}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          placeholder={
            '-- ' +
            this.props.t('app_usuarios_form_registrar_roles_select') +
            ' --'
          }
        />
      </div>
    );
  }
}
// ------------------------------------------------------------------------------ //
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

  // handleChange = value => {
  //   this.props.onChange('conglomeradoID', value);
  // };

  // handleBlur = () => {
  //   this.props.onBlur('conglomeradoID', true);
  // };

  render() {
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          // onChange={e => setFieldValue("conglomerado", e)}
          value={this.props.value}
          // onBlur={this.handleBlur}
          className={this.props.className}
        >
          <option value={''}>
            -- {this.props.t('app_usuarios_form_registrar_conglomerado_select')}{' '}
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

        {/* <div style={{ color: "#D54B4B" }}>
          {error.conglomeradoID && touched.conglomeradoID ? (
            <i className="fa fa-exclamation-triangle" />
          ) : null}
          <ErrorMessage name="conglomeradoID" />
        </div> */}
      </div>
    );
  }
}

// --------------------------------------------------------------------------- //

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
        >
          <option value={''}>
            {' '}
            -- {this.props.t(
              'app_usuarios_form_registrar_empresa_select'
            )} --{' '}
          </option>
          {this.state.dataCompany.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>
                {aux.name}
              </option>
            );
          })}
        </select>
        {/* <select
          name={this.props.name}
          value={this.props.value}
          className="form-control form-control-sm"
          onChange={this.props.onChange}
        >
          {this.dataCompany.map((aux, id) => {
            return <option value={aux.id}>{aux.name}</option>;
          })}
        </select> */}
      </div>
    );
  }
}

// -------------------------------------------------------------------------------- //

class SelectHeadquarter extends React.Component {
  state = {
    dataHeadquarter: [],
    id: this.props.company,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.company !== state.id) {
      return {
        company: props.company
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.company !== prevProps.company) {
      // metodo del fetch()
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
        >
          <option value={''}>
            -- {this.props.t('app_usuarios_form_registrar_sede_select')} --{' '}
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

//--------------------------------------------------------------------------//
class SelectDependence extends React.Component {
  state = {
    dataDependence: [],
    id: this.props.headquarter,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.headquarter !== state.id) {
      return {
        headquarter: props.headquarter
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.headquarter !== prevProps.headquarter) {
      // metodo del fetch()
      this.getDataDependence();
    }
  }

  componentDidMount() {
    this.getDataDependence();
  }

  getDataDependence = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/dependence/headquarter/${this.props.headquarter}`,
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
          dataDependence: data
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
          onChange={this.props.onChange}
          className={this.props.className}
        >
          <option value={''}>
            -- {this.props.t('app_usuarios_form_registrar_dependencia_select')}{' '}
            --
          </option>
          {this.state.dataDependence.map((aux, id) => {
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
