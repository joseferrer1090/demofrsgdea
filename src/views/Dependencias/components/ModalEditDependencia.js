import React, { Fragment } from "react";
import PropTypes from "prop-types";
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
} from "reactstrap";
import IMGDEPENDENCIA from "./../../../assets/img/settings-work-tool.svg";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

class ModalEditDependencia extends React.Component {
  state = {
    modal: this.props.modaledit,
    id: this.props.id,
    userLogged: "jferrer",
    dataDependence: {},
    dataCharge: {},
    dataDependenceConglomerate: {},
    dataDependenceCompany: {},
    dataDependenceSede: {},
    dataResult: {},
    dataConglomerate: [],
    dataCompany: [],
    dataChargeList: [],
    dataHeadquarterList: [],
    alertError: false,
    alertSuccess: false
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
      `http://192.168.10.180:7000/api/sgdea/dependence/${id}/${
        this.state.userLogged
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + window.btoa("sgdea:123456")
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
      .catch(Error => console.log(" ", Error));
  };

  getDataConglomerate = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/conglomerate/`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + window.btoa("sgdea:123456"),
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataConglomerate: data
        });
      })
      .catch(Error => {
        console.log("", Error);
      });
  };

  getDataCompany = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/company`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + window.btoa("sgdea:123456"),
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCompany: data
        });
      })
      .catch(Error => console.log("Error", Error));
  };

  getDataCharge = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/charge`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + window.btoa("sgdea:123456"),
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataChargeList: data
        });
      })
      .catch(Error => console.log("Error", Error));
  };

  getDataHeadquarterList = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/headquarter`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + window.btoa("sgdea:123456"),
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataHeadquarterList: data
        });
      })
      .catch(Error => console.log("", Error));
  };

  render() {
    console.log(this.state.id);
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

    console.log(result);
    console.log(this.state.dataConglomerate);
    console.log(this.state.dataChargeList);
    console.log(this.state.dataHeadquarterList);

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
            Actualizar Dependencia {this.state.dataDependence.name}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={result}
            onSubmit={(values, { setSubmitting }) => {
              const tipoEstado = data => {
                let tipo = null;
                if (data === true) {
                  return (tipo = 1);
                } else if (data === false) {
                  return (tipo = 0);
                }
                return tipo;
              };
              setTimeout(() => {
                fetch(`http://192.168.10.180:7000/api/sgdea/dependence/`, {
                  method: "PUT",
                  headers: {
                    Authorization: "Basic " + window.btoa("sgdea:123456"),
                    "Content-Type": "application/json"
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
                        this.setState({
                          alertSuccess: false,
                          modal: false
                        });
                      }, 2000);
                    } else if (response.status === 500) {
                      this.setState({
                        alertError: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError: false,
                          modal: !this.state.modal
                        });
                      }, 2000);
                    }
                  })
                  .catch(Error => console.log("Error", Error));
              }, 3000);
            }}
            validationSchema={Yup.object().shape({
              conglomerate: Yup.string()
                .ensure()
                .required(" Por favor seleccione un conglomerado."),
              company: Yup.string()
                .ensure()
                .required(" Por favor seleccione una empresa."),
              headquarter: Yup.string()
                .ensure()
                .required(" Por favor seleccione una sede."),
              code: Yup.string().required(" Por favor introduzca un código."),
              name: Yup.string().required(" Por favor introduzca un código."),
              description: Yup.string().max(250, "Máximo 250 caracteres."),
              charge: Yup.string()
                .ensure()
                .required(" Por favor seleccione el cargo."),
              status: Yup.bool().test("Activado", "", value => value === true)
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
                      Se actualizo la dependencia
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
                              style={{ borderBottom: "1px solid black" }}
                            >
                              {" "}
                              Datos{" "}
                            </h5>{" "}
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Conglomerado{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <select
                                  name="conglomerate"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.conglomerate}
                                  className="form-control form-control-sm"
                                >
                                  <option value="">Seleccione...</option>
                                  {conglomerateList}
                                </select>
                                <div style={{ color: "#D54B4B" }}>
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
                                  {" "}
                                  Empresa <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <select
                                  name="company"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.company}
                                  className="form-control form-control-sm"
                                >
                                  <option value="">Seleccione...</option>
                                  {companyList}
                                </select>
                                <div style={{ color: "#D54B4B" }}>
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
                                  {" "}
                                  Sede <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <select
                                  name="headquarter"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.headquarter}
                                  className="form-control form-control-sm"
                                >
                                  <option value={" "}>Seleccione...</option>
                                  {headquarterList}
                                </select>
                                <div style={{ color: "#D54B4B" }}>
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
                                  {" "}
                                  Código <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <input
                                  name={"code"}
                                  type="text"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.code}
                                  className="form-control form-control-sm"
                                />
                                <div style={{ color: "#D54B4B" }}>
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
                                  {" "}
                                  Nombre <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <input
                                  type="text"
                                  name={"name"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.name}
                                  className={`form-control form-control-sm ${errors.name &&
                                    touched.name &&
                                    "is-invalid"}`}
                                />
                                <div style={{ color: "#D54B4B" }}>
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
                                  {" "}
                                  Cargo responsable{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <select
                                  name={"charge"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.charge}
                                  className="form-control form-control-sm"
                                >
                                  <option value="">Seleccione...</option>
                                  {chargeList}
                                </select>
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.charge && touched.charge ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="charge" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label> Descripción </label>
                                <textarea
                                  name={"description"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.description}
                                  className="form-control"
                                />
                                <div style={{ color: "#D54B4B" }}>
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
                                  Estado <span className="text-danger">*</span>
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
                                          label="Si esta opción se encuentra activada, representa
                                          que el conglomerado es visible en el sistema y se
                                          podrán realizar operaciones entre cada uno de los
                                          módulos correspondientes de la aplicación. En caso
                                          contrario el conglomerado no se elimina del
                                          sistema solo quedará inactivo e invisibles para
                                          cada uno de los módulos correspondiente del
                                          sistema."
                                          {...field}
                                          checked={field.value}
                                          className={
                                            errors.status &&
                                            touched.status &&
                                            "invalid-feedback"
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
                      className={"btn btn-outline-success btn-sm"}
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <i className="fa fa-pencil" /> Actualizar dependencia
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
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

ModalEditDependencia.propTypes = {
  modalEdit: PropTypes.bool.isRequired
};

export default ModalEditDependencia;
