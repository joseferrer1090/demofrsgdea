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
import IMGDEPARTAMENTO from "./../../../assets/img/map-marker.svg";
import moment from "moment";
import { decode } from "jsonwebtoken";
import { DEPARTMENT } from "./../../../services/EndPoints";

class ModalViewDepartamento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      id: this.props.id,
      dataDepartamento: {},
      dataPais: {},
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
    this.getDataDeparmentById(id);
    setTimeout(() => {
      if (this.state.spinner !== false) {
        this.setState({
          spinner: false,
        });
      }
    }, 2000);
  };

  getDataDeparmentById = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${DEPARTMENT}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          dataPais: data.country,
          dataDepartamento: data,
          spinner: false,
        })
      )
      .catch((Error) => {
        console.log("", Error);
        this.setState({
          spinner: false,
        });
      });
  };

  FechaCreacionDeparment(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacionDeparment(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }

  render() {
    const department = this.state.dataDepartamento;
    const country = this.state.dataPais;

    const statusDepartamento = (data) => {
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
    const { t } = this.props;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_departamento_modal_ver_titulo")} {department.name}{" "}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGDEPARTAMENTO} className="img-thumbnail" />
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
                      {t("app_departamento_modal_ver_titulo_2")}{" "}
                    </h5>{" "}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <dl className="param">
                        <dt> {t("app_departamento_modal_ver_pais")} </dt>
                        <dd> {country.name} </dd>
                      </dl>
                    </div>
                    <div className="col-md-6">
                      <dl className="param">
                        <dt> {t("app_departamento_modal_ver_codigo")} </dt>
                        <dd> {department.code} </dd>
                      </dl>
                    </div>
                    <div className="col-md-6">
                      <dl className="param">
                        <dt> {t("app_departamento_modal_ver_nombre")} </dt>
                        <dd> {department.name} </dd>
                      </dl>
                    </div>
                    <div className="col-md-6">
                      <dl className="param">
                        <dt> {t("app_departamento_modal_ver_estado")} </dt>
                        <dd> {statusDepartamento(department.status)} </dd>
                      </dl>
                    </div>
                    <div className="col-md-6">
                      <dl className="param">
                        <dt>
                          {" "}
                          {t("app_departamento_modal_ver_fecha_creacion")}
                        </dt>
                        <dd>
                          {" "}
                          {this.FechaCreacionDeparment(
                            department.createdAt
                          )}{" "}
                        </dd>
                      </dl>
                    </div>
                    <div className="col-md-6">
                      <dl className="param">
                        <dt>
                          {" "}
                          {t(
                            "app_departamento_modal_ver_fecha_modificacion"
                          )}{" "}
                        </dt>
                        <dd>
                          {" "}
                          {this.FechaModificacionDeparment(
                            department.updatedAt
                          )}{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn  btn-sm btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" />{" "}
              {t("app_departamento_modal_ver_cerrar")}{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewDepartamento.propTypes = {
  modalview: PropTypes.bool.isRequired,
  t: PropTypes.any,
  id: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired,
};

export default ModalViewDepartamento;
