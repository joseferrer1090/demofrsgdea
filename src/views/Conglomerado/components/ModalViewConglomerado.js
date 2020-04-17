import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Collapse,
  Spinner,
} from "reactstrap";
import PropTypes from "prop-types";
import IMGCONGLOMERADO from "./../../../assets/img/puzzle.svg";
import { Trans } from "react-i18next";
import moment from "moment";
import { decode } from "jsonwebtoken";
import { CONGLOMERATE } from "../../../services/EndPoints";

class ModalViewConglomerado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewstate,
      id: this.props.id,
      dataConglomerado: {},
      dataPais: {},
      dataDepartamento: {},
      dataCiudad: {},
      collapase: false,
      dataCharge: {},
      t: this.props.t,
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

  toggleCollapse = () => {
    this.setState({
      collapase: !this.state.collapase,
    });
  };

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
      id: id,
      spinner: true,
    });
    this.getInfoConglomerate(id);
  };

  getInfoConglomerate = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${CONGLOMERATE}/${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataConglomerado: data,
          dataPais: data.city.department.country,
          dataDepartamento: data.city.department,
          dataCiudad: data.city,
          dataCharge: data.charge,
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

  FechaCreacionConglomerado(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacionConglomerado(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }

  CargoInfo = () => {
    const { t } = this.props;
    const data = this.state.dataCharge;
    let status;
    if (data === null)
      status = <b className="text-danger">{t("app_modals_sin_cargo")}</b>;
    else if (data !== null) {
      status = <div>{data.name}</div>;
    }
    return status;
  };

  render() {
    const statusConglomerado = (data) => {
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
    const dataPais = this.state.dataPais;
    const dataDepartamento = this.state.dataDepartamento;
    const dataCiudad = this.state.dataCiudad;
    const { t } = this.props;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            <Trans>{t("app_conglomerado_modal_ver_titulo")}</Trans>{" "}
            {this.state.dataConglomerado.name}{" "}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGCONGLOMERADO} className="img-thumbnail" />
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
                      <Trans>
                        {t("app_conglomerado_modal_ver_titulo_2")}
                      </Trans>{" "}
                    </h5>{" "}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt> {t("app_conglomerado_modal_ver_codigo")} </dt>
                          <dd> {this.state.dataConglomerado.code} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt> {t("app_conglomerado_modal_ver_nombre")} </dt>
                          <dd> {this.state.dataConglomerado.name} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {" "}
                            {t("app_conglomerado_modal_ver_descripcion")}{" "}
                          </dt>
                          <dd> {this.state.dataConglomerado.description} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt> {t("app_conglomerado_modal_ver_estado")} </dt>
                          <dd>
                            {" "}
                            {statusConglomerado(
                              this.state.dataConglomerado.status
                            )}{" "}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {" "}
                            {t(
                              "app_conglomerado_modal_ver_fecha_creacion"
                            )}{" "}
                          </dt>
                          <dd>
                            {" "}
                            {this.FechaCreacionConglomerado(
                              this.state.dataConglomerado.createdAt
                            )}{" "}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {" "}
                            {t(
                              "app_conglomerado_modal_ver_fecha_modificacion"
                            )}{" "}
                          </dt>
                          <dd>
                            {" "}
                            {this.FechaModificacionConglomerado(
                              this.state.dataConglomerado.updatedAt
                            )}{" "}
                          </dd>
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
                      {t("app_conglomerado_modal_ver_mas_informacion")}{" "}
                    </a>{" "}
                  </CardHeader>
                  <Collapse isOpen={this.state.collapase}>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt> {t("app_conglomerado_modal_ver_pais")} </dt>
                              <dd> {dataPais.name} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt>
                                {" "}
                                {t(
                                  "app_conglomerado_modal_ver_departamento"
                                )}{" "}
                              </dt>
                              <dd> {dataDepartamento.name} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt>
                                {" "}
                                {t("app_conglomerado_modal_ver_ciudad")}{" "}
                              </dt>
                              <dd> {dataCiudad.name} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt>
                                {t(
                                  "app_conglomerado_modal_ver_cargo_responsable"
                                )}{" "}
                              </dt>
                              <dd> {this.CargoInfo()} </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Collapse>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false, collapase: false });
              }}
            >
              <i className="fa fa-times" />{" "}
              {t("app_conglomerado_modal_ver_botom")}{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewConglomerado.propTypes = {
  modalviewstate: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired,
};

export default ModalViewConglomerado;
