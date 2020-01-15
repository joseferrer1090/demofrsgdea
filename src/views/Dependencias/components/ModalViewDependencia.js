import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Collapse
} from "reactstrap";
import IMGDEPENDENCIA from "./../../../assets/img/settings-work-tool.svg";
import moment from "moment";
import { DEPENDENCE } from "../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalViewDependencia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalView,
      collapse: false,
      id: this.props.id,
      dataDependence: {},
      dataDependenceHeadquarter: {},
      dataDependenceHeadquarterCompany: {},
      dataDependenceHeadquarterCompanyConglomerate: {},
      dataDependenceCharge: {},
      t: this.props.t,
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
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${DEPENDENCE}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataDependence: data,
          dataDependenceHeadquarter: data.headquarter,
          dataDependenceHeadquarterCompany: data.headquarter.company,
          dataDependenceHeadquarterCompanyConglomerate:
            data.headquarter.company.conglomerate,
          dataDependenceCharge: data.charge
        });
      })
      .catch(Error => console.log(Error));
  };

  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };
  FechaCreacionDependencia(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacionDependencia(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  render() {
    const statusDependence = data => {
      const { t } = this.props;
      let status;
      if (data === 1) {
        return (status = (
          <b className="text-success"> {t("app_tablas_estado_activo")}</b>
        ));
      } else if (data === 0) {
        return (status = (
          <b className="text-danger">
            {" "}
            {this.orops.t("app_tablas_estado_inactivo")}{" "}
          </b>
        ));
      }
      return status;
    };
    const { t } = this.props;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_dependencia_modal_ver_titulo")}{" "}
            {this.state.dataDependence.name}{" "}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGDEPENDENCIA} className="img-thumbnail" />
              </Col>
              <Col sm="9">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    {t("app_dependencia_modal_ver_titulo_2")}{" "}
                  </h5>{" "}
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{t("app_dependencia_modal_ver_conglomerado")} </dt>
                        <dd>
                          {
                            this.state
                              .dataDependenceHeadquarterCompanyConglomerate.name
                          }
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{t("app_dependencia_modal_ver_empresa")} </dt>
                        <dd>
                          {this.state.dataDependenceHeadquarterCompany.name}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{t("app_dependencia_modal_ver_sede")} </dt>
                        <dd>{this.state.dataDependenceHeadquarter.name}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{t("app_dependencia_modal_ver_codigo")} </dt>
                        <dd>{this.state.dataDependence.code} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{t("app_dependencia_modal_ver_nombre")} </dt>
                        <dd>{this.state.dataDependence.name}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{t("app_dependencia_modal_ver_descripcion")} </dt>
                        <dd>{this.state.dataDependence.description} </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
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
                      {t("app_dependencia_modal_ver_collapse")}{" "}
                    </a>{" "}
                  </CardHeader>
                  <Collapse isOpen={this.state.collapse}>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>
                                {t(
                                  "app_dependencia_modal_ver_cargo_responsable"
                                )}{" "}
                              </dt>
                              <dd> {this.state.dataDependenceCharge.name} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>{t("app_dependencia_modal_ver_estado")} </dt>
                              <dd>
                                {statusDependence(
                                  this.state.dataDependence.status
                                )}{" "}
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>
                                {t("app_dependencia_modal_ver_fecha_creacion")}{" "}
                              </dt>
                              <dd>
                                {this.FechaCreacionDependencia(
                                  this.state.dataDependence.createdAt
                                )}{" "}
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>
                                {t(
                                  "app_dependencia_modal_ver_fecha_modificacion"
                                )}{" "}
                              </dt>
                              <dd>
                                {this.FechaModificacionDependencia(
                                  this.state.dataDependence.updatedAt
                                )}
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Collapse>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-sm btn-secondary"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              <i className="fa fa-times" />{" "}
              {t("app_dependencia_modal_ver_boton_cerrar")}{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewDependencia.propTypes = {
  modalView: PropTypes.bool.isRequired,
  t: PropTypes.any,
  id: PropTypes.string.isRequired
};

export default ModalViewDependencia;
