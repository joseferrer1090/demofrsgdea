import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from "reactstrap";
import PropTypes from "prop-types";
import IMGCARGO from "./../../../assets/img/employee.svg";
import moment from "moment";
import { CHARGE } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalViewCargo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewcargo,
      id: this.props.id,
      datCharge: {},
      collapase: false,
      t: this.props.t,
      auth: this.props.authorization,
      username: ""
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    this.getDataCargoById(id);
  };

  toggleCollapse = () => {
    this.setState({
      collapase: !this.state.collapase
    });
  };

  getDataCargoById = id => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${CHARGE}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          datCharge: data
        });
      })
      .catch("Error", console.log("Error", Error));
  };
  FechaCreacionCargo(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("YYYY-MM-DD, h:mm:ss a");
  }
  FechaModificacionCargo(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("YYYY-MM-DD, h:mm:ss a");
  }

  render() {
    const statusCharge = data => {
      const { t } = this.props;
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
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader>
          {" "}
          {t("app_cargo_modal_ver_titulo")} {this.state.datCharge.name}{" "}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="3">
              <img src={IMGCARGO} className="img-thumbnail" />
            </Col>
            <Col sm="9">
              <div className="">
                {" "}
                <h5 className="" style={{ borderBottom: "1px solid black" }}>
                  {" "}
                  {t("app_cargo_modal_ver_titulo_2")}{" "}
                </h5>{" "}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> {t("app_cargo_modal_ver_codigo")} </dt>
                      <dd> {this.state.datCharge.code} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> {t("app_cargo_modal_ver_nombre")} </dt>
                      <dd> {this.state.datCharge.name} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> {t("app_cargo_modal_ver_descripcion")} </dt>
                      <dd> {this.state.datCharge.description} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> {t("app_cargo_modal_ver_estado")} </dt>
                      <dd> {statusCharge(this.state.datCharge.status)} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> {t("app_cargo_modal_ver_fecha_creacion")} </dt>
                      <dd>
                        {this.FechaCreacionCargo(
                          this.state.datCharge.createdAt
                        )}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> {t("app_cargo_modal_ver_fecha_modificacion")} </dt>
                      <dd>
                        {this.FechaModificacionCargo(
                          this.state.datCharge.updatedAt
                        )}{" "}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
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
            <i className="fa fa-times" />{" "}
            {t("app_cargo_modal_ver_button_cerrar")}{" "}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalViewCargo.propTypes = {
  modalviewcargo: PropTypes.bool.isRequired,
  t: PropTypes.any,
  id: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired
};

export default ModalViewCargo;
