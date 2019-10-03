import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalView from "./ModalViewGrupo";
import ModalDelete from "./ModalDeleteGrupo";
import ModalEdit from "./ModalEditGrupo";
import "./../../../css/styleTableGrupoUsuarios.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import moment from "moment";

class TableContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaledit: false,
      modaldelete: false,
      dataGroup: [],
      hiddenColumnID: true
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
            this.openModalView(row.id);
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
            this.openModalEdit(row.id);
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

  openModalView = id => {
    this.refs.child.toggle(id);
  };

  openModalEdit = id => {
    this.refs.child3.toggle(id);
  };

  openModalDelete = () => {
    this.refs.child2.toggle();
  };

  FechaCreacionRoles(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("YYYY-MM-DD");
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

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
              width={"10"}
              hidden={this.state.hiddenColumnID}
            >
              {" "}
              #{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="id"
              dataAlign="center"
              width={"50"}
              dataFormat={this.indexN}
            >
              #{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField="code" dataAlign="center" width={"80"}>
              {" "}
              Codigo{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="name"
              dataAlign="center"
              width={"100"}
            >
              {" "}
              Nombre{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"80"}
              dataField="estado"
              dataAlign="center"
              dataFormat={(cell, row) => this.EstadoGrupo(cell, row)}
            >
              {" "}
              Estado{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"80"}
              dataSort={true}
              dataField="createdAt"
              dataAlign="center"
              dataFormat={(cell, row) => this.FechaCreacionRoles(cell, row)}
            >
              {" "}
              Fecha de creacion{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              export={false}
              dataFormat={(cell, row) => this.accionesGrupo(cell, row)}
              dataAlign="center"
              width={"200"}
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
