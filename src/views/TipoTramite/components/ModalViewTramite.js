import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import IMGTRAMITE from "./../../../assets/img/folder.svg";
import moment from "moment";
import { TYPEPROCEDURE } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import TableComponent from "./TableModalViewComponent";

class ModalViewTramite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t: this.props.t,
      modal: this.props.modalviewtramit,
      id: this.props.id,
      dataTipoTramite: {},
      users: [],
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
    this.setState((prevState) => ({
      modal: !prevState.modal,
      id: id,
      spinner: true,
    }));
    this.getDataTipoTramiteById(id);
    setTimeout(() => {
      if (this.state.spinner !== false) {
        this.setState({
          spinner: false,
        });
      }
    }, 2000);
  };

  getDataTipoTramiteById = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${TYPEPROCEDURE}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataTipoTramite: data.typeProcedure,
          users: data.users,
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

  FechaCreacionTipoTramite(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacionTipoTramite(data) {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }

  render() {
    const { t } = this.props;
    const statusTipoTramite = (data) => {
      let status;
      if (data === 1) {
        status = (
          <b className="text-success">
            {" "}
            {t("app_tipoTramite_ver_estado_activo")}
          </b>
        );
      } else if (data === 0) {
        status = (
          <b className="text-danger">
            {" "}
            {t("app_tipoTramite_ver_estado_inactivo")}
          </b>
        );
      }
      return status;
    };
    const typeProcedure = (data) => {
      let type;
      if (data === 1) {
        type = <p>{t("app_tipoTramite_ver_tipo_correspondencia_recibida")}</p>;
      } else if (data === 2) {
        type = (
          <p>{t("app_tipoTramite_ver_tipo_correspondencia_despachada")}</p>
        );
      } else if (data === 3) {
        type = <p>{t("app_tipoTramite_ver_tipo_correspondencia_interna")}</p>;
      }
      return type;
    };
    return (
      <div>
        <Modal className="modal-xl" isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_tipoTramite_ver_titulo")} {this.state.dataTipoTramite.name}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="2">
                <img
                  src={IMGTRAMITE}
                  className="img-thumbnail"
                  style={{ width: "169px", height: "169px" }}
                />
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
                <Col>
                  <div className="">
                    {" "}
                    <h5
                      className=""
                      style={{ borderBottom: "1px solid black" }}
                    >
                      {" "}
                      {t("app_tipoTramite_ver_titulo_2")}{" "}
                    </h5>{" "}
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_tipoTramite_ver_codigo")} </dt>
                          <dd>{this.state.dataTipoTramite.code}</dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {t("app_tipoTramite_ver_tipo_correspondencia")}
                          </dt>
                          <dd>
                            {" "}
                            {typeProcedure(
                              this.state.dataTipoTramite.typeCorrespondence
                            )}{" "}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_tipoTramite_ver_nombre")} </dt>
                          <dd> {this.state.dataTipoTramite.name} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_tipoTramite_ver_descripcion")} </dt>
                          <dd> {this.state.dataTipoTramite.description} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_tipoTramite_ver_fecha_creacion")} </dt>
                          <dd>
                            {" "}
                            {this.FechaCreacionTipoTramite(
                              this.state.dataTipoTramite.createdAt
                            )}{" "}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {t("app_tipoTramite_ver_fecha_modificacion")}{" "}
                          </dt>
                          <dd>
                            {this.FechaModificacionTipoTramite(
                              this.state.dataTipoTramite.updatedAt
                            )}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
            <Row>
              <Col sm="12">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    {t("app_tipoTramite_ver_titulo_3")}{" "}
                  </h5>{" "}
                </div>
                <TableComponent t={this.state.t} data={this.state.users} />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              onClick={() => {
                this.setState({ modal: false });
              }}
              className="btn btn-secondary btn-sm"
            >
              <i className="fa fa-times" /> {t("app_tipoTramite_ver_cerrar")}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewTramite.propTypes = {
  t: PropTypes.any.isRequired,
  authorization: PropTypes.string.isRequired,
};

export default ModalViewTramite;
