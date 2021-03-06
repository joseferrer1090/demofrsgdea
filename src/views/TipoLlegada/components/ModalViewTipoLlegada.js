import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import IMGPackage from "./../../../assets/img/package.svg";
import PropTypes from "prop-types";
import moment from "moment";
import { TYPESHIPMENTSARRIVALS } from "../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalViewTipoLlegada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      id: this.props.id,
      dataTipoLlegada: {},
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

  toggle = (id) => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
      id: id,
      spinner: true,
    }));
    this.getInfoTipoLlegada(id);
    setTimeout(() => {
      if (this.state.spinner !== false) {
        this.setState({
          spinner: false,
        });
      }
    }, 2000);
  };

  getInfoTipoLlegada = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${TYPESHIPMENTSARRIVALS}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataTipoLlegada: data,
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

  FechaCreacionTipoLlegada(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacionTipoLlegada(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  render() {
    const { t } = this.props;
    const statusTipoLlegada = (data) => {
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
    const code = this.state.dataTipoLlegada.code;
    const createdAt = this.state.dataTipoLlegada.createdAt;
    const description = this.state.dataTipoLlegada.description;
    const id = this.state.dataTipoLlegada.id;
    const name = this.state.dataTipoLlegada.name;
    const status = this.state.dataTipoLlegada.status;
    const updatedAt = this.state.dataTipoLlegada.updatedAt;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_tipoLlegada_modal_ver_titulo")} {name}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGPackage} />
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
                      {t("app_tipoLlegada_modal_ver_titulo_2")}{" "}
                    </h5>{" "}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_tipoLlegada_modal_ver_codigo")} </dt>
                          <dd> {code} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_tipoLlegada_modal_ver_nombre")} </dt>
                          <dd> {name} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_tipoLlegada_modal_ver_descripcion")} </dt>
                          <dd> {description} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_tipoLlegada_modal_ver_estado")} </dt>
                          <dd> {statusTipoLlegada(status)} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {t("app_tipoLlegada_modal_ver_fecha_creacion")}{" "}
                          </dt>
                          <dd>{this.FechaCreacionTipoLlegada(createdAt)}</dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {t("app_tipoLlegada_modal_ver_fecha_modificacion")}{" "}
                          </dt>
                          <dd>
                            {" "}
                            {this.FechaModificacionTipoLlegada(updatedAt)}{" "}
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
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" />{" "}
              {t("app_tipoLlegada_modal_ver_button_cerrar")}{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewTipoLlegada.propTypes = {
  modalview: PropTypes.bool.isRequired,
  t: PropTypes.array,
  id: PropTypes.string.isRequired,
  auth: PropTypes.string.isRequired,
};

export default ModalViewTipoLlegada;
