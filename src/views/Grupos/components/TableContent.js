import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalView from "./ModalViewGrupo";
import ModalDelete from "./ModalDeleteGrupo";
import ModalEdit from "./ModalEditGrupo";
import "./../../../css/styleTableGrupoUsuarios.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

class TableContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaledit: false,
      modaldelete: false,
      dataGroup: []
    };
  }

  componentDidMount() {
    this.getDataGroup();
  }

  getDataGroup = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/groupuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataGroup: data
        });
      })
      .catch(err => console.log("Error", err));
  };

  accionesGrupo = (cel, row) => {
    return (
      <div
        className="table-actionMenuGUsu"
        style={{ textAlign: "center", padding: "0", marginRight: "195px" }}
      >
        <button
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModalView();
          }}
        >
          {" "}
          <i className="fa fa-eye" />{" "}
        </button>
        &nbsp;
        <button
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModalEdit();
          }}
        >
          <i className="fa fa-pencil" />
        </button>
        &nbsp;
        <button
          className="btn btn-danger btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModalDelete();
          }}
        >
          {" "}
          <i className="fa fa-trash" />{" "}
        </button>
      </div>
    );
  };

  EstadoGrupo(cell, row) {
    let status;
    if (row.estado === true) {
      status = <p className="text-success"> Activo </p>;
    } else if (row.estado !== true) {
      status = <p className="text-danger"> Inactivo </p>;
    }
    return status;
  }

  openModalView = () => {
    this.refs.child.toggle();
  };

  openModalEdit = () => {
    this.refs.child3.toggle();
  };

  openModalDelete = () => {
    this.refs.child2.toggle();
  };
  render() {
    return (
      <div className="animated fadeIn">
        <Col md="12">
          <BootstrapTable
            data={this.state.dataGroup}
            bordered={false}
            hover
            striped
            search
            searchPlaceholder="Buscar"
            exportCSV
            pagination
            className="tableGUsu texto-GUsu"
          >
            <TableHeaderColumn
              isKey
              dataField="id"
              dataAlign="center"
              width={"100"}
            >
              {" "}
              #{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="code"
              dataAlign="center"
              width={"200"}
            >
              {" "}
              Codigo{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="name"
              dataAlign="center"
              width={"250"}
            >
              {" "}
              Nombre{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"200"}
              dataField="estado"
              dataAlign="center"
              dataFormat={(cell, row) => this.EstadoGrupo(cell, row)}
            >
              {" "}
              Estado{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              export={false}
              dataFormat={(cell, row) => this.accionesGrupo(cell, row)}
              dataAlign="center"
            >
              {" "}
              Acciones{" "}
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>
        <ModalView modalview={this.state.modalview} ref="child" />
        <ModalDelete modaldel={this.state.modaldelete} ref="child2" />
        <ModalEdit modaledit={this.state.modaledit} ref="child3" />
      </div>
    );
  }
}

export default TableContent;
