import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { decode } from "jsonwebtoken";
import { FIND_BY_METADATA_BAG_ID } from "./../../../../../services/EndPoints";

class ModalUpdateDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldetails,
      auth: this.props.authorization,
      id: this.props.id,
      data: [],
      hiddenColumnID: true
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    if (props.id !== state.id) {
      return {
        id: props.id
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    // Metodo para traer la data del array y los actualizar
    if (this.props.id !== prevProps.id) {
      this.setState({
        id: this.props.id,
        auth: this.props.authorization
      });
      this.getDataDetailsById(this.state.id, this.state.auth);
    }
  }

  getDataDetailsById = (id, auth) => {
    const aux = auth;
    fetch(`${FIND_BY_METADATA_BAG_ID}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data
        });
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
  };

  accionesDetails(cell, row) {
    return (
      <div>
        <button className="btn btn-secondary btn-sm">
          {" "}
          Actualizar registro{" "}
        </button>
        &nbsp;
        <button className="btn btn-danger btn-sm">Quitar registro</button>
      </div>
    );
  }

  createCustomButton = props => {
    return <button className="btn btn-success btn-sm">agregar detalle</button>;
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const options = {
      btnGroup: this.createCustomButton
    };
    return (
      <Modal isOpen={this.state.modal} className="modal-xl">
        <ModalHeader>
          <i className="fa fa-pencil" /> Actualizar detalles
        </ModalHeader>
        <ModalBody>
          <BootstrapTable
            data={this.state.data}
            options={options}
            bordered={false}
            striped
          >
            <TableHeaderColumn
              dataField={"id"}
              isKey
              hidden={this.state.hiddenColumnID}
            >
              id
            </TableHeaderColumn>
            <TableHeaderColumn dataField={"labelText"} dataAlign={"center"}>
              Titulo
            </TableHeaderColumn>
            <TableHeaderColumn dataField={"inputValue"} dataAlign={"center"}>
              Valor
            </TableHeaderColumn>
            <TableHeaderColumn
              dataAlign={"center"}
              dataFormat={(cell, row) => this.accionesDetails(cell, row)}
            >
              Acciones
            </TableHeaderColumn>
          </BootstrapTable>
          {/* <p>{this.state.id}</p> */}
        </ModalBody>
        <ModalFooter>
          <div className="pull-right">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              <i className="fa fa-times" /> Cerrar
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalUpdateDetails;
