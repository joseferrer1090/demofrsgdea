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
import { TYPEDOCUMENTARY_SHOW } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import TableModal from "./TableModalViewTipoDocumental";
import moment from "moment";

class ModalviewTipoDocumentoRadication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t: this.props.t,
      id: this.props.id,
      modal: this.props.modalviewtramit,
      auth: this.props.authorization,
      data: {},
      users: [],
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

  getDataById = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${TYPEDOCUMENTARY_SHOW}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data.typeDocumentary,
          users: data.users,
          spinner: false
        });
      })
      .catch((err) => {console.log(err); this.setState({
        spinner:false
      })});
  };

  toggle = (id) => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
      id: id,
      spinner: true,
    }));
    this.getDataById(id);
    setTimeout(() => {
      if (this.state.spinner !== false) {
        this.setState({
          spinner: false,
        });
      }
    }, 2000);
  };

  FechaCreacionTipoTramite(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacionTipoTramite(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }

  render() {
    const { data } = this.state;
    const { t } = this.props;
    console.log(data);
    const statusTipoDocumentalRadicacion = (data) => {
      let status;
      if (data === 1) {
        status = (
          <b className="text-success">
            {" "}
            {t("app_documentalRadicacion_ver_estado_activo")}
          </b>
        );
      } else if (data === 0) {
        status = (
          <b className="text-danger">
            {" "}
            {t("app_documentalRadicacion_ver_estado_inactivo")}
          </b>
        );
      }
      return status;
    };
    const TypeCorrespondence = (data) => {
      let type;
      if (data === 1) {
        type = (
          <p>
            {t("app_documentalRadicacion_ver_tipo_correspondencia_recibida")}
          </p>
        );
      } else if (data === 2) {
        type = (
          <p>
            {t("app_documentalRadicacion_ver_tipo_correspondencia_despachada")}
          </p>
        );
      } else if (data === 3) {
        type = (
          <p>
            {t("app_documentalRadicacion_ver_tipo_correspondencia_interna")}
          </p>
        );
      }
      return type;
    };
    return (
      <div>
        <Modal className="modal-xl" isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_documentalRadicacion_ver_titulo")} {data.name}
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
                      {t("app_documentalRadicacion_ver_titulo_2")}{" "}
                    </h5>{" "}
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_documentalRadicacion_ver_codigo")} </dt>
                          <dd> {data.code} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {t(
                              "app_documentalRadicacion_ver_tipo_correspondencia"
                            )}{" "}
                          </dt>
                          <dd>
                            {" "}
                            {TypeCorrespondence(data.typeCorrespondence)}{" "}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_documentalRadicacion_ver_nombre")} </dt>
                          <dd> {data.name} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {t("app_documentalRadicacion_ver_descripcion")}{" "}
                          </dt>
                          <dd> {data.description} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_documentalRadicacion_ver_estado")} </dt>
                          <dd>
                            {" "}
                            {statusTipoDocumentalRadicacion(data.status)}{" "}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_documentalRadicacion_ver_asunto")} </dt>
                          <dd> {data.issue} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {t(
                              "app_documentalRadicacion_ver_fecha_modificacion"
                            )}
                          </dt>
                          <dd>
                            {" "}
                            {this.FechaCreacionTipoTramite(data.createdAt)}{" "}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {t(
                              "app_documentalRadicacion_ver_fecha_modificacion"
                            )}{" "}
                          </dt>
                          <dd>
                            {" "}
                            {this.FechaModificacionTipoTramite(
                              data.updatedAt
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
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    {t("app_documentalRadicacion_ver_titulo_3")}{" "}
                  </h5>{" "}
                </div>
                <div className="row">
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
                    <TableModal data={this.state.users} t={this.state.t} />
                  )}
                </div>
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
              <i className="fa fa-times" />{" "}
              {t("app_documentalRadicacion_ver_cerrar")}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalviewTipoDocumentoRadication.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired,
};

export default ModalviewTipoDocumentoRadication;
