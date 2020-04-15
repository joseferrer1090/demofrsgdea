import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Collapse,
  Card,
  CardHeader,
  CardBody,
  Spinner,
} from "reactstrap";
import IMGGROUPOS from "./../../../assets/img/multiple-users-silhouette.svg";
import moment from "moment";
import { GROUPUSER } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalViewPais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      collapse: false,
      id: this.props.id,
      username: "jferrer",
      dataGroup: {},
      dataUsers: [],
      authorization: this.props.authorization,
      t: this.props.t,
      spinner: true,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
    return null;
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
    this.getInfoGrupoUsuarios(id);
    setTimeout(() => {
      if (this.state.spinner !== false) {
        this.setState({
          spinner: false,
        });
      }
    }, 2000);
  };

  getInfoGrupoUsuarios = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${GROUPUSER}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataGroup: data,
          dataUsers: data.users,
          spinner: false,
        });
      })
      .catch((err) => {
        console.log("Error", err);
        this.setState({
          spinner: false,
        });
      });
  };

  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  };

  FechaCreacionGrupo = (data) => {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  };
  FechaModificacionGrupo = (data) => {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);D
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  };

  render() {
    const statusGrupo = (data) => {
      const { t } = this.state;
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

    const data = this.state.dataUsers;
    console.log(this.state.dataGroup);
    const { t } = this.state;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_grupoUsuarios_modal_ver_titulo")}{" "}
            {this.state.dataGroup.name}{" "}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGGROUPOS} className="img-thumbnail" width="170" />
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
                      {t("app_grupoUsuarios_modal_ver_titulo_2")}{" "}
                    </h5>{" "}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt> {t("app_grupoUsuarios_modal_ver_codigo")} </dt>
                          <dd> {this.state.dataGroup.code} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt> {t("app_grupoUsuarios_modal_ver_nombre")} </dt>
                          <dd> {this.state.dataGroup.name} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {" "}
                            {t("app_grupoUsuarios_modal_ver_descripcion")}{" "}
                          </dt>
                          <dd> {this.state.dataGroup.description} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt> {t("app_grupoUsuarios_modal_ver_estado")} </dt>
                          <dd> {statusGrupo(this.state.dataGroup.status)} </dd>
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
                      {t("app_grupoUsuarios_modal_ver_titulo_collapse")}{" "}
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
                                <dt>
                                  {" "}
                                  {t(
                                    "app_grupoUsuarios_modal_ver_fecha_creacion"
                                  )}{" "}
                                </dt>
                                <dd>
                                  {this.FechaCreacionGrupo(
                                    this.state.dataGroup.createdAt
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
                                    "app_grupoUsuarios_modal_ver_fecha_modificacion"
                                  )}
                                </dt>
                                <dd>
                                  {this.FechaModificacionGrupo(
                                    this.state.dataGroup.updatedAt
                                  )}{" "}
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <dl className="param">
                                <dt>
                                  {" "}
                                  {t(
                                    "app_grupoUsuarios_modal_ver_usuarios_asignados"
                                  )}
                                  :{" "}
                                </dt>
                                <dd>
                                  {""}

                                  {data !== null ? (
                                    data.map((aux, id) => {
                                      return <p>{aux.name} </p>;
                                    })
                                  ) : (
                                    <p className="text-danger">
                                      {t(
                                        "app_grupoUsuarios_modal_ver_usuarios_no_asignados"
                                      )}
                                    </p>
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
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" />{" "}
              {t("app_grupoUsuarios_modal_ver_btn_cerrar")}{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewPais.propTypes = {
  modalview: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired,
};

export default ModalViewPais;
