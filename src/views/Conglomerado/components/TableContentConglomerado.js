import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col, Button } from "reactstrap";
import ModalView from "./ModalViewConglomerado";
import ModalDelete from "./ModalDeleteConglomerado";
import ModalEdit from "./ModalEditConglomerado";
import ModalCustom from "./../customcomponent/CustomModalTable";
import ModalCustom2 from "./../customcomponent/CustomModalTable2";
import "./../../../css/styleTableConglomerado.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import {
  CONGLOMERATES,
  CONGLOMERATE_EXPORT
} from "./../../../services/EndPoints";

class TableContentConglomerado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      modalDelete: false,
      modalEdit: false,
      modalCustom: false,
      modalCustom2: false,
      dataConglomerates: [],
      hiddenColumnID: true
    };
  }

  componentDidMount() {
    this.getDataConglomerates();
  }

  getDataConglomerates = () => {
    fetch(CONGLOMERATES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataConglomerates: data
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  accionesConglomerado(cell, row) {
    return (
      <div
        className="table-actionMenuConglo"
        style={{ textAlign: "center", padding: "0", marginRight: "100px" }}
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
  }

  estadoConglomeraro(cell, row) {
    let status;
    if (row.status === 1) {
      status = <p className="text-success">Activo</p>;
    } else if (row.status === 0) {
      status = <p className="text-danger">Inactivo</p>;
    }
    return status;
  }

  openModalView(id) {
    this.refs.child.toggle(id);
  }

  openModalDelete() {
    this.refs.child2.toggle();
  }

  openModalEdit(id) {
    this.refs.child3.toggle(id);
  }

  // Esta son los modal de personalizacion
  openModalCustom = () => {
    this.refs.child4.toggle();
  };

  openModalCustom2 = () => {
    this.refs.child5.toggle();
  };

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  getExportDocument = () => {
    fetch(CONGLOMERATE_EXPORT, {
      method: "GET",
      headers: {
        Authorization: "BASIC " + window.btoa("sgdea:123456")
      }
    }).then(response => {
      if (response.ok) {
        console.log("descargo el documento");
      } else {
        console.log("revisar el network");
      }
    });
  };

  // createButtonCustom = props => {
  //   return (
  //     <Button
  //       href={` http://192.168.10.180:7000/api/sgdea/conglomerate/export/jferrer`}
  //       className={`btn btn-secondary btn-sm`}
  //     >
  //       <i className="fa fa-cloud-download" /> Exportar
  //     </Button>
  //   );
  // };

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
                    data={this.state.dataConglomerates}
                    pagination
                    search={true}
                    exportCSV
                    hover
                    striped
                    bordered={false}
                    searchPlaceholder="Buscar"
                    className="tableConglo tableConglo1 texto-Conglo actionMenuConglo"
                  >
                    <TableHeaderColumn
                      export={false}
                      isKey
                      dataField={"id"}
                      hidden={this.state.hiddenColumnID}
                    />
                    <TableHeaderColumn
                      dataSort={true}
                      dataFormat={this.indexN}
                      width={"50"}
                      dataField={"id"}
                      dataAlign="center"
                    >
                      #
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataSort={true}
                      dataField={"code"}
                      dataAlign="center"
                      width={"150"}
                    >
                      {" "}
                      Código{" "}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataSort={true}
                      dataField={"name"}
                      dataAlign="center"
                      width={"205"}
                    >
                      Nombre
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataSort={true}
                      dataField={"description"}
                      dataAlign="center"
                      width={"230"}
                    >
                      Descripción
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      width={""}
                      dataField={"status"}
                      dataSort={true}
                      dataAlign={"center"}
                      dataFormat={(cell, row) =>
                        this.estadoConglomeraro(cell, row)
                      }
                    >
                      Estado
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      width={"256"}
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
