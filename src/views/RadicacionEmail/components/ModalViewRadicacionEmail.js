import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import ImgRadicacionEmail from "./../../../assets/img/message.svg";
import PropTypes from "prop-types";
import moment from "moment";
import { decode } from "jsonwebtoken";
import { EMAIL_FILING } from "../../../services/EndPoints";

class ModalViewRadicacionEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      id: this.props.id,
      dataRadicacionEmail: {},
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
    this.setState((prevState) => ({
      modal: !prevState.modal,
      id: id,
      spinner: true,
    }));
    this.getInfoRadicacionEmail(id);
    setTimeout(() => {
      if (this.state.spinner !== false) {
        this.setState({
          spinner: false,
        });
      }
    }, 2000);
  };
  getInfoRadicacionEmail = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${EMAIL_FILING}/${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataRadicacionEmail: data,
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
  FechaCreacionRadicacionEmail(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("YYYY-MM-DD, h:mm:ss a");
  }
  FechaModificacionRadicacionEmail(data) {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format("YYYY-MM-DD, h:mm:ss a");
  }

  render() {
    const { t } = this.props;
    const statusRadicacionEmail = (data) => {
      let status;
      if (data === true) {
        status = (
          <b className="text-success"> {t("app_tablas_estado_activo")}</b>
        );
      } else if (data === false) {
        status = (
          <b className="text-danger"> {t("app_tablas_estado_inactivo")}</b>
        );
      }
      return status;
    };
    const protocol = this.state.dataRadicacionEmail.protocol;
    const host = this.state.dataRadicacionEmail.host;
    const port = this.state.dataRadicacionEmail.port;
    const email = this.state.dataRadicacionEmail.email;
    const status = this.state.dataRadicacionEmail.status;
    const createdAt = this.state.dataRadicacionEmail.createdAt;
    const updatedAt = this.state.dataRadicacionEmail.updatedAt;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_radicacion_email_modal_ver_titulo")} {email}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={ImgRadicacionEmail} />
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
                      {t("app_radicacion_email_modal_ver_titulo_2")}
                    </h5>{" "}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {t("app_radicacion_email_modal_ver_protocol")}
                          </dt>
                          <dd>{protocol} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_radicacion_email_modal_ver_host")}</dt>
                          <dd> {host} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_radicacion_email_modal_ver_puerto")}</dt>
                          <dd> {port} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_radicacion_email_modal_ver_email")}</dt>
                          <dd> {email} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_radicacion_email_modal_ver_estado")}</dt>
                          <dd> {statusRadicacionEmail(status)} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {t("app_radicacion_email_modal_ver_fecha_creacion")}
                          </dt>
                          <dd>
                            {" "}
                            {this.FechaCreacionRadicacionEmail(createdAt)}{" "}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {t(
                              "app_radicacion_email_modal_ver_fecha_modificacion"
                            )}
                          </dt>
                          <dd>
                            {" "}
                            {this.FechaModificacionRadicacionEmail(
                              updatedAt
                            )}{" "}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
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
              {" "}
              <i className="fa fa-times" />{" "}
              {t("app_radicacion_email_modal_ver_cerrar")}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewRadicacionEmail.propTypes = {
  authorization: PropTypes.string.isRequired,
  modalview: PropTypes.bool.isRequired,
  t: PropTypes.any,
};

export default ModalViewRadicacionEmail;
