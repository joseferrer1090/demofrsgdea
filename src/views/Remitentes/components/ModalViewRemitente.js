import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Collapse,
  Card,
  CardHeader,
  CardBody,
  Spinner,
} from "reactstrap";
import IMGPROFILE from "./../../../assets/img/profile.svg";
import moment from "moment";
import { THIRDPARTY } from "../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalViewRemitente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      collapse: false,
      id: this.props.id,
      dataTercero: {},
      datTipoTecero: {},
      dataCiudad: {},
      t: this.props.t,
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
    this.getInfoTercero(id);
    setTimeout(() => {
      if (this.state.spinner !== false) {
        this.setState({
          spinner: false,
        });
      }
    }, 2000);
  };
  getInfoTercero = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${THIRDPARTY}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          dataTercero: data,
          datTipoTecero: data.typeThirdParty,
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
    this.setState({ collapse: !this.state.collapse });
  };

  FechaCreacionTerceros(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacionTerceros(data) {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }

  render() {
    const { t } = this.props;
    const statusTercero = (data) => {
      let status;
      if (data === 1) {
        return (status = (
          <b className="text-success"> {t("app_tablas_estado_activo")}</b>
        ));
      } else if (data === 0) {
        return (status = (
          <b className="text-danger"> {t("app_tablas_estado_inactivo")} </b>
        ));
      }
      return status;
    };
    const elementoComunicacion = (data) => {
      let elemento;
      if (data === 1) {
        return (elemento = <p> Remitente</p>);
      } else if (data === 2) {
        return (elemento = <p>Destinatario</p>);
      } else if (data === 3) {
        return (elemento = <p>Mixto</p>);
      }
      return elemento;
    };
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_tercero_modal_ver_titulo")} {this.state.dataTercero.name}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGPROFILE} className="img-thumbnail" />
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
                      {t("app_tercero_modal_ver_titulo_2")}{" "}
                    </h5>{" "}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_tercero_modal_ver_tipoTercero")} </dt>
                          <dd> {this.state.datTipoTecero.name} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {t("app_tercero_modal_ver_ElementoComunicacion")}{" "}
                          </dt>
                          <dd>
                            {" "}
                            {elementoComunicacion(
                              this.state.dataTercero.communicationElement
                            )}{" "}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_tercero_modal_ver_identificacion")} </dt>
                          <dd> {this.state.dataTercero.identification} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_tercero_modal_ver_nombre")} </dt>
                          <dd> {this.state.dataTercero.name}</dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_tercero_modal_ver_email")} </dt>
                          <dd> {this.state.dataTercero.email} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt> {t("app_tercero_modal_ver_estado")} </dt>
                          <dd>
                            {" "}
                            {statusTercero(this.state.dataTercero.status)}{" "}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
              <Col sm="12">
                <Card>
                  <CardHeader>
                    {" "}
                    <a
                      onClick={this.toggleCollapse}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      {t("app_tercero_modal_ver_collapse")}{" "}
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
                                <dt>{t("app_tercero_modal_ver_telFijo")} </dt>
                                <dd> {this.state.dataTercero.landline} </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                <dt>
                                  {t("app_tercero_modal_ver_telCelular")}{" "}
                                </dt>
                                <dd> {this.state.dataTercero.cellPhone} </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                <dt>{t("app_tercero_modal_ver_direccion")} </dt>
                                <dd> {this.state.dataTercero.address}</dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                <dt>{t("app_tercero_modal_ver_ciudad")} </dt>
                                <dd>{this.state.dataCiudad.name}</dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                <dt>
                                  {t("app_tercero_modal_ver_referencia")}{" "}
                                </dt>
                                <dd> {this.state.dataTercero.reference} </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                <dt>
                                  {t("app_tercero_modal_ver_observacion")}{" "}
                                </dt>
                                <dd> {this.state.dataTercero.observation} </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                <dt>
                                  {t("app_tercero_modal_ver_fecha_creacion")}{" "}
                                </dt>
                                <dd>
                                  {" "}
                                  {this.FechaCreacionTerceros(
                                    this.state.dataTercero.createdAt
                                  )}{" "}
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                <dt>
                                  {t(
                                    "app_tercero_modal_ver_fecha_modificacion"
                                  )}{" "}
                                </dt>
                                <dd>
                                  {" "}
                                  {this.FechaModificacionTerceros(
                                    this.state.dataTercero.updatedAt
                                  )}{" "}
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
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              <i className="fa fa-times" />{" "}
              {t("app_tercero_modal_ver_boton_cerrar")}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewRemitente.propTypes = {
  modalview: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired,
};

export default ModalViewRemitente;
