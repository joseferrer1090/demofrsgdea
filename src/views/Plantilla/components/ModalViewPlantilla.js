import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Card,
  CardHeader,
  Collapse,
  CardBody,
} from "reactstrap";
import IMGPLANTILLA from "./../../../assets/img/puzzle-pieces.svg";
import { TEMPLATE_SHOW } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import moment from "moment";

class ModalViewPlantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      collapse: false,
      id: this.props.idPlantilla,
      auth: this.props.authorization,
      dataTemplate: {},
      t: this.props.t,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
        id: props.idPlantilla,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
        id: this.props.idPlantilla,
      });
    }
  }

  getDataTemplate = (id) => {
    const { auth } = this.state;
    const username = decode(auth);
    fetch(`${TEMPLATE_SHOW}/${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        this.setState({
          dataTemplate: data,
        });
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
    // console.log({ id: id, auth: this.state.auth });
  };

  toggle = (id) => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
    this.getDataTemplate(id);
  };

  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  };

  render() {
    const { t } = this.state;
    const data = this.state.dataTemplate;
    const statusPlantilla = (data) => {
      let status;
      if (data === 1) {
        status = (
          <p className="text-success">
            <b>{t("app_plantilla_administrar_modal_ver_estado_1")}</b>
          </p>
        );
      } else if (data === 0) {
        status = (
          <p className="text-danger">
            <b>{t("app_plantilla_administrar_modal_ver_estado_0")}</b>
          </p>
        );
      }
      return status;
    };
    const fecha = (data) => {
      let date;
      date = new Date(data);
      return moment(date).format("DD-MM-YYYY, h:mm:ss a");
    };
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_plantilla_administrar_modal_ver_title")} {data.name}{" "}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGPLANTILLA} className="img-thumbnail" />
              </Col>
              <Col sm="9">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    {t("app_plantilla_administrar_modal_ver_subtile")}{" "}
                  </h5>{" "}
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {t("app_plantilla_administrar_modal_ver_codigo")}{" "}
                        </dt>
                        <dd> {data.code} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {t("app_plantilla_administrar_modal_ver_nombre")}{" "}
                        </dt>
                        <dd>{data.name}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {t("app_plantilla_administrar_modal_ver_descripcion")}{" "}
                        </dt>
                        <dd>{data.description}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {t("app_plantilla_administrar_modal_ver_estado")}{" "}
                        </dt>
                        <dd> {statusPlantilla(data.status)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {t(
                            "app_plantilla_administrar_modal_ver_fecha_creacion"
                          )}
                        </dt>
                        <dd> {fecha(data.createdAt)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {t(
                            "app_plantilla_administrar_modal_ver_fecha_modificacion"
                          )}
                        </dt>
                        <dd>{fecha(data.updatedAt)}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
              <br />

              {/* 

              Collapse más información.
              
              <Col sm="12">
                <Card>
                  <CardHeader>
                    {" "}
                    <a
                      onClick={() => {
                        this.toggleCollapse();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      Más información{" "}
                    </a>{" "}
                  </CardHeader>
                  <Collapse isOpen={this.state.collapse}>
                    <CardBody>
                      <div className="row">
                      </div>
                    </CardBody>
                  </Collapse>
                </Card>
              </Col> */}
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" />{" "}
              {t("app_plantilla_administrar_modal_ver_btn_cerrar")}{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewPlantilla.propTypes = {
  modalview: PropTypes.bool.isRequired,
};

export default ModalViewPlantilla;
