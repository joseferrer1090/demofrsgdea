import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from "reactstrap";
import IMGTRAMITE from "./../../../assets/img/folder.svg";
import moment from "moment";

class ModalViewTramite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewtramit, 
      id: this.props.id, 
      username: "jferrer", 
      dataTipoTramite: {}
    };
  }

  toggle = (id) => {
    this.setState(prevState => ({
      modal: !prevState.modal, 
      id: id
    }));
    this.getDataTipoTramiteById(id);
  };

  getDataTipoTramiteById = (id) => {
    fetch(`http://192.168.20.187:7000/api/sgdea/typeprocedure/${id}?username=${this.state.username}`, {
      method: "GET", 
      headers: {
        "Content-Type" : "application/json", 
        Authorization: "Basic " + window.btoa('sgdea:123456')
      }
    }).then(response => response.json()).then(data => {
      this.setState({
        dataTipoTramite: data
      })
    }).catch(err => console.log("Error", err));
  }

  FechaCreacionTipoTramite(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format('YYYY-MM-DD, h:mm:ss a');
  }
  FechaModificacionTipoTramite(data) {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format('YYYY-MM-DD, h:mm:ss a');
  }

  render() {
     const statusTipoTramite = data => {
      let status;
      if (data === 1) {
        status = (
          <b className="text-success">
            {' '}
           Tramite activo
          </b>
        );
      } else if (data === 0) {
        status = (
          <b className="text-danger">
            {' '}
            Tramite inactivo
          </b>
        );
      }
      return status;
    };
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Ver Tramite</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGTRAMITE} />
              </Col>
              <Col sm="9">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    Informacion básica{" "}
                  </h5>{" "}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Código </dt>
                        <dd>{this.state.dataTipoTramite.code}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Tipo de correspondencia </dt>
                        <dd> {this.state.dataTipoTramite.typeCorrespondence} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Nombre </dt>
                        <dd> {this.state.dataTipoTramite.name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Descripción </dt>
                        <dd> {this.state.dataTipoTramite.description} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Estado </dt>
                        <dd> {statusTipoTramite(this.state.dataTipoTramite.status)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Fecha de creación </dt>
                        <dd> {this.FechaCreacionTipoTramite(this.state.dataTipoTramite.createdAt)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Fecha de modificación </dt>
                        <dd>{this.FechaModificacionTipoTramite(this.state.dataTipoTramite.updatedAt)}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    Usuarios Disponibles{" "}
                  </h5>{" "}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Usuarios </dt>
                        <dd> usuarios </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Sedes </dt>
                        <dd> sedes</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Dependencias </dt>
                        <dd> dependencias </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Original </dt>
                        <dd> original </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm="4">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    Asunto{" "}
                  </h5>{" "}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Asunto </dt>
                        <dd> asunto </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm="4">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    Plantilla{" "}
                  </h5>{" "}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Usuarios </dt>
                        <dd> usuarios </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm="4">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    Workflow{" "}
                  </h5>{" "}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Usuarios </dt>
                        <dd> usuarios </dd>
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
              onClick={() => {
                this.setState({ modal: false });
              }}
              className="btn btn-secondary btn-sm"
            >
              Cerrar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewTramite.propTypes = {};

export default ModalViewTramite;
