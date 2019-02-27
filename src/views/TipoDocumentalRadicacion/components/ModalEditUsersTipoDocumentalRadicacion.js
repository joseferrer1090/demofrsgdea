import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardFooter,
  CardBody
} from "reactstrap";

class ModalEditUsersTipoDocumentalRadicacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaleditusers,
      dataOk: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { dataOk } = this.state;
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader> Actualizar asignación de usuarios </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-md-12">
              <Card>
                <CardBody>
                  <h4 className=""> Búsqueda de usuarios </h4>
                  <hr />
                  <form className="form">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
                            {" "}
                            Conglomerado <span className="text-danger">
                              *
                            </span>{" "}
                          </label>
                          <select className="form-control form-control-sm">
                            {" "}
                            <option> Seleccione... </option>{" "}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Empresa <span className="text-danger">*</span>{" "}
                          </label>
                          <select className="form-control form-control-sm">
                            {" "}
                            <option> Seleccione </option>{" "}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Sede <span className="text-danger">*</span>{" "}
                          </label>
                          <select className="form-control form-control-sm">
                            {" "}
                            <option> Seleccione </option>{" "}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Dependencia <span className="text-danger">
                              *
                            </span>{" "}
                          </label>
                          <select className="form-control form-control-sm">
                            {" "}
                            <option> Seleccione </option>{" "}
                          </select>
                        </div>
                      </div>
                    </div>
                    {dataOk ? (
                      <div className="form-group">
                        <label> Usuarios disponibles </label>
                        <textarea
                          className="form-control form-control-sm"
                          disabled
                        />
                      </div>
                    ) : null}
                  </form>
                </CardBody>
                <CardFooter>
                  <div className="float-right">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ dataOk: true });
                      }}
                    >
                      {" "}
                      <i className="fa fa-search" /> Buscar
                    </button>{" "}
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>
                  {" "}
                  Usuarios asignados <span className="text-danger">*</span>{" "}
                </label>
                <select className="form-control form-control-sm">
                  <option className=""> seleccione </option>
                </select>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-outline-success btn-sm">
            {" "}
            <i className="fa fa-pencil" /> Actualizar usuarios{" "}
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            {" "}
            <i className="fa fa-times" /> Cerrar{" "}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalEditUsersTipoDocumentalRadicacion.propTypes = {
  modaleditusers: PropTypes.bool.isRequired
};

export default ModalEditUsersTipoDocumentalRadicacion;
