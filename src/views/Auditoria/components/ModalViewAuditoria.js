import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Collapse
} from "reactstrap";
import IMGAUDITORIA from "./../../../assets/img/auditoria.svg";
import moment from "moment";

class ModalViewAuditoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      t: this.props.t,
      modal: this.props.modalview,
      collapse: false,
      username: "ccuartas",
      dataModulo: {},
      dataAccion: {},
      dataEntidad: {},
      dataAudit: {}
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    fetch(
      `http://192.168.20.187:7000/api/sgdea/audit/${id}?username=${this.state.username}`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + window.btoa("sgdea:123456"),
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          dataAudit: data,
          dataModulo: data.pageAction.pageEntity.pageModule,
          dataEntidad: data.pageAction.pageEntity,
          dataAccion: data.pageAction
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  toggleCollapse = () => {
    this.setState({
      collapase: !this.state.collapase
    });
  };

  FechaAuditoria(data) {
    let date;
    date = new Date(data);
    return moment(date).format("YYYY-MM-DD, h:mm:ss a");
  }

  render() {
    const dataAudit = this.state.dataAudit;
    const dataModulo = this.state.dataModulo;
    const dataEntidad = this.state.dataEntidad;
    const dataAccion = this.state.dataAccion;
    const { t } = this.props;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> {t("app_auditoria_modal_ver_titulo")} </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGAUDITORIA} className="img-thumbnail" />
              </Col>
              <Col sm="9">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    {t("app_auditoria_modal_ver_titulo_2")}{" "}
                  </h5>{" "}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{t("app_auditoria_modal_ver_fecha_auditoria")} </dt>
                        <dd>{this.FechaAuditoria(dataAudit.date)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{t("app_auditoria_modal_ver_modulo")}</dt>
                        <dd>{dataModulo.name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{t("app_auditoria_modal_ver_entidad")} </dt>
                        <dd>{dataEntidad.name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{t("app_auditoria_modal_ver_accion")} </dt>
                        <dd> {dataAccion.name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{t("app_auditoria_modal_ver_usuario_accion")}</dt>
                        <dd> {dataAudit.username}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <br />
            <Row>
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
                      {t("app_auditoria_modal_ver_collapse")}{" "}
                    </a>{" "}
                  </CardHeader>
                  <Collapse isOpen={this.state.collapase}>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt>
                                {t("app_auditoria_modal_ver_valores_viejos")}{" "}
                              </dt>
                              <dd>
                                {" "}
                                <code>{dataAudit.valueOld} </code>
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt>
                                {" "}
                                {t(
                                  "app_auditoria_modal_ver_valores_nuevos"
                                )}{" "}
                              </dt>
                              <dd>
                                {" "}
                                <code>{dataAudit.valueNew} </code>
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt> {t("app_auditoria_modal_ver_url")} </dt>
                              <dd> {dataAudit.url}</dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt> {t("app_auditoria_modal_ver_ip")} </dt>
                              <dd> {dataAudit.ip} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt>
                                {" "}
                                {t(
                                  "app_auditoria_modal_ver_agente_usuario"
                                )}{" "}
                              </dt>
                              <dd> {dataAudit.userAgent} </dd>
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
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              <i className="fa fa-times" />{" "}
              {t("app_auditoria_modal_ver_buton_cerrar")}{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewAuditoria.propTypes = {
  modalview: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.any
};

export default ModalViewAuditoria;
