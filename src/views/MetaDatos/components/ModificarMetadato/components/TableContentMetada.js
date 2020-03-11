import React, { Component } from "react";
import PropTypes from "prop-types";
import { METADATA_ALL } from "./../../../../../services/EndPoints";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { decode } from "jsonwebtoken";
import ModalUpdateMetadata from "./ModalUpdateMetadata";

class TableContentMetada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.authorization,
      dataMetadata: [],
      hiddenColumnID: false,
      modal: false
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
      this.getDataMetadata();
    }
  }

  getDataMetadata = () => {
    const aux = this.state.auth;
    const user = decode(aux);
    fetch(`${METADATA_ALL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + aux
      }
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          dataMetadata: data
        });
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
  };

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

  openModal() {
    this.myModal.toggle();
  }

  accionesMetadato(cell, row) {
    return (
      <div
        className="table-actionMenuConglo"
        style={{ textAlign: "center", padding: "0", marginRight: "40px" }}
      >
        <button
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModal();
          }}
        >
          <i className="fa fa-pencil" />
        </button>
        &nbsp;
      </div>
    );
  }

  render() {
    return (
      <div className="card card-body">
        <BootstrapTable
          data={this.state.dataMetadata}
          striped
          hover
          bordered={false}
          condensed={true}
          search
          searchPlaceholder="Buscar"
          pagination
        >
          <TableHeaderColumn
            export={false}
            isKey
            dataField={"id"}
            hidden={!this.state.hiddenColumnID}
          />
          <TableHeaderColumn dataFormat={this.indexN} width={50}>
            #
          </TableHeaderColumn>
          <TableHeaderColumn dataField={"name"} dataAlign={"center"} dataSort>
            Nombre
          </TableHeaderColumn>
          <TableHeaderColumn dataField={"inputType"} dataAlign={"center"}>
            Tipo metadato
          </TableHeaderColumn>
          <TableHeaderColumn dataAlign={"center"} dataField={"description"}>
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
            dataFormat={(cell, row) => this.accionesMetadato(cell, row)}
          >
            Acciones
          </TableHeaderColumn>
        </BootstrapTable>
        <ModalUpdateMetadata
          modalupdate={this.state.modal}
          ref={el => (this.myModal = el)}
        />
      </div>
    );
  }
}

TableContentMetada.propTypes = {
  authorization: PropTypes.string.isRequired
};

export default TableContentMetada;
