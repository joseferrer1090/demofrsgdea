import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalView from "./ModalViewConglomerado";
import ModalDelete from "./ModalDeleteConglomerado";
import ModalEdit from "./ModalEditConglomerado";
import ModalCustom from "./../customcomponent/CustomModalTable";
import ModalCustom2 from "./../customcomponent/CustomModalTable2";

import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import "./../../../css/table_data.css";

const data = [
  {
    id: 1,
    codigo: "CG1",
    nombre: "Conglomerado1",
    descripcion: "descripcion del conglomerado"
  },
  {
    id: 2,
    codigo: "CG2",
    nombre: "Conglomerado 2",
    descripcion: "descripcion del conglomerado"
  },
  {
    id: 3,
    codigo: "CG3",
    nombre: "Conglomerado 3",
    descripcion: "descripcion del conglomerado"
  }
];

class TableContentConglomerado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      modalDelete: false,
      modalEdit: false,
      modalCustom: false,
      modalCustom2: false
    };
  }

  accionesConglomerado(cell, row) {
    return (
      <div
        className="table-menu"
        style={{ textAlign: "center", padding: "0", marginRight: "100px" }}
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
  }

  createButtonCustom = props => {
    return (
      <div className="btn-group btn-group-sm">
        {props.exportCSVBtn}
        &nbsp;
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalCustom();
          }}
        >
          {" "}
          <i className="fa fa-pencil" /> Personalizar{" "}
        </button>
        &nbsp;
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalCustom2();
          }}
        >
          {" "}
          <i className="fa fa-pencil" /> Personalizar 2{" "}
        </button>
      </div>
    );
  };

  openModalView() {
    this.refs.child.toggle();
  }

  openModalDelete() {
    this.refs.child2.toggle();
  }

  openModalEdit() {
    this.refs.child3.toggle();
  }

  // Esta son los modal de personalizacion
  openModalCustom = () => {
    this.refs.child4.toggle();
  };

  openModalCustom2 = () => {
    this.refs.child5.toggle();
  };
  //

  render() {
    const options = {
      btnGroup: this.createButtonCustom
    };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <div className="table-reponsive">
              <Row>
                <Col md="12">
                  <BootstrapTable
                    options={options}
                    data={data}
                    pagination={true}
                    search={true}
                    exportCSV
                    hover
                    bordered={false}
                    searchPlaceholder="Buscar"
                    className="texto-small"
                  >
                    <TableHeaderColumn
                      dataSort={true}
                      isKey
                      dataField={"id"}
                      width={"60"}
                      dataAlign="center"
                    >
                      #
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataSort={true}
                      dataField={"codigo"}
                      dataAlign="center"
                    >
                      {" "}
                      Código{" "}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataSort={true}
                      dataField={"nombre"}
                      dataAlign="center"
                    >
                      Nombre
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataSort={true}
                      dataField={"descripcion"}
                      dataAlign="center"
                    >
                      Descripción
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      export={false}
                      dataAlign="center"
                      dataFormat={(cell, row) =>
                        this.accionesConglomerado(cell, row)
                      }
                      style={{ border: "none" }}
                    >
                      Acciones
                    </TableHeaderColumn>
                  </BootstrapTable>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <ModalView modalviewstate={this.state.modalView} ref="child" />
        <ModalDelete modaldeletestate={this.state.modalDelete} ref="child2" />
        <ModalEdit modaleditstate={this.state.modalEdit} ref="child3" />
        <ModalCustom modalcustom={this.state.modalCustom} ref="child4" />
        <ModalCustom2 modalcustom2={this.state.modalCustom2} ref="child5" />
      </div>
    );
  }
}

export default TableContentConglomerado;
