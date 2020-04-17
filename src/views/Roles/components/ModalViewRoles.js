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
import PropTypes from "prop-types";
import IMGROLES from "./../../../assets/img/shield.svg";
import moment from "moment";
import { ROLES_SHOW } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalViewRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewroles,
      id: this.props.id,
      data: [],
      userName: "",
      t: this.props.t,
      auth: this.props.authorization,
      spinner: true,
    };
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
    this.getInfoRoles(id);
    setTimeout(() => {
      if (this.state.spinner !== false) {
        this.setState({
          spinner: false,
        });
      }
    }, 2000);
  };
  getInfoRoles = (id) => {
    const token = this.props.authorization;
    const username = decode(token);
    fetch(`${ROLES_SHOW}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data,
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
  FechaCreacionRol(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacionRol(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }

  render() {
    const { t, authorization } = this.props;
    const statusRol = (data) => {
      let status;
      if (data === 1) {
        status = (
          <b className="text-success">{t("app_tablas_estado_activo")}</b>
        );
      } else if (data === 0) {
        status = (
          <b className="text-danger"> {t("app_tablas_estado_inactivo")}</b>
        );
      }
      return status;
    };
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader>
          {" "}
          {t("app_roles_modal_ver_titulo")} {this.state.data.name}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="3">
              <img src={IMGROLES} className="img-thumbnail" />
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
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    {t("app_roles_modal_ver_titulo_2")}{" "}
                  </h5>{" "}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> {t("app_roles_modal_ver_codigo")} </dt>
                        <dd> {this.state.data.code} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> {t("app_roles_modal_ver_nombre")} </dt>
                        <dd> {this.state.data.name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> {t("app_roles_modal_ver_descripcion")} </dt>
                        <dd> {this.state.data.description} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> {t("app_roles_modal_ver_estado")} </dt>
                        <dd> {statusRol(this.state.data.status)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> {t("app_roles_modal_ver_fecha_creacion")} </dt>
                        <dd>
                          {this.FechaCreacionRol(this.state.data.createdAt)}{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> {t("app_roles_modal_ver_fecha_modificacion")} </dt>
                        <dd>
                          {" "}
                          {this.FechaModificacionRol(
                            this.state.data.updatedAt
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
            <i className="fa fa-times" />{" "}
            {t("app_roles_modal_ver_boton_cerrar")}{" "}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalViewRoles.propTypes = {
  modalviewroles: PropTypes.bool.isRequired,
  t: PropTypes.any,
  id: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired,
};

export default ModalViewRoles;
