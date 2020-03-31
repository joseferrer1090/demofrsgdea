import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { METADATA_ALL } from "./../../../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import ModalDelete from "./ModalDeleteMetadata";

class TableContentMetadata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.authorization,
      dataMetada: [],
      hiddenColumnID: true,
      modaldelete: false,
      idMetadata: ""
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
      this.getDataMetadate();
    }
  }

  getDataMetadate = () => {
    const aux = this.state.auth;
    const user = decode(aux);
    fetch(`${METADATA_ALL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + aux
      }
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          dataMetada: data
        });
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
  };

  openModal() {
    this.myModal.toggle();
  }

  accionMetadataEliminer(cell, row) {
    return (
      <div>
        <button
          className="btn btn-danger btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModal(row.id);
            this.setState({
              idMetadata: row.id
            });
          }}
          title={"Eliminar metadata"}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  }

  StatusMetadata = (cell, row) => {
    let status;
    if (row.status === 1 || row.status === true) {
      status = <b className="text-success">Activo</b>;
    } else if (row.status === 0 || row.status === false) {
      status = <b className="text-danger">Inactivo</b>;
    }
    return status;
  };

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }
  TipoMetadato(cell, row) {
    let inputType;
    if (row.inputType === "select") {
      inputType = <span>Selección</span>;
    } else if (row.inputType === "checkbox") {
      inputType = <span>Check</span>;
    } else if (row.inputType === "radio") {
      inputType = <span>Radio</span>;
    } else if (row.inputType === "textarea") {
      inputType = <span>Párrafo</span>;
    } else if (row.inputType === "date") {
      inputType = <span>Fecha</span>;
    } else if (row.inputType === "text") {
      inputType = <span>Texto</span>;
    }
    return inputType;
  }
  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <Card>
              <CardHeader>
                <i className="fa fa-shopping-bag" /> Bolsa de metadatos
              </CardHeader>
              <CardBody>
                <BootstrapTable
                  data={this.state.dataMetada}
                  striped
                  hover
                  search
                  searchPlaceholder="Buscar metadato"
                  bordered
                  pagination
                >
                  <TableHeaderColumn
                    export={false}
                    isKey
                    dataField={"id"}
                    hidden={this.state.hiddenColumnID}
                  />
                  <TableHeaderColumn
                    dataFormat={this.indexN}
                    dataField={"id"}
                    dataAlign={"center"}
                    width={"50"}
                  >
                    #
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField={"name"} dataSort width={"250"}>
                    {" "}
                    Nombre
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField={"inputType"}
                    dataAlign={"center"}
                    width={"130"}
                    dataFormat={(cell, row) => this.TipoMetadato(cell, row)}
                  >
                    Tipo
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField={"description"} width={"270"}>
                    {" "}
                    Descripción
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField={"status"}
                    dataAlign={"center"}
                    dataFormat={(cell, row) => this.StatusMetadata(cell, row)}
                    width={"100"}
                  >
                    Estado
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataAlign={"center"}
                    dataFormat={(cell, row) =>
                      this.accionMetadataEliminer(cell, row)
                    }
                    width={"100"}
                  >
                    Acción
                  </TableHeaderColumn>
                </BootstrapTable>
              </CardBody>
            </Card>
          </div>
        </div>
        <ModalDelete
          id={this.state.idMetadata}
          authorization={this.state.auth}
          modaldelete={this.state.modaldelete}
          refreshComponent={this.getDataMetadate}
          ref={el => (this.myModal = el)}
        />
      </div>
    );
  }
}

TableContentMetadata.propsTypes = {};

export default TableContentMetadata;
