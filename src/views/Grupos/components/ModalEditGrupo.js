import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter
} from "reactstrap";

class ModalEditPais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Actualizar grupo </ModalHeader>
          <ModalBody>
            <form className="form">
              <div className="container">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label> Código </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label> Nombre </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label> Estado </label>
                      <select className="form-control">
                        <option> Seleccione </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <Card>
                      <CardBody>
                        <h4 className=""> Búsqueda de usuarios </h4>
                        <hr />
                        <br />
                        <form className="form">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Empresa <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <select className="form-control">
                                  {" "}
                                  <option> Seleccione </option>{" "}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Sede <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <select className="form-control">
                                  {" "}
                                  <option> Seleccione </option>{" "}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Dependencia{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <select className="form-control">
                                  {" "}
                                  <option> Seleccione </option>{" "}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label> Usuarios disponibles </label>
                            <textarea className="form-control" disabled />
                          </div>
                        </form>
                      </CardBody>
                      <CardFooter>
                        <div className="float-right">
                          <button className="btn btn-secondary btn-sm">
                            {" "}
                            <i className="fa fa-search" /> Buscar
                          </button>{" "}
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>
                        {" "}
                        Seleccione usuario(s) asignados{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <select className="form-control">
                        {" "}
                        <option> Seleccione </option>{" "}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-outline-success">
              {" "}
              <i className="fa fa-pencil" /> Actualizar{" "}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalEditPais.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditPais;
