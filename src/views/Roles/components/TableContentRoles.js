import React, { Component } from "react";
import data from "./../../../data/data";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalView from "./ModalViewRoles";
import ModalDelete from "./ModalDeleteRoles";
import ModalEdit from "./ModalEditRoles";
import ModalPermission from "./ModalEditPermissionRoles";
import "../../../css/styleTableRoles.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import moment from "moment";

class TableContentRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaldel: false,
      modaledit: false,
      modalpermission: false,
      data: this.props.data,
      dataRoles: [],
      hiddenColumnID: true
    };
  }

  componentDidMount() {
    this.getDataRoles();
  }

  getDataRoles = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/role`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataRoles: data
        });
        console.log(this.state.dataRoles);
      })
      .catch(err => console.log("Error", err));
  };

  EstadoRoles(cell, row) {
    let status;
    if (row.status === 1) {
      status = <p className="text-success"> Activo </p>;
    } else if (row.status !== 1) {
      status = <p className="text-danger"> Inactivo </p>;
    }
    return status;
  }
  FechaCreacionRoles(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("YYYY-MM-DD");
  }

  accionesRoles(cel, row) {
    return (
      <div
        className="table-actionMenuRP"
        style={{ textAlign: "center", padding: "0", marginRight: "100px" }}
      >
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalView(row.id);
          }}
        >
          <i className="fa fa-eye" />
        </button>
        &nbsp;
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalEdit();
          }}
        >
          <i className="fa fa-pencil" />
        </button>
        &nbsp;
        <button
          className="btn btn-warning btn-sm"
          onClick={() => {
            this.openModalPermission();
          }}
        >
          <i className="fa fa-lock" />
        </button>
        &nbsp;
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            this.openModalDel();
          }}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  }

  openModalView(id) {
    this.refs.child.toggle(id);
  }

  openModalDel() {
    this.refs.child3.toggle();
  }

  openModalEdit() {
    this.refs.child2.toggle();
  }

  openModalPermission() {
    this.refs.child4.toggle();
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  render() {
    console.log(this.state.data);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <div className="col-md-12">
              <BootstrapTable
                data={this.state.dataRoles}
                search
                searchPlaceholder="Buscar"
                pagination
                bordered={false}
                hover
                striped
                exportCSV
                className="tableRP texto-RP"
              >
                <TableHeaderColumn
                  dataSort={true}
                  isKey
                  dataField="id"
                  dataAlign="center"
                  width={"20"}
                  hidden={this.state.hiddenColumnID}
                >
                  #
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataSort={true}
                  dataFormat={this.indexN}
                  dataField="id"
                  dataAlign="center"
                  width={"20"}
                >
                  #
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataSort={true}
                  dataField="code"
                  dataAlign="center"
                  width={"50"}
                >
                  Código
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataSort={true}
                  dataField="name"
                  dataAlign="center"
                  width={"80"}
                >
                  {" "}
                  Nombre{" "}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataSort={true}
                  dataField="description"
                  dataAlign="center"
                  width={"80"}
                >
                  {" "}
                  Descripción{" "}
                </TableHeaderColumn>
                <TableHeaderColumn
                  width={"50"}
                  dataSort={true}
                  dataField="status"
                  dataAlign="center"
                  dataFormat={(cell, row) => this.EstadoRoles(cell, row)}
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
                  width={"200"}
                  export={false}
                  dataAlign="center"
                  dataFormat={(cell, row) => this.accionesRoles(cell, row)}
                >
                  {" "}
                  Acciones{" "}
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </Col>
        </Row>

        <ModalView modalviewroles={this.state.modalview} ref="child" />
        <ModalEdit modaledit={this.state.modaledit} ref="child2" />
        <ModalDelete modaldelete={this.state.modaldel} ref="child3" />
        <ModalPermission
          datamodal={this.state.data}
          modaleditpermission={this.state.modalpermission}
          ref="child4"
        />
      </div>
    );
  }
}

export default TableContentRoles;
