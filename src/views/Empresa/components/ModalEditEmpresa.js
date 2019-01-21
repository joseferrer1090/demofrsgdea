import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Select from "react-select";

const dataConglomeradoExample = [
  { value: "1", label: "Conglomerado 1" },
  { value: "2", label: "Conglomerado 2" },
  { value: "3", label: "Conglomerado 3" }
];

class ModalEditEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaleditempresa,
      selectedOptionUpdateConglomerado: null
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleChangeSelectedOptionUpdateConglomerado = selectedOptionUpdateConglomerado => {
    this.setState({ selectedOptionUpdateConglomerado });
    console.log(`Option selected:`, selectedOptionUpdateConglomerado);
  };

  render() {
    const { selectedOptionUpdateConglomerado } = this.state;
    return (
      <div>
        <Modal isOpen={this.state.modal}>
          <ModalHeader> Actualizar empresa </ModalHeader>
          <ModalBody>
            <form className="form">
              <div className="table-responsive">
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td>Código</td>
                      <td>
                        {" "}
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder=""
                        />{" "}
                      </td>
                    </tr>
                    <tr>
                      <td> NIT </td>
                      <td>
                        {" "}
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder=""
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Nombre</td>
                      <td>
                        {" "}
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder=""
                        />{" "}
                      </td>
                    </tr>
                    <tr>
                      <td>Conglomerado</td>
                      <td>
                        {" "}
                        <Select
                          onChange={
                            this.handleChangeSelectedOptionUpdateConglomerado
                          }
                          value={selectedOptionUpdateConglomerado}
                          options={dataConglomeradoExample}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td> Descripción: </td>
                      <td>
                        {" "}
                        <textarea className="form-control" />{" "}
                      </td>
                    </tr>
                    <tr>
                      <td> Estado </td>
                      <td>
                        <select className="form-control">
                          <option> Activa </option>
                          <option> Desactivo </option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-outline-success">
              {" "}
              <i className="fa fa-pencil" /> Actualizar
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              <i className="fa fa-times" /> Cerrar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalEditEmpresa.propTypes = {
  modaleditempresa: PropTypes.bool.isRequired
};

export default ModalEditEmpresa;
