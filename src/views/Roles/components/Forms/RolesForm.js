import React, { useState, useEffect } from 'react';
import { Formik, withFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CustomInput,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import classnames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { withTranslation } from 'react-i18next';

const RolesForm = props => {
  const [activeTab, toggleTab] = useState('1');
  const toggle = tab => {
    if (activeTab !== tab) {
      toggleTab(tab);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldTouched,
    setFieldValue,
    t
  } = props;

  // const [favourites, setfavourites] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.get(
  //       `http://192.168.10.180/7000/api/sgdea/permission/page/entity/${props.values.entidades}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Basic " + window.btoa("sgdea:123456")
  //         }
  //       }
  //     );
  //     setfavourites(result.data);
  //   };
  //   fetchData();
  // }, [favourites]);

  // const addFavourite = id => {
  //   const newSet = favourites.concat([id]);
  //   setfavourites([...favourites.concat(id)]);
  //   console.log(newSet);
  // };

  // const deleteFavourite = id => {
  //   const newList = [...favourites.slice(0, id), ...favourites.slice(id + 1)];
  //   setfavourites([...favourites.slice(0, id), ...favourites.slice(id + 1)]);
  //   console.log(newList);
  // };

  // console.log(props.values.entidades);
  // console.log(favourites);

  return (
    <div>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <form className="form" noValidate>
            <Card>
              <CardHeader>{t('app_roles_tab_title')}</CardHeader>
              <CardBody>
                <div className="row">
                  <Col sm="6">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_roles_form_registrar_codigo')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <input
                        name={'codigo'}
                        onChange={e => {
                          setFieldValue('codigo', e.target.value.toUpperCase());
                        }}
                        onBlur={handleBlur}
                        value={values.codigo}
                        type="text"
                        className={`form-control form-control-sm ${errors.codigo &&
                          touched.codigo &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.codigo && touched.codigo ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name={'codigo'} />
                      </div>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_roles_form_registrar_nombre')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <input
                        name={'nombre'}
                        onChange={e => {
                          setFieldValue('nombre', e.target.value.toUpperCase());
                        }}
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
                        <ErrorMessage name={'nombre'} />
                      </div>
                    </div>
                  </Col>
                  <Col sm="12">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_roles_form_registrar_descripción')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <textarea
                        name={'descripcion'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.descripcion}
                        className={`form-control form-control-sm ${errors.descripcion &&
                          touched.descripcion &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.descripcion && touched.descripcion ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name={'descripcion'} />
                      </div>
                    </div>
                  </Col>
                </div>
                <Row>
                  <Col sm="12">
                    <Card body>
                      <CardTitle>
                        {' '}
                        <h4>
                          {' '}
                          {t('app_roles_form_registrar_title')} <hr />{' '}
                        </h4>
                      </CardTitle>
                      <Nav tabs>
                        {/* <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "1"
                            })}
                            onClick={() => {
                              toggle("1");
                            }}
                          >
                            <i className="fa fa-search" /> Busqueda simple
                          </NavLink>
                        </NavItem> */}
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === '1'
                            })}
                            onClick={() => {
                              toggle('1');
                            }}
                          >
                            <i className="fa fa-search" />{' '}
                            {t('app_roles_form_registrar_title_tab')}
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeTab}>
                        {/* <TabPane tabId={"1"}>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  Entidad <span className="text-danger">*</span>{" "}
                                </label>
                                <Autocomplete
                                  name={"entidades_search"}
                                  value={values.entidades_search}
                                />
                              </div>
                            </div>
                          </div>
                        </TabPane> */}
                        <TabPane tabId={'1'}>
                          <div className="row">
                            <Col sm="6">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  {t('app_roles_form_registrar_modulo')}{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <MySelectModulos
                                  t={props.t}
                                  name={'modulos'}
                                  value={values.modulos}
                                  onChange={e => {
                                    setFieldValue('modulos', e.target.value);
                                  }}
                                  onBlur={() => {
                                    setFieldTouched('modulos', true);
                                  }}
                                  className={`form-control form-control-sm ${errors.modulos &&
                                    touched.modulos &&
                                    'is-invalid'}`}
                                />
                                {/* <MySelectModulos
                              name={"modulos"}
                              value={values.modulos}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            /> */}
                                {touched ? (
                                  <div style={{ color: 'red' }}>
                                    {' '}
                                    <div style={{ color: '#D54B4B' }}>
                                      {errors.modulos && touched.modulos ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name={'modulos'} />
                                    </div>
                                  </div>
                                ) : null}
                                {/* <select className="form-control form-control-sm">
                              {" "}
                              <option> Seleccione... </option>{" "}
                            </select> */}
                              </div>
                            </Col>
                            <Col sm="6">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  {t('app_roles_form_registrar_entidades')}{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <MySelectEntidades
                                  t={props.t}
                                  modulo={props.values.modulos}
                                  name={'entidades'}
                                  value={values.entidades}
                                  onChange={e => {
                                    setFieldValue('entidades', e.target.value);
                                  }}
                                  onBlur={() => {
                                    setFieldTouched('entidades', true);
                                  }}
                                  className={`form-control form-control-sm ${errors.entidades &&
                                    touched.entidades &&
                                    'is-invalid'}`}
                                />
                                {/* <MySelectEntidades
                              name={"entidades"}
                              value={values.entidades}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            /> */}
                                {touched ? (
                                  <div style={{ color: 'red' }}>
                                    {' '}
                                    <div style={{ color: '#D54B4B' }}>
                                      {errors.entidades && touched.entidades ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name={'entidades'} />
                                    </div>
                                  </div>
                                ) : null}
                                {/* <select
                              className="form-control form-control-sm
                                "
                            >
                              {" "}
                              <option> Seleccione... </option>{" "}
                            </select> */}
                              </div>
                            </Col>
                          </div>
                        </TabPane>
                      </TabContent>
                      <br />
                      <Row>
                        <Col sm="12">
                          <div className="form-group">
                            <label>
                              {t('app_roles_form_registrar_asignar_permisos')}{' '}
                              <span className="text-danger">*</span>{' '}
                            </label>
                            <Assignedpermissions
                              t={props.t}
                              entidad={props.values.entidades}
                              name={'permisos'}
                              value={values.permisos}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                              error={errors.permisos}
                              touched={touched.permisos}
                            />
                            {touched ? (
                              <div style={{ color: 'red' }}>
                                {' '}
                                <div style={{ color: '#D54B4B' }}>
                                  {errors.permisos && touched.permisos ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name={'permisos'} />
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </Col>
                        {/* <Col sm="6">
                          <div className="form-group">
                            <label>
                              {" "}
                              Modulo <span className="text-danger">*</span>{" "}
                            </label>
                            <select
                              name="modulos"
                              className="form-control form-control-sm"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.modulos}
                            >
                              <option> -- Seleccione -- </option>
                            </select>
                            <MySelectModulos
                              name={"modulos"}
                              value={values.modulos}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                            {touched ? (
                              <div style={{ color: "red" }}>
                                {" "}
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.modulos && touched.modulos ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name={"modulos"} />
                                </div>
                              </div>
                            ) : null}
                            <select className="form-control form-control-sm">
                              {" "}
                              <option> Seleccione... </option>{" "}
                            </select>
                          </div>
                        </Col> */}
                        {/* <Col sm="6">
                          <div className="form-group">
                            <label>
                              {" "}
                              Entidades <span className="text-danger">
                                *
                              </span>{" "}
                            </label>
                            <select
                              name="entidades"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.entidades}
                              className="form-control form-control-sm"
                            >
                              <option>-- Seleccione --</option>
                            </select>
                            <MySelectEntidades
                              name={"entidades"}
                              value={values.entidades}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                            {touched ? (
                              <div style={{ color: "red" }}>
                                {" "}
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.entidades && touched.entidades ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name={"entidades"} />
                                </div>
                              </div>
                            ) : null}
                            <select
                              className="form-control form-control-sm
                                "
                            >
                              {" "}
                              <option> Seleccione... </option>{" "}
                            </select>
                          </div>
                        </Col> */}
                        {/*  Aqui va la funcionalidad    */}

                        <div className="row">
                          <div className="col-md-6">
                            {/* <label className="col-md-12">
                              <dt>Permisos disponibles:</dt>
                            </label> */}
                            <div className="form-group">
                              {/* <ListPermissions
                                data={favourites}
                                addFavourite={addFavourite}
                                IDentidad={props.values.entidades}
                              /> */}
                              {/* <select
                                multiple
                                className="form-control"
                                style={{
                                  width: "310px",
                                  marginLeft: "14px"
                                }}
                              >
                                <option> Seleccione </option>
                              </select> */}
                              {/* <ListaRoles
                                data={this.props.data}
                                favouritesroles={this.state.favourites}
                                addFavourite={this.addFavourite.bind(this)}
                              /> */}
                            </div>
                          </div>
                          <div className="col-md-6">
                            {/* <label>
                              <dt>Permisos asignados:</dt>
                            </label> */}
                            {/* <ShortList
                              favourites={favourites}
                              deleteFavourite={deleteFavourite}
                            /> */}
                            {/* <select
                              multiple
                              className="form-control"
                              disabled
                              style={{
                                width: "310px",
                                marginRight: "10px"
                              }}
                            >
                              <option> las nuevas opciones</option>
                            </select> */}
                            {/* <NuevaListaRoles
                              data={this.props.data}
                              favourites={this.state.favourites}
                              deleteFavourite={this.deleteFavourite.bind(this)}
                            /> */}
                          </div>
                        </div>
                        {/*  Fin   */}
                      </Row>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_roles_form_registrar_estado')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <div className="">
                        <CustomInput
                          name={'estado'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.estado}
                          type="checkbox"
                          id="ExampleCheckBoxInput"
                          label={t(
                            'app_roles_form_registrar_estado_descripcion'
                          )}
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
                              Si esta opción se encuentra activada, representa
                              que el rol es visible en el sistema y se podrán
                              realizar operaciones entre cada uno de los módulos
                              correspondientes de la aplicación. En caso
                              contrario el rol no se elimina del sistema solo
                              quedará inactivo e invisibles para cada uno de los
                              módulos correspondiente del sistema.
                            </p> */}
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <div className="pull-right">
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
                        {t('app_roles_form_registrar_boton_guardar')}
                      </div>
                    )}
                  </button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withTranslation('translations')(
  withFormik({
    mapPropsToValues: props => ({
      codigo: props.roles.codigo,
      nombre: props.roles.nombre,
      descripcion: props.roles.descripcion,
      modulos: props.roles.modulos,
      entidades: props.roles.entidades,
      entidades_search: props.roles.entidades_search,
      permisos: props.roles.permisos,
      estado: props.roles.estado
    }),
    validationSchema: Yup.object().shape({
      codigo: Yup.string()
        .required(' Por favor introduzca un código.')
        .matches(/^[0-9a-zA-Z]+$/, ' Codigo no es alfanumerico')
        .min(2, ' minimo 2 caracteres para el codigo')
        .max(15, ' maximo 15 caracteres para el codigo'),
      nombre: Yup.string().required(' Por favor introduzca un nombre.'),
      descripcion: Yup.string().required(
        ' Por favor introduzca una descripción.'
      ),
      estado: Yup.bool()
        .test('Activo', ' Necesario activar el rol.', value => value === true)
        .required(' Necesario activar el rol.'),
      modulos: Yup.string()
        .ensure()
        .required('Se requiere el modulo para filtrar'),
      entidades: Yup.string()
        .ensure()
        .required('Se requiere la entidad para filtrar'),
      permisos: Yup.array()
        .of(
          Yup.object().shape({
            label: Yup.string().required(),
            value: Yup.string().required()
          })
        )
        .required('Es necesario asignar permisos')
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
        // alert(JSON.stringify(values, null, 2));
        fetch(`http://192.168.10.180:7000/api/sgdea/role`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + window.btoa('sgdea:123456')
          },
          body: JSON.stringify({
            code: values.codigo,
            name: values.nombre,
            descripcion: values.descripcion,
            permissions: values.permisos,
            status: tipoEstado(values.estado),
            userName: 'jferrer'
          })
        }).then(response => {
          response
            .json()
            .then(data => {
              if (response.status === 201) {
                toast.success('Se creo el rol con exito.', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: '60px'
                  })
                });
              } else if (response.status === 500) {
                toast.error('El rol ya existe.', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: '60px'
                  })
                });
              }
            })
            .catch(err => {
              toast.error(`Error ${err}.`, {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: '60px'
                })
              });
            });
        });
        setSubmitting(false);
        resetForm();
      }, 1000);
    }
  })(RolesForm)
);

class MySelectModulos extends React.Component {
  state = {
    dataModule: []
  };

  componentDidMount() {
    this.getDataModule();
  }

  getDataModule = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/module/active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataModule: data
        });
      })
      .catch(err => console.log('', err));
  };

  handleChange = value => {
    this.props.onChange('modulos', value);
  };

  handleBlur = () => {
    this.props.onBlur('modulos', true);
  };

  render() {
    return (
      <div>
        <select
          className="form-control form-control-sm"
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          name={this.props.name}
          value={this.props.value}
        >
          <option value={0}> -- seleccione -- </option>
          {this.state.dataModule.map((aux, id) => {
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
// ---------------------------------------------------------------------------------------//
class MySelectEntidades extends React.Component {
  state = {
    dataEntidades: [],
    id: this.props.modulo
  };

  static getDerivedStateFromProps(props, state) {
    if (props.modulo !== state.id) {
      return {
        id: props.modulo
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.modulo !== prevProps.modulo) {
      this.getDataEntity();
    }
  }

  componentDidMount() {
    this.getDataEntity();
  }

  getDataEntity = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/entity/module/${this.state.id}/active`,
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
          dataEntidades: data
        });
        console.log(data);
      })
      .catch(err => console.log('Error', err));
  };

  handleChange = value => {
    this.props.onChange('entidades', value);
  };

  handleBlur = () => {
    this.props.onBlur('entidades', true);
  };

  render() {
    console.log(this.state.id);
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          className={this.props.className}
          value={this.props.value}
        >
          <option value={''}>-- seleccione --</option>
          {this.state.dataEntidades.map((aux, id) => {
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

//------------------------------------------------------------------------------------------------//

// class Autocomplete extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       dataSearch: [],
//       query: "",
//       idEntidad: ""
//     };
//   }

//   onTextChange = e => {
//     this.setState({ query: e.target.value }, () => {
//       fetch(
//         `http://192.168.10.180:7000/api/sgdea/entity/search/name?name=${this.state.query}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Basic " + window.btoa("sgdea:123456")
//           }
//         }
//       )
//         .then(response => response.json())
//         .then(data => {
//           this.setState({
//             dataSearch: data
//           });
//         })
//         .catch(err => console.log("", err));
//     });
//   };

//   searchInput = term => {
//     return function(x) {
//       return x.name.includes(term);
//     };
//   };

//   render() {
//     //console.log(this.state.dataSearch);
//     const data = this.state.dataSearch;
//     const term = this.state.query;
//     //console.log(data);

//     return (
//       <div>
//         <input
//           type="text"
//           name="query"
//           value={this.state.query}
//           onChange={this.onTextChange}
//           placeholder={"Entiad a buscar"}
//           className="form-control form-control-sm"
//         />
//         <input
//           type="hidden"
//           name={this.props.name}
//           value={this.state.idEntidad}
//         />
//         <ListGroup>
//           {term
//             ? data.filter(this.searchInput(term)).map((aux, id) => {
//                 return (
//                   <a
//                     href="#"
//                     onClick={e => {
//                       e.preventDefault();
//                       this.setState({ idEntidad: aux.id }, () => {
//                         console.log(this.state.idEntidad);
//                       });
//                     }}
//                   >
//                     {" "}
//                     <ListGroupItem key={id}>{aux.name}</ListGroupItem>
//                   </a>
//                 );
//               })
//             : null}
//         </ListGroup>
//       </div>
//     );
//   }
// }

//------------------------------------------------------------------------------------------------//

// class ListPermissions extends React.Component {
//   state = {
//     datalist: [],
//     id: this.props.IDentidad
//   };

//   static getDerivedStateFromProps(props, state) {
//     if (props.IDentidad !== state.id) {
//       return {
//         id: props.IDentidad
//       };
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.props.IDentidad !== prevProps.IDentidad) {
//       // getById
//       this.getPermissionById();
//     }
//   }

//   componentDidMount() {
//     // getById
//     this.getPermissionById();
//   }

//   getPermissionById = () => {
//     fetch(
//       `http://192.168.10.180:7000/api/sgdea/permission/page/entity/${this.props.IDentidad}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Basic " + window.btoa("sgdea:123456")
//         }
//       }
//     )
//       .then(response => response.json())
//       .then(data => {
//         this.setState({
//           datalist: data
//         });
//       })
//       .catch(err => console.log("Error", err));
//   };

//   render() {
//     console.log(this.state.datalist);
//     // console.log(this.props.IDentidad);

//     return (
//       <div>
//         {this.state.datalist.map((aux, id) => {
//           return (
//             <NamePermission
//               id={aux.id}
//               key={id}
//               info={aux}
//               handleFavourite={id => this.props.addFavourite(id)}
//             />
//           );
//         })}
//       </div>
//     );
//   }
// }

// {
//   this.state.datalist.map((aux, i) => {
//     return (
//       <NamePermission
//         id={aux.id}
//         key={i}
//         info={aux}
//         handleFavourite={id => this.props.addFavourite(id)}
//       />
//     );
//   });
// }

// --------------------------------------------------------------------------------------------------- //

class Assignedpermissions extends React.Component {
  state = {
    dataPermission: [],
    id: this.props.entidad
  };

  static getDerivedStateFromProps(props, state) {
    if (props.entidad !== state.id) {
      return {
        id: props.entidad
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.entidad !== prevProps.entidad) {
      this.getPermissionById();
    }
  }

  componentDidMount() {
    this.getPermissionById();
  }

  getPermissionById = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/permission/page/entity/${this.state.id}`,
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
          dataPermission: data
        });
      })
      .catch(err => console.log('Error', err));
  };

  handleChange = value => {
    this.props.onChange('permisos', value);
  };

  handleBlur = () => {
    this.props.onBlur('permisos', true);
  };

  render() {
    const aux = this.state.dataPermission.map((aux, id) => {
      return {
        id: id,
        label: aux.name,
        value: aux.id
      };
    });

    return (
      <div>
        <Select
          name={this.props.name}
          options={this.state.dataPermission.map((aux, id) => {
            return { label: aux.name, value: aux.id };
          })}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          placeholder={'Asignar permisos'}
        />
      </div>
    );
  }
}
