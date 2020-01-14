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
import { TYPEDOCUMENTARY_SHOW } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import TableModal from "./TableModalViewTipoDocumental";
import moment from "moment";

class ModalviewTipoDocumentoRadication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      modal: this.props.modalviewtramit,
      auth: this.props.authorization,
      data: {},
      users: []
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

  getDataById = id => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${TYPEDOCUMENTARY_SHOW}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data.typeDocumentary,
          users: data.users
        });
      })
      .catch(err => console.log(err));
  };

  toggle = id => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      id: id
    }));
    this.getDataById(id);
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
    // console.log(this.state.auth);
    // console.log(this.state.id);
    console.log(this.state.data);
    console.log(this.state.users);
    const { data } = this.state;
    const statusTipoDocumentalRadicacion = data => {
      let status;
      if (data === 1) {
        status = <b className="text-success"> Tramite activo</b>;
      } else if (data === 0) {
        status = <b className="text-danger"> Tramite inactivo</b>;
      }
      return status;
    };
    const TypeCorrespondence = data => {
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
    return (
      <div>
        <Modal className="modal-xl" isOpen={this.state.modal}>
          <ModalHeader>
            Ver tipo documental de radicacion {data.name}
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
                        <dd> {data.code} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Tipo de correspondencia </dt>
                        <dd> {TypeCorrespondence(data.TypeCorrespondence)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Nombre </dt>
                        <dd> {data.name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Descripción </dt>
                        <dd> {data.description} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Estado </dt>
                        <dd> {statusTipoDocumentalRadicacion(data.status)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Fecha de creación </dt>
                        <dd>
                          {" "}
                          {this.FechaCreacionTipoTramite(data.createdAt)}{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Fecha de modificación </dt>
                        <dd>
                          {" "}
                          {this.FechaModificacionTipoTramite(
                            data.updatedAt
                          )}{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Asunto </dt>
                        <dd> {data.issue} </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <br />
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
                  <TableModal data={this.state.users} />
                </div>
              </Col>
              {/* <Col sm="4">
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
              </Col> */}
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
              <i className="fa fa-times" /> Cerrar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalviewTipoDocumentoRadication.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default ModalviewTipoDocumentoRadication;
