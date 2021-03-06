import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import IMGPAIS from "./../../../assets/img/flag.svg";
import moment from "moment";
import { decode } from "jsonwebtoken";
import { COUNTRY } from "./../../../services/EndPoints";

class ModalViewPais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      dataPais: {},
      id: this.props.id,
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
    this.setState({
      modal: !this.state.modal,
      id: id,
      spinner: true,
    });
    this.getDataCountyById(id);
    setTimeout(() => {
      if (this.state.spinner !== false) {
        this.setState({
          spinner: false,
        });
      }
    }, 2000);
  };

  getDataCountyById = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${COUNTRY}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataPais: data,
          spinner: false,
        });
      })
      .catch((error) => {
        console.log("Error", error);
        this.setState({
          spinner: false,
        });
      });
  };

  FechaCreacionPais(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacionPais(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }

  render() {
    const { t } = this.props;
    const statusCountry = (data) => {
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
    const code = this.state.dataPais.code;
    const name = this.state.dataPais.name;
    const status = this.state.dataPais.status;
    const createdAt = this.state.dataPais.createdAt;
    const updatedAt = this.state.dataPais.updatedAt;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_pais_modal_ver_titulo")} {name}{" "}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGPAIS} className="img-thumbnail" />
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
                      {t("app_pais_modal_ver_titulo_2")}{" "}
                    </h5>{" "}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt> {t("app_pais_modal_ver_codigo")} </dt>
                          <dd> {code} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt> {t("app_pais_modal_ver_nombre")} </dt>
                          <dd> {name} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt> {t("app_pais_modal_ver_estado")} </dt>
                          <dd> {statusCountry(status)} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt> {t("app_pais_modal_ver_fecha_creacion")} </dt>
                          <dd> {this.FechaCreacionPais(createdAt)} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {" "}
                            {t("app_pais_modal_ver_fecha_modificacion")}{" "}
                          </dt>
                          <dd> {this.FechaModificacionPais(updatedAt)} </dd>
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
              className="btn btn-sm btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" />{" "}
              {t("app_pais_modal_ver_button_cerrar")}{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewPais.propTypes = {
  modalview: PropTypes.bool.isRequired,
  t: PropTypes.any,
  id: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired,
};

export default ModalViewPais;
