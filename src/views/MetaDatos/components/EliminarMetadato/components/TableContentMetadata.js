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
      modaldelete: false
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
          onClick={() => this.openModal(row.id)}
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
      status = <b className="text-success">Metadado Activo</b>;
    } else if (row.status === 0 || row.status === false) {
      status = <b className="text-danger"> Metadato Inactivo</b>;
    }
    return status;
  };

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
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
                  >
                    #
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField={"name"} dataSort>
                    {" "}
                    Nombre
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField={"inputType"}
                    dataAlign={"center"}
                  >
                    Tipo de metadato
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField={"description"}>
                    {" "}
                    Descripcion
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField={"status"}
                    dataAlign={"center"}
                    dataFormat={(cell, row) => this.StatusMetadata(cell, row)}
                  >
                    Estado
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataAlign={"center"}
                    dataFormat={(cell, row) =>
                      this.accionMetadataEliminer(cell, row)
                    }
                  >
                    Accion
                  </TableHeaderColumn>
                </BootstrapTable>
              </CardBody>
            </Card>
          </div>
        </div>
        <ModalDelete
          authorization={this.state.auth}
          modaldelete={this.state.modaldelete}
          ref={el => (this.myModal = el)}
        />
      </div>
    );
  }
}

TableContentMetadata.propsTypes = {};

export default TableContentMetadata;
