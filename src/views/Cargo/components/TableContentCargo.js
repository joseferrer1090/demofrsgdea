import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalView from "./ViewCargoModal";
import ModalEdit from "./ModalEditCargo";
import ModalDel from "./ModalDeleteCargo";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import "./../../../css/styleTableCargo.css";

class TableContentCargo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaledit: false,
      modaldelete: false,
      dataCharge: []
    };
  }

  componentDidMount() {
    // this.getDataCharge();
  }

  getDataCharge = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/charge/`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + window.btoa("sgdea:123456"),
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setSta({
          dataCharge: data
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  CargoStatus = (cell, row) => {
    let status;
    if (row.status === 1) {
      status = <b className="text-success">ACTIVO</b>;
    } else if (row.status === false) {
      status = <b className="text-danger">INACTIVO</b>;
    }
    return status;
  };

  accionesCargo(cell, row) {
    return (
      <div
        className="table-actionMenuCargo"
        style={{ textAlign: "center", padding: "0", marginRight: "105px" }}
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
  }

  openModalView(id) {
    this.refs.child1.toggle(id);
  }

  openModalEdit() {
    this.refs.child2.toggle();
  }

  openModalDelete() {
    this.refs.child3.toggle();
  }

  render() {
    const data = this.state.dataCharge;
    return (
      <div className="animated fadeIn">
        <Col md="12">
          <BootstrapTable
            striped
            hover
            search
            searchPlaceholder="Buscar"
            data={data}
            exportCSV
            pagination
            bordered={false}
            className="tableCargo texto-Cargo"
            // headerStyle={{ height: "55px" }}
          >
            <TableHeaderColumn
              dataAlign="center"
              dataField={"id"}
              isKey
              width={50}
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              dataAlign="center"
              dataField="codigo"
              width={100}
            >
              {" "}
              Código{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataAlign="center"
              dataField="nombre"
              width={"100"}
            >
              Nombre
            </TableHeaderColumn>

            <TableHeaderColumn
              dataAlign="center"
              dataField="descripcion"
              width={200}
            >
              {" "}
              Descripción{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataAlign="center"
              dataField="estado"
              dataFormat={(cell, row) => this.CargoStatus(cell, row)}
              width="100"
            >
              {" "}
              Estado{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"200"}
              export={false}
              dataAlign="center"
              dataFormat={(cell, row) => this.accionesCargo(cell, row)}
            >
              {" "}
              Acciones{" "}
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>
        <ModalView modalviewcargo={this.state.modalview} ref="child1" />
        <ModalEdit modaleditcargo={this.state.modaledit} ref="child2" />
        <ModalDel modaldelete={this.state.modaldelete} ref="child3" />
      </div>
    );
  }
}

export default TableContentCargo;
