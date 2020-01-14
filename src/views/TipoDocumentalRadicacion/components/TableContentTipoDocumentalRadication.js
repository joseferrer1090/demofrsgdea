import React, { Component } from "react";
import { WithRouter } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalViewTipoDocumentalRadication from "./ModalViewTipoDocumentalRadication";
import ModalDeleteTipoDocumentalRadication from "./ModalDeleteTipoDocumentalRadication";
import ModalExport from "./ModalExport";
import ModalExportUsers from "./ModalExportTDRUser";
import PropTypes from "prop-types";
import "./../../../css/styleTableTipoDocumentalRadicacion.css";
import { TYPEDOCUMENTARY_ALL } from "./../../../services/EndPoints";

class TableContentTramite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaldel: false,
      modalexport: false,
      modalexport2: false,
      auth: this.props.authorization,
      data: [],
      hiddenColumnID: true
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
      this.setState(
        {
          auth: this.props.authorization
        },
        this.getData()
      );
    }
  }

  getData = () => {
    fetch(`${TYPEDOCUMENTARY_ALL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data
        });
      })
      .catch(err => console.log(err));
  };

  accionesTramite = (cell, row) => {
    return (
      <div
        className="table-actionMenuTLlegada"
        style={{ textAlign: "center", padding: "0", marginRight: "0px" }}
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
            this.routeChange();
          }}
        >
          <i className="fa fa-pencil" />
        </button>
        &nbsp;
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            this.openModalDelete(row.id);
          }}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  };

  estadoTipodocumentalradicacion = (cell, row) => {
    let status;
    if (row.status === 1) {
      status = <p className="text-success"> Activo </p>;
    } else if (row.status === 0) {
      status = <p className="text-danger"> Inactivo </p>;
    }
    return status;
  };

  openModalView(id) {
    this.refs.child1.toggle(id);
  }

  routeChange = () => {
    let path = `#/configuracion/tipodocumentalradication/edit`;
    window.location.replace(path);
  };

  openModalDelete(id) {
    this.refs.child2.toggle(id);
  }

  openModalExport() {
    this.refs.child3.toogle();
  }

  openModalExport2() {
    this.refs.child4.toogle();
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  createCustomButtonGroup = props => {
    return (
      <div>
        <button
          type="button"
          className={`btn btn-secondary btn-sm`}
          onClick={() => this.openModalExport()}
        >
          <i className="fa fa-download" /> Exportar
        </button>
        &nbsp;
        <button
          type="button"
          className={`btn btn-secondary btn-sm`}
          onClick={() => this.openModalExport2()}
        >
          <i className="fa fa-download" /> Exportar usuarios por tipo documental
          de radicacion
        </button>
      </div>
    );
  };

  render() {
    const { auth } = this.state;
    const options = {
      btnGroup: this.createCustomButtonGroup,
      pagination: true,
      exportCSV: true
    };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm={12}>
            <BootstrapTable
              data={this.state.data}
              bordered={false}
              hover
              pagination
              search
              striped
              searchPlaceholder="Buscar"
              exportCSV
              className="texto-TLlegada"
              options={options}
            >
              <TableHeaderColumn
                isKey
                dataField={"id"}
                width="50"
                hidden={this.state.hiddenColumnID}
              />

              <TableHeaderColumn
                dataField={"id"}
                dataFormat={this.indexN}
                width="50"
              >
                {" "}
                #{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"code"} dataAlign="center">
                {" "}
                Código{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"name"} dataAlign="center">
                {" "}
                Nombre{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"description"} dataAlign="center">
                {" "}
                Descripción{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField={"status"}
                dataAlign="center"
                dataFormat={(cell, row) =>
                  this.estadoTipodocumentalradicacion(cell, row)
                }
              >
                {" "}
                Estado{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                export={false}
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesTramite(cell, row)}
              >
                {" "}
                Acciones{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalViewTipoDocumentalRadication
          authorization={auth}
          modalviewtramit={this.state.modalview}
          ref={"child1"}
        />
        <ModalDeleteTipoDocumentalRadication
          authorization={auth}
          modaldelete={this.state.modaldel}
          updateTable={this.getData}
          ref={"child2"}
        />
        <ModalExport
          authorization={auth}
          ref={"child3"}
          modalexport={this.state.modalexport}
        />
        <ModalExportUsers
          modal={this.state.modalexport2}
          authorization={auth}
          ref={"child4"}
        />
      </div>
    );
  }
}

TableContentTramite.propTypes = {
  authorization: PropTypes.string.isRequired
};

export default TableContentTramite;
