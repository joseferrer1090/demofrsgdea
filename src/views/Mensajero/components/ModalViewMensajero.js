import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col
} from "reactstrap";
import ImgMensajero from "./../../../assets/img/courier.svg";
import PropTypes from "prop-types";
import moment from "moment";
import { decode } from "jsonwebtoken";
import { MESSENGER } from "../../../services/EndPoints";

class ModalViewMensajero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      id: this.props.id,
      dataMessenger: {},
      t: this.props.t,
      username: "",
      auth: this.props.authorization
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
    this.setState(prevState => ({
      modal: !prevState.modal,
      id: id
    }));
    this.getDataMessengerById(id);
  };

  getDataMessengerById = id => {
    const auth = this.state.auth;
    const username = decode(auth);

    fetch(`${MESSENGER}/${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataMessenger: data
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  FechaCreacionMensajero(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("YYYY-MM-DD, h:mm:ss a");
  }
  FechaModificacionMensajero(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("YYYY-MM-DD, h:mm:ss a");
  }

  render() {
    const { t } = this.props;

    const statusMessenger = data => {
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
    const identification = this.state.dataMessenger.identification;
    const name = this.state.dataMessenger.name;
    const description = this.state.dataMessenger.description;
    const status = this.state.dataMessenger.status;
    const createdAt = this.state.dataMessenger.createdAt;
    const updatedAt = this.state.dataMessenger.updatedAt;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_mensajero_modal_ver_titulo")} {name}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={ImgMensajero} />
              </Col>
              <Col sm="9">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    {t("app_mensajero_modal_ver_titulo_2")}{" "}
                  </h5>{" "}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{t("app_mensajero_modal_ver_identificacion")} </dt>
                        <dd>{identification} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{t("app_mensajero_modal_ver_nombre")} </dt>
                        <dd> {name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{t("app_mensajero_modal_ver_descripcion")} </dt>
                        <dd> {description} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{t("app_mensajero_modal_ver_estado")} </dt>
                        <dd> {statusMessenger(status)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{t("app_mensajero_modal_ver_fecha_creacion")} </dt>
                        <dd> {this.FechaCreacionMensajero(createdAt)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {t("app_mensajero_modal_ver_fecha_modificacion")}{" "}
                        </dt>
                        <dd> {this.FechaModificacionMensajero(updatedAt)} </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
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
              {t("app_mensajero_modal_ver_cerrar")}{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewMensajero.propTypes = {
  modalview: PropTypes.bool.isRequired,
  t: PropTypes.any,
  id: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired
};

export default ModalViewMensajero;
