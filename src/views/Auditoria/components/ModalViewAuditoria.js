import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter, ModalHeader, Row, Col, Card, CardBody, CardHeader, Collapse } from "reactstrap";
import IMGAUDITORIA from "./../../../assets/img/auditoria.svg";

class ModalViewAuditoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      collapse: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  toggleCollapse = () => {
    this.setState({
      collapase: !this.state.collapase
    });
  };

  render() {
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Detalle de la auditoría </ModalHeader>
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
            Datos{" "}
          </h5>{" "}
        </div>
        <div className="row">
        <div className="col-md-6">
            <div className="form-group">
              <dl className="param">
                <dt>Fecha de la auditoria </dt>
                <dd>fecha de la auditoria </dd>
              </dl>
            </div>
          </div>
          <div className="col-md-6">
          <div className="form-group">
            <dl className="param">
              <dt>Operación realizada</dt>
              <dd> operación realizada </dd>
            </dl>
          </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
              <dl className="param">
                <dt>Módulo</dt>
                <dd>módulo </dd>
              </dl>
            </div>
          </div>
        <div className="col-md-6">
            <div className="form-group">
              <dl className="param">
                <dt>Entidad </dt>
                <dd>entidad </dd>
              </dl>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <dl className="param">
                <dt>Acción </dt>
                <dd> acción </dd>
              </dl>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <dl className="param">
                <dt>Usuario que realizo la acción </dt>
                <dd> usuario que realizo la acción</dd>
              </dl>
            </div>
          </div>
        </div>
      </Col>
          </Row>
          <br/>
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
                Más información{" "}
              </a>{" "}
            </CardHeader>
            <Collapse isOpen={this.state.collapase}>
              <CardBody>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Valores viejos </dt>
                        <dd> valores viejos </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Valores nuevos </dt>
                        <dd> valores nuevos </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Url </dt>
                        <dd> url </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-4">
                  <div className="form-group">
                    <dl className="param">
                      <dt> Ip </dt>
                      <dd> ip </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-4">
                <div className="form-group">
                  <dl className="param">
                    <dt> Agente de usuario </dt>
                    <dd> agente de usuario </dd>
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
              className="btn btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewAuditoria.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewAuditoria;
