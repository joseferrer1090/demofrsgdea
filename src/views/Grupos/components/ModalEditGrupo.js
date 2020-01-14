import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Card,
  CardBody,
  CustomInput,
  Alert
} from "reactstrap";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";
import {
  GROUPUSER,
  CONGLOMERATES_STATUS,
  COMPANY_BY_CONGLOMERATE,
  HEADQUARTER_BY_COMPANY,
  DEPENDENCIES_BY_HEADQUARTER,
  USERS_BY_DEPENDENCE
} from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalEditGrupos extends React.Component {
  state = {
    // items: dataGrupoUsuarios,
    modal: this.props.modalgitedit,
    dataOk: false,
    id: this.props.id,
    datagroup: {},
    datagroupUsers: [],
    username: "jferrer",
    alertError: false,
    alertError400: false,
    alertSuccess: false,
    auth: this.props.authorization
  };

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    this.getDataGroup(id);
  };

  //  handleSubmit = (values, { props = this.props, setSubmitting }) => {
  //    alert(JSON.stringify(values, null, 2));
  //     setSubmitting(false);
  //     return;
  //  };

  getDataGroup = id => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${GROUPUSER}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          datagroup: data,
          datagroupUsers: data.users
        });
        console.log(data);
      })
      .catch(err => console.log("Error", err));
  };

  // handleChangeSelectedOptionUsers = selectedOptionUserAsigandos => {
  //   this.setState({ selectedOptionUserAsigandos });
  //   console.log(this.state.selectedOptionUserAsigandos);
  // };

  render() {
    // const {dataOk, items, selectedOptionUserAsigandos} = this.state;
    // const buscarOpciones = items.map(item => (
    //   <option
    //     key={item.id}
    //     onClick={() => {
    //     const string = JSON.stringify({
    //       value: `${item.id}`,
    //       label: `${item.nombre}`
    //     });
    //     filtraritems.push(JSON.parse(string));
    //     console.log(filtraritems);
    //   }}
    // >
    //   {item.nombre}
    // </option>
    //     ));
    // console.log(filtraritems);
    const tipoEstado = data => {
      let tipo;
      if (data === true || data === 1) {
        return (tipo = 1);
      } else if (data === false || data === 0) {
        return (tipo = 0);
      }
      return 0;
    };
    const dataPreview = {
      codigo: this.state.datagroup.code,
      nombre: this.state.datagroup.name,
      descripcion: this.state.datagroup.description,
      usuarios: this.state.datagroupUsers.map((aux, id) => {
        return { label: aux.name, value: aux.id };
      }),
      estado: this.state.datagroup.status
    };

    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            Editar Grupo de usuario {this.state.datagroup.name}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={{
              codigo: this.state.datagroup.code,
              nombre: this.state.datagroup.name,
              descripcion: dataPreview.descripcion,
              usuarios: this.state.datagroupUsers.map((aux, id) => {
                return { label: aux.name, value: aux.id };
              }),
              estado: this.state.datagroup.status
            }}
            onSubmit={(values, { setSubmitting, props }) => {
              setTimeout(() => {
                // alert(JSON.stringify(values, null, 2));
                fetch(`${GROUPUSER}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + this.props.authorization
                  },
                  body: JSON.stringify({
                    id: this.state.id,
                    code: values.codigo,
                    name: values.nombre,
                    description: values.descripcion,
                    userName: "jferrer",
                    users: values.usuarios,
                    status: values.estado
                  })
                })
                  .then(response => {
                    console.log(response.status);
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
                          this.props.updateTable()
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
                  .catch(err => console.log("Error", err));
              }, 1000);
              setSubmitting(false);
            }}
            validationSchema={Yup.object().shape({
              codigo: Yup.string()
                .required("Por favor introduzca un código")
                .min(6, "Mínimo 6 caracteres .")
                .max(6, "Máximo 6 caracteres"),
              nombre: Yup.string()
                .required("Por favor introduzca un nombre")
                .max(100),
              descripcion: Yup.string()
                .nullable()
                .max(250, "Máximo 250 para la descripción del grupo"),
              conglomerado: Yup.string()
                .ensure()
                .required("Por favor seleccione un conglomerado para filtrar"),
              empresa: Yup.string()
                .ensure()
                .required("Por favor selecciones uan empresa para filtrar"),
              sede: Yup.string()
                .ensure()
                .required("Por favor Seleccione una sede para filtrar "),
              dependencia: Yup.string()
                .ensure()
                .required("Por favor seleccione la dependencia para filtrar"),
              usuarios: Yup.array()
                .of(
                  Yup.object().shape({
                    label: Yup.string().required(),
                    value: Yup.string().required()
                  })
                )
                .required("Por favor asignar usuarios al grupo"),
              estado: Yup.bool().test("Activado", "", value => value === true)
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
              //console.log("Este lado", this.props.authorization);
              return (
                <Fragment>
                  <ModalBody>
                    <Alert
                      color="danger"
                      isOpen={this.state.alertError}
                      toggle={this.onDismiss}
                    >
                      Error al actualizar el gruoo de usuarios.
                    </Alert>
                    <Alert color="danger" isOpen={this.state.alertError400}>
                      Error, grupo de usuarios ya asignados.
                    </Alert>
                    <Alert color="success" isOpen={this.state.alertSuccess}>
                      Se actualizo el grupo de usuarios con éxito.
                    </Alert>
                    <form className="form">
                      <div className="container">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Código <span className="text-danger">
                                  *
                                </span>{" "}
                              </label>
                              <input
                                type="text"
                                name="codigo"
                                value={values.codigo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-control form-control-sm"
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.codigo && touched.codigo ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="codigo" />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Nombre <span className="text-danger">
                                  *
                                </span>{" "}
                              </label>
                              <input
                                type="text"
                                name="nombre"
                                onChange={handleChange}
                                value={values.nombre}
                                className="form-control form-control-sm"
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.nombre && touched.nombre ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="nombre" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label> Descripción </label>
                              <textarea
                                name="descripcion"
                                value={values.descripcion}
                                className="form-control form-control-sm"
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.descripcion && touched.descripcion ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="descripcion" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <Card>
                              <CardBody>
                                <h5 className=""> Búsqueda de usuarios </h5>
                                <hr />
                                <br />
                                <div className="row">
                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        Conglomerado{" "}
                                        <span className="text-danger">
                                          *
                                        </span>{" "}
                                      </label>
                                      <SelectConglomerado
                                        token={this.props.authorization}
                                        name={"conglomerado"}
                                        onChange={e =>
                                          setFieldValue(
                                            "conglomerado",
                                            e.target.value
                                          )
                                        }
                                        onBlur={() =>
                                          setFieldTouched("conglomerado", true)
                                        }
                                        value={values.conglomerado}
                                        className={`form-control form-control-sm ${errors.conglomerado &&
                                          touched.conglomerado &&
                                          "is-invalid"}`}
                                      />
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.conglomerado &&
                                        touched.conglomerado ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="conglomerado" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        Empresa{" "}
                                        <span className="text-danger">
                                          *
                                        </span>{" "}
                                      </label>
                                      <SelectCompany
                                        token={this.props.authorization}
                                        usuario_conglomerate={
                                          props.values.conglomerado
                                        }
                                        name="empresa"
                                        value={values.empresa}
                                        onChange={e =>
                                          setFieldValue(
                                            "empresa",
                                            e.target.value
                                          )
                                        }
                                        onBlur={() =>
                                          setFieldTouched("empresa", true)
                                        }
                                        className={`form-control form-control-sm ${errors.empresa &&
                                          touched.empresa &&
                                          "is-invalid"}`}
                                      ></SelectCompany>

                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.empresa && touched.empresa ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="empresa" />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        Sede{" "}
                                        <span className="text-danger">
                                          *
                                        </span>{" "}
                                      </label>
                                      <SelectHeadquarter
                                        token={this.props.authorization}
                                        usuario_company={props.values.empresa}
                                        name={"sede"}
                                        onChange={e =>
                                          setFieldValue("sede", e.target.value)
                                        }
                                        onBlur={() =>
                                          setFieldTouched("sede", true)
                                        }
                                        value={values.sede}
                                        className={`form-control form-control-sm ${errors.sede &&
                                          touched.sede &&
                                          "is-invalid"}`}
                                      ></SelectHeadquarter>

                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.sede && touched.sede ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="sede" />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        Dependencia{" "}
                                        <span className="text-danger">
                                          *
                                        </span>{" "}
                                      </label>
                                      <SelectDependence
                                        token={this.props.authorization}
                                        usuario_headquarter={props.values.sede}
                                        name={"dependencia"}
                                        value={values.dependencia}
                                        onChange={e =>
                                          setFieldValue(
                                            "dependencia",
                                            e.target.value
                                          )
                                        }
                                        onBlur={() =>
                                          setFieldTouched("dependencia", true)
                                        }
                                        className={`form-control form-control-sm ${errors.dependencia &&
                                          touched.dependencia &&
                                          "is-invalid"}`}
                                      ></SelectDependence>

                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.dependencia &&
                                        touched.dependencia ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="dependencia" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardBody>
                            </Card>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label>
                                {" "}
                                Seleccione usuario(s) asignados{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <UsuariosAsignados
                                token={this.props.authorization}
                                dependencia={props.values.dependencia}
                                name="usuarios"
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                value={values.usuarios}
                              />

                              {touched ? (
                                <div style={{ color: "red" }}>
                                  {" "}
                                  <div style={{ color: "#D54B4B" }}>
                                    {errors.usuarios && touched.usuarios ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name={"usuarios"} />
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label>
                                {" "}
                                Estado <span className="text-danger">
                                  *
                                </span>{" "}
                              </label>
                              <div className="text-justify">
                                <Field
                                  name="estado"
                                  render={({ field, form }) => {
                                    return (
                                      <CustomInput
                                        type="checkbox"
                                        id="CheckBoxEditGrupos"
                                        label="Si esta opción se encuentra activada, Representa
                            que el grupo es visible en el sistema y se
                            podrán realizar operaciones entre cada uno de
                            los módulos correspondientes de la aplicación.
                            En caso contrario el grupo no se elimina del
                            sistema solo quedará inactiva e invisibles para
                            cada uno de los módulos correspondiente del
                            sistema."
                                        {...field}
                                        checked={field.value}
                                        className={
                                          errors.estado &&
                                          touched.estado &&
                                          "invalid-feedback"
                                        }
                                      />
                                    );
                                  }}
                                />
                                <ErrorMessage name="estado" />
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
                      className="btn btn-outline-success btn-sm"
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      {" "}
                      <i className="fa fa-pencil" /> Actualizar grupo{" "}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary   btn-sm"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      {" "}
                      <i className="fa fa-times" /> Cerrar{" "}
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

ModalEditGrupos.propTypes = {
  modaledit: PropTypes.bool.isRequired,
  authorization: PropTypes.string.isRequired
};

export default ModalEditGrupos;

//--------------------------------------------------------------------------------------------//

class SelectConglomerado extends React.Component {
  state = {
    dataConglomerate: [],
    auth: this.props.token
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch(`${CONGLOMERATES_STATUS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token
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
    this.props.onChange("usuario_conglomerate", value);
  };

  handleBlur = () => {
    this.props.onBlur("usuario_conglomerate", true);
  };

  render() {
    // const selectOptionsConglomerate = this.state.dataConglomerate.map(
    //   (aux, id) => {
    //     return <option value={aux.id}>{aux.name}</option>;
    //   }
    // );
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          value={this.props.value}
          className={this.props.className}
        >
          <option value={""}>-- Seleccione --</option>
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

// --------------------------------------------------------------------------------------------- //
class SelectCompany extends React.Component {
  state = {
    dataCompany: [],
    id: this.props.usuario_conglomerate,
    auth: this.props.token
  };

  static getDerivedStateFromProps(props, state) {
    if (props.usuario_conglomerate !== state.id) {
      return {
        id: props.usuario_conglomerate
      };
    }
    if (props.token !== state.auth) {
      return {
        auth: props.token
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.usuario_conglomerate !== prevProps.usuario_conglomerate) {
      this.getDataCompany();
    }
    if (this.props.token !== prevProps.token) {
      this.setState({
        auth: this.props.token
      });
    }
  }

  //edf39040-6f53-4f4e-b348-ef279819051a => no borrar

  componentDidMount() {
    this.getDataCompany();
  }

  getDataCompany = () => {
    fetch(`${COMPANY_BY_CONGLOMERATE}${this.state.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCompany: data
        });
      })
      .catch(err => console.log("Error", err));
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
          <option value={""}>-- Seleccione --</option>
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
// ---------------------------------------------------------------------------------------------------- //

class SelectHeadquarter extends React.Component {
  state = {
    dataHeadquarter: [],
    id: this.props.usuario_company,
    auth: this.props.token
  };

  static getDerivedStateFromProps(props, state) {
    if (props.usuario_company !== state.id) {
      return {
        id: props.usuario_company
      };
    }
    if (props.token !== state.auth) {
      return {
        auth: props.token
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.usuario_company !== prevProps.usuario_company) {
      // metodo del fetch()
      this.getDataHeadquarter();
    }
    if (this.props.token !== prevProps.token) {
      this.setState({
        auth: this.props.token
      });
    }
  }

  componentDidMount() {
    this.getDataHeadquarter();
  }

  getDataHeadquarter = () => {
    fetch(`${HEADQUARTER_BY_COMPANY}${this.props.usuario_company}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataHeadquarter: data
        });
      })
      .catch(err => console.log("Error", err));
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
          <option value={""}>-- Seleccione --</option>
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

// -------------------------------------------------------------------------------------------------------------- //

class SelectDependence extends React.Component {
  state = {
    dataDependence: [],
    id: this.props.usuario_headquarter,
    auth: this.props.token
  };

  static getDerivedStateFromProps(props, state) {
    if (props.usuario_headquarter !== state.id) {
      return {
        id: props.usuario_headquarter
      };
    }
    if (props.token !== state.auth) {
      return {
        auth: props
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.usuario_headquarter !== prevProps.usuario_headquarter) {
      // metodo del fetch()
      this.getDataDependence();
    }
    if (this.props.token !== prevProps.token) {
      this.setState({
        auth: this.props.token
      });
    }
  }

  componentDidMount() {
    this.getDataDependence();
  }

  getDataDependence = () => {
    fetch(`${DEPENDENCIES_BY_HEADQUARTER}${this.props.usuario_headquarter}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataDependence: data
        });
      })
      .catch(err => console.log("Error", err));
  };

  render() {
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          className={this.props.className}
          onBlur={this.props.onBlur}
        >
          <option value={""}>-- Seleccione --</option>
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
// -------------------------------------------------------------------------------------- //

class UsuariosAsignados extends React.Component {
  state = {
    dataUsers: [],
    id: this.props.dependencia,
    auth: this.props.token
  };

  static getDerivedStateFromProps(props, state) {
    if (props.dependencia !== state.id) {
      return {
        id: props.dependencia
      };
    }
    if (props.token !== state.token) {
      return {
        auth: props.token
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.dependencia !== prevProps.dependencia) {
      this.getDataUserDependenceList();
    }
    if (this.props.token !== prevProps.token) {
      this.setState({
        auth: this.props.token
      });
    }
  }

  getDataUserDependenceList = () => {
    fetch(`${USERS_BY_DEPENDENCE}${this.props.dependencia}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataUsers: data
        });
        //console.log(data);
      })
      .catch(err => console.log("Error", err));
  };

  componentDidMount() {
    this.getDataUserDependenceList();
  }

  handleChange = value => {
    this.props.onChange("usuarios", value);
  };

  handleBlur = () => {
    this.props.onBlur("usuarios", true);
  };

  render() {
    return (
      <div>
        <Select
          name={this.props.name}
          options={this.state.dataUsers.map((aux, id) => {
            return { label: aux.name, value: aux.id };
          })}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          placeholder={"Asignar usuarios"}
        />
      </div>
    );
  }
}
