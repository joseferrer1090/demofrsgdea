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
import IMGCITY from "./../../../assets/img/skyline.svg";
import moment from "moment";
import { decode } from "jsonwebtoken";
import { CITY } from "../../../services/EndPoints";

class ModalViewCiudad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      idCity: this.props.id,
      dataCity: {},
      dataDepartment: {},
      dataCountry: {},
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
      idCity: id,
      spinner: true,
    });
    setTimeout(() => {
      if (this.state.spinner !== false) {
        this.setState({
          spinner: false,
        });
      }
    }, 2000);
    this.getDataCitiesById(id);
  };

  getDataCitiesById = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${CITY}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          dataCity: data,
          dataDepartment: data.department,
          dataCountry: data.department.country,
        })
      )
      .catch((Error) => console.log("", Error));
  };
  FechaCreacionCiudad(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacionCiudad(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }

  render() {
    const { t } = this.props;
    const dataCity = this.state.dataCity;
    console.log(dataCity.id);
    const dataDepartment = this.state.dataDepartment;
    const dataCountry = this.state.dataCountry;
    const statusCity = (data) => {
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
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_ciudad_modal_ver_titulo")} {dataCity.name}{" "}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGCITY} className="img-thumbnail" />
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
                      {t("app_ciudad_modal_ver_titulo_2")}{" "}
                    </h5>{" "}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_ciudad_modal_ver_pais")} </dt>
                          <dd> {dataCountry.name} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_ciudad_modal_ver_departamento")} </dt>
                          <dd> {dataDepartment.name} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt> {t("app_ciudad_modal_ver_codigo")} </dt>
                          <dd> {dataCity.code} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt> {t("app_ciudad_modal_ver_nombre")} </dt>
                          <dd> {dataCity.name} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt> {t("app_ciudad_modal_ver_estado")} </dt>
                          <dd> {statusCity(dataCity.status)} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt> {t("app_ciudad_modal_ver_fecha_creacion")} </dt>
                          <dd>
                            {" "}
                            {this.FechaCreacionCiudad(dataCity.createdAt)}{" "}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {" "}
                            {t("app_ciudad_modal_ver_fecha_modificacion")}{" "}
                          </dt>
                          <dd>
                            {" "}
                            {this.FechaModificacionCiudad(
                              dataCity.updatedAt
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
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" /> {t("app_ciudad_modal_ver_cerrar")}{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewCiudad.propTypes = {
  modalview: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired,
};

export default ModalViewCiudad;
