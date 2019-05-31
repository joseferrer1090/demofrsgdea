import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import PropTypes from "prop-types";

class ModalAddIndexes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaladdindexes
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    return (
      <div>
        <Modal className="" isOpen={this.state.modal}>
          <ModalHeader>Nuveo indice</ModalHeader>
          <ModalBody>
            <form className="form">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Plantilla <span className="text-danger">*</span>{" "}
                    </label>
                    <dt>Nombre de la plantilla</dt>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Nombre del índice <span className="text-danger">
                        *
                      </span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>
                      {" "}
                      Tipo <span className="text-danger">*</span>{" "}
                    </label>
                    <select className="form-control form-control-sm">
                      <optgroup label="Generico">
                        <option>Consecutivo</option>
                        <option>Numerico</option>
                        <option>Alfanumerico</option>
                        <option>Fecha</option>
                        <option>Texto</option>
                        <option>Archivo</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-outline-success btn-sm">
              <i className="fa fa-plus" /> Crear nuevo indice
            </button>
            <button
              type="button"
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
      </div>
    );
  }
}

ModalAddIndexes.propTypes = {
  modaladdindexes: PropTypes.bool.isRequired
};

export default ModalAddIndexes;
