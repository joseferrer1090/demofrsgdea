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
import { TYPEPROCEDURE } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import TableComponent from "./TableModalViewComponent";

class ModalViewTramite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewtramit,
      id: this.props.id,
      username: "jferrer",
      dataTipoTramite: {},
      users: [],
      auth: this.props.authorization
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    return null;
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
    this.getDataTipoTramiteById(id);
    console.log(this.state.auth);
  };

  getDataTipoTramiteById = id => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${TYPEPROCEDURE}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataTipoTramite: data.typeProcedure,
          users: data.users
        });
      })
      .catch(err => console.log("Error", err));
  };

  FechaCreacionTipoTramite(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("YYYY-MM-DD, h:mm:ss a");
  }
  FechaModificacionTipoTramite(data) {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format("YYYY-MM-DD, h:mm:ss a");
  }

  render() {
    const statusTipoTramite = data => {
      let status;
      if (data === 1) {
        status = <b className="text-success"> Tramite activo</b>;
      } else if (data === 0) {
        status = <b className="text-danger"> Tramite inactivo</b>;
      }
      return status;
    };
    const typeProcedure = data => {
      let type;
      if (data === 1) {
        type = <p>Recibida</p>;
      } else if (data === 2) {
        type = <p>Despachada</p>;
      } else if (data === 3) {
        type = <p>Interna</p>;
      }
      return type;
    };
    console.log(this.state.users);
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            Ver Tramite {this.state.dataTipoTramite.name}
          </ModalHeader>
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
                        <dd>
                          {" "}
                          {typeProcedure(
                            this.state.dataTipoTramite.typeCorrespondence
                          )}{" "}
                        </dd>
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
                        <dd>
                          {" "}
                          {statusTipoTramite(
                            this.state.dataTipoTramite.status
                          )}{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Asunto </dt>
                        <dd> {this.state.dataTipoTramite.issue}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Fecha de creación </dt>
                        <dd>
                          {" "}
                          {this.FechaCreacionTipoTramite(
                            this.state.dataTipoTramite.createdAt
                          )}{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Fecha de modificación </dt>
                        <dd>
                          {this.FechaModificacionTipoTramite(
                            this.state.dataTipoTramite.updatedAt
                          )}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <TableComponent data={this.state.users} />
              </Col>
            </Row>
            {/* <Row>
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
            </Row> */}
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              onClick={() => {
                this.setState({ modal: false });
              }}
              className="btn btn-secondary btn-sm"
            >
              <i className="fa fa-times" /> Cerrar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewTramite.propTypes = {};

export default ModalViewTramite;
