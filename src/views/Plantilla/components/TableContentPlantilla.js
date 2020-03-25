import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import ModalDelete from "./ModalDeletePlantilla";
import ModalView from "./ModalViewPlantilla";
import ModalViewPlantilla from "./ModalViewPlantilla";
import { TEMPLATE_ALL } from "./../../../services/EndPoints";
import moment from "moment";

class TableContentPlantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modaldelete: false,
      modalview_: false,
      token: this.props.authorization,
      dataTemplate: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.token) {
      return {
        token: props.authorization
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        token: this.props.authorization
      });
      this.getDataTemplates();
    }
    return null;
  }

  getDataTemplates = () => {
    const auth = this.state.token;
    fetch(`${TEMPLATE_ALL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth
      }
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          dataTemplate: data
        });
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
  };

  accionesPlnatilla = (cel, row) => {
    return (
      <div
        className="table-actionMenuGUsu"
        style={{ textAlign: "center", padding: "0", marginRight: "5%" }}
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
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openViewAddIndexes();
          }}
        >
          <i className="fa fa-address-card-o " />
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

  estadoPlantilla(cell, row) {
    let status;
    if (row.status === 1) {
      status = <p className="text-success"> Activo </p>;
    } else if (row.status === 0) {
      status = <p className="text-danger"> Inactivo </p>;
    }
    return status;
  }

  openModalDelete() {
    this.refs.child3.toggle();
  }

  openModalEdit() {
    let path = `/#/configuracion/plantilla/edit`;
    window.location.replace(path);
  }

  openViewAddIndexes() {
    let path = `/#/configuracion/plantilla/addindexes`;
    window.location.replace(path);
  }

  openModalView() {
    this.refs.child1.toggle();
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  FechaCreacionConglomerado(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12">
            <BootstrapTable
              data={this.state.dataTemplate}
              bordered={false}
              hover
              striped
              search
              searchPlaceholder="Buscar"
              exportCSV
              pagination
              className=""
            >
              <TableHeaderColumn
                isKey
                dataField="id"
                dataAlign="center"
                dataFormat={this.indexN}
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
                dataField="status"
                dataAlign="center"
                dataFormat={(cell, row) => this.estadoPlantilla(cell, row)}
              >
                {" "}
                Estado{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataAlign="center"
                dataField="createdAt"
                dataFormat={(cell, row) =>
                  this.FechaCreacionConglomerado(cell, row)
                }
              >
                Fecha creaciòn
              </TableHeaderColumn>
              <TableHeaderColumn
                dataAlign="center"
                dataField="updatedAt"
                dataFormat={(cell, row) =>
                  this.FechaCreacionConglomerado(cell, row)
                }
              >
                Fecha de modificaciòn
              </TableHeaderColumn>
              <TableHeaderColumn
                export={false}
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesPlnatilla(cell, row)}
              >
                {" "}
                Acciones{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalViewPlantilla modalview={this.state.modalview_} ref={"child1"} />
        <ModalDelete modaldelete={this.state.modaldelete} ref={"child3"} />
      </div>
    );
  }
}

TableContentPlantilla.propTypes = {};

export default TableContentPlantilla;
