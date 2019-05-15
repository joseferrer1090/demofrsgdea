import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody, Card } from "reactstrap";
import PropTypes from "prop-types";

class ModalEditSedes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit,
      secuencia: 1
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
          <ModalHeader> Actualizar sede </ModalHeader>
          <ModalBody>
            <form className="form">
              <Card body>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {" "}
                        Codigo <span className="text-danger">*</span>{" "}
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {" "}
                        Nombre <span className="text-danger">*</span>{" "}
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label> Descripcion </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Conglomerado <span className="text-danger">*</span>{" "}
                      </label>
                      <select className="form-control">
                        {" "}
                        <option>Seleccione...</option>{" "}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Empresa <span className="text-danger">*</span>{" "}
                      </label>
                      <select className="form-control">
                        {" "}
                        <option>Seleccione...</option>{" "}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Prefijo de radicacion{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                            type="text"
                            className="form-control form-control-sm"
                            maxLength={"6"}
                            placeholder=" "
                          />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Secuencia de radicacion{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                            type="number"
                            className="form-control form-control-sm"
                            defaultValue={this.state.secuencia}
                            min={0}
                          />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label> Pais</label>
                      <select className="form-control">
                        {" "}
                        <option>Seleccione...</option>{" "}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label> Departamento</label>
                      <select className="form-control">
                        {" "}
                        <option>Seleccione...</option>{" "}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {" "}
                        Ciudad <span className="text-danger">*</span>{" "}
                      </label>
                      <select className="form-control">
                        {" "}
                        <option> Seleccione... </option>{" "}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Direccion <span className="text-danger">*</span>{" "}
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="from-group">
                      <label>
                        {" "}
                        Telefono <span className="text-danger">*</span>{" "}
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label> Cargo </label>
                      <select className="form-control">
                        {" "}
                        <option>Seleccione...</option>{" "}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Estado <span className="text-danger">*</span>{" "}
                      </label>
                      <select className="form-control">
                        {" "}
                        <option> Seleccione... </option>{" "}
                      </select>
                    </div>
                  </div>
                </div>
              </Card>
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

ModalEditSedes.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditSedes;
