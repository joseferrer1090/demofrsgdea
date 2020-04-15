import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  Collapse,
  Card,
  CardBody,
  CardHeader,
  Spinner,
} from "reactstrap";
import IMGCOMPANY from "./../../../assets/img/company.svg";
import moment from "moment";
import { COMPANYS } from "../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalViewEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewempresa,
      collapase: false,
      id: this.props.id,
      dataCompany: {},
      dataCompanyConglomerate: {},
      dataCargo: {},
      dataPais: {},
      dataDepartamento: {},
      dataCiudad: {},
      t: this.props.t,
      username: "",
      auth: this.props.authorization,
      spinner: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
      });
    }
  }

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
      id: id,
      spinner: true,
    });
    this.getInfoEmpresa(id);
    setTimeout(() => {
      if (this.state.spinner !== false) {
        this.setState({
          spinner: false,
        });
      }
    }, 2000);
  };
  getInfoEmpresa = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${COMPANYS}/${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataCompany: data,
          dataCompanyConglomerate: data.conglomerate,
          dataCargo: data.charge,
          dataPais: data.city.department.country,
          dataDepartamento: data.city.department,
          dataCiudad: data.city,
          spinner: false,
        });
      })
      .catch((Error) => {
        console.log(Error);
        this.setState({
          spinner: false,
        });
      });
  };

  toggleCollapse = () => {
    this.setState({
      collapase: !this.state.collapase,
    });
  };
  FechaCreacionCompany(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacionCompany(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }

  render() {
    const company = this.state.dataCompany;
    const companyconglomerate = this.state.dataCompanyConglomerate;
    const statusCompany = (data) => {
      const { t } = this.props;
      let status;
      if (data === 1) {
        status = (
          <b className="text-success">{t("app_tablas_estado_activo")}</b>
        );
      } else if (data === 0) {
        status = (
          <b className="text-danger">{t("app_tablas_estado_inactivo")}</b>
        );
      }
      return status;
    };

    const CargoInfo = () => {
      const { t } = this.props;
      const data = this.state.dataCargo;
      let status;
      if (data === null)
        status = <b className="text-danger">{t("app_modals_sin_cargo")}</b>;
      else if (data !== null) {
        status = <div>{data.name}</div>;
      }
      return status;
    };

    const dataPais = this.state.dataPais;
    const dataDepartamento = this.state.dataDepartamento;
    const dataCiudad = this.state.dataCiudad;
    const { t } = this.props;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_empresa_modal_ver_titulo")} {company.name}{" "}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGCOMPANY} className="img-thumbnail" />
              </Col>
              {this.state.spinner !== false ? (
                <center>
                  <br />
                  <Spinner
                    style={{ width: "3rem", height: "3rem" }}
                    type="grow"
                    color="primary"
                  />
                </center>
              ) : (
                <Col sm="9">
                  <div className="">
                    {" "}
                    <h5
                      className=""
                      style={{ borderBottom: "1px solid black" }}
                    >
                      {" "}
                      {t("app_empresa_modal_ver_titulo_2")}{" "}
                    </h5>{" "}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_empresa_modal_ver_conglomerado")} </dt>
                          <dd>{companyconglomerate.name}</dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_empresa_modal_ver_codigo")} </dt>
                          <dd> {company.code} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_empresa_modal_ver_nit")} </dt>
                          <dd>{company.nit} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_empresa_modal_ver_nombre")} </dt>
                          <dd>{company.name}</dd>
                        </dl>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_empresa_modal_ver_descripcion")} </dt>
                          <dd>{company.description}</dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_empresa_modal_ver_estado")} </dt>
                          <dd>{statusCompany(company.status)}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
            <br />
            <Row>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    {" "}
                    <a
                      onClick={() => {
                        this.toggleCollapse();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      {t("app_empresa_modal_ver_collapse")}{" "}
                    </a>{" "}
                  </CardHeader>
                  <Collapse isOpen={this.state.collapase}>
                    {this.state.spinner !== false ? (
                      <center>
                        <br />
                        <Spinner
                          style={{ width: "3rem", height: "3rem" }}
                          type="grow"
                          color="primary"
                        />
                      </center>
                    ) : (
                      <CardBody>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <dl className="param">
                                <dt> {t("app_empresa_modal_ver_pais")} </dt>
                                <dd> {dataPais.name} </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <dl className="param">
                                <dt>
                                  {" "}
                                  {t("app_empresa_modal_ver_departamento")}{" "}
                                </dt>
                                <dd> {dataDepartamento.name} </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <dl className="param">
                                <dt> {t("app_empresa_modal_ver_ciudad")} </dt>
                                <dd> {dataCiudad.name} </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <dl className="param">
                                <dt>
                                  {t("app_empresa_modal_ver_cargo_responsable")}{" "}
                                </dt>
                                <dd> {CargoInfo()}</dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <dl className="param">
                                <dt>
                                  {" "}
                                  {t(
                                    "app_empresa_modal_ver_fecha_creacion"
                                  )}{" "}
                                </dt>
                                <dd>
                                  {" "}
                                  {this.FechaCreacionCompany(
                                    company.createdAt
                                  )}{" "}
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <dl className="param">
                                <dt>
                                  {" "}
                                  {t(
                                    "app_empresa_modal_ver_fecha_modificacion"
                                  )}{" "}
                                </dt>
                                <dd>
                                  {" "}
                                  {this.FechaModificacionCompany(
                                    company.updatedAt
                                  )}
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    )}
                  </Collapse>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false, collapase: false });
              }}
            >
              {" "}
              <i className="fa fa-times" />{" "}
              {t("app_empresa_modal_ver_boton_cerrar")}{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewEmpresa.propTypes = {
  modalviewempresa: PropTypes.bool.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired,
};

export default ModalViewEmpresa;
