import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Collapse,
  Spinner,
} from "reactstrap";
import IMGSEDE from "./../../../assets/img/teamwork.svg";
import moment from "moment";
import { HEADQUARTER } from "../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalViewSedes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      collapse: false,
      id: this.props.id,
      dataSedes: {},
      dataEmpresa: {},
      dataConglomerado: {},
      dataCiudad: {},
      dataDepartamento: {},
      dataCargo: {},
      t: this.props.t,
      dataPais: {},
      username: "",
      auth: this.props.authorization,
      spinner: true,
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
    this.getInfoSede(id);
    setTimeout(() => {
      if (this.state.spinner !== false) {
        this.setState({
          spinner: false,
        });
      }
    }, 2000);
  };
  getInfoSede = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${HEADQUARTER}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataSedes: data,
          dataEmpresa: data.company,
          dataConglomerado: data.company.conglomerate,
          dataCiudad: data.city,
          dataDepartamento: data.city.department,
          dataPais: data.city.department.country,
          dataCargo: data.charge,
          spinner: false,
        });
      })
      .catch((Error) => {
        console.log(" ", Error);
        this.setState({
          spinner: false,
        });
      });
  };

  toggleCollapse = () => {
    this.setState({ collapse: !this.state.collapse, collapse2: false });
  };

  FechaCreacionSede(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacionSede(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }

  render() {
    const dataSede = this.state.dataSedes;
    console.log(dataSede.id);
    const dataEmpresa = this.state.dataEmpresa;
    const dataConglomerado = this.state.dataConglomerado;
    const dataPais = this.state.dataPais;
    const dataDepartamento = this.state.dataDepartamento;
    const dataCiudad = this.state.dataCiudad;

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

    const statusHeadquarter = (data) => {
      const { t } = this.props;
      let status;
      if (data === 1) {
        status = (
          <b className="text-success"> {t("app_tablas_estado_activo")} </b>
        );
      } else if (data === 0) {
        status = (
          <b className="text-danger"> {t("app_tablas_estado_inactivo")} </b>
        );
      }
      return status;
    };
    const { t } = this.props;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_sedes_modal_ver_titulo")} {this.state.dataSedes.name}{" "}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGSEDE} className="img-thumbnail" />
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
                      {t("app_sedes_modal_ver_titulo_2")}{" "}
                    </h5>{" "}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_sedes_modal_ver_conglomerado")} </dt>
                          <dd>{dataConglomerado.name}</dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_sedes_modal_ver_empresa")} </dt>
                          <dd>{dataEmpresa.name}</dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_sedes_modal_ver_codigo")} </dt>
                          <dd> {dataSede.code}</dd>
                        </dl>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_sedes_modal_ver_nombre")} </dt>
                          <dd> {dataSede.name}</dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_sedes_modal_ver_descripcion")} </dt>
                          <dd> {dataSede.description}</dd>
                        </dl>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_sedes_modal_ver_prefij_radicacion")} </dt>
                          <dd> {dataSede.prefix}</dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_sedes_modal_ver_sec_radicacion")} </dt>
                          <dd>{dataSede.sequence} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_sedes_modal_ver_estado")} </dt>
                          <dd> {statusHeadquarter(dataSede.status)}</dd>
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
                      {t("app_sedes_modal_ver_collapse")}{" "}
                    </a>{" "}
                  </CardHeader>
                  <Collapse isOpen={this.state.collapse}>
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
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                <dt>{t("app_sedes_modal_ver_pais")} </dt>
                                <dd> {dataPais.name}</dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                <dt>
                                  {t("app_sedes_modal_ver_departamento")}{" "}
                                </dt>
                                <dd> {dataDepartamento.name}</dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                <dt>{t("app_sedes_modal_ver_ciudad")} </dt>
                                <dd> {dataCiudad.name}</dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                <dt>{t("app_sedes_modal_ver_direccion")} </dt>
                                <dd> {dataSede.address}</dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                <dt>{t("app_sedes_modal_ver_telefono")} </dt>
                                <dd> {dataSede.phone}</dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                <dt>
                                  {t("app_sedes_modal_ver_cargo_responsable")}{" "}
                                </dt>
                                <dd> {CargoInfo()}</dd>
                              </dl>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                <dt>
                                  {" "}
                                  {t("app_sedes_modal_ver_fecha_creacion")}{" "}
                                </dt>
                                <dd>
                                  {this.FechaCreacionSede(dataSede.createdAt)}{" "}
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                <dt>
                                  {t("app_sedes_modal_ver_fecha_modificacion")}{" "}
                                </dt>
                                <dd>
                                  {" "}
                                  {this.FechaModificacionSede(
                                    dataSede.updatedAt
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
                this.setState({ modal: false, collapse: false });
              }}
            >
              {" "}
              <i className="fa fa-times" />{" "}
              {t("app_sedes_modal_ver_boton_cerrar")}{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewSedes.propTypes = {
  modalview: PropTypes.bool.isRequired,
  t: PropTypes.any,
  id: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired,
};

export default ModalViewSedes;
