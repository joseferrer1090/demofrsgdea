import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  BootstrapTable,
  TableHeaderColumn,
  SearchField
} from "react-bootstrap-table";
import { Row, Col, Button, ButtonGroup } from "reactstrap";
import ModalView from "./ModalViewConglomerado";
import ModalDelete from "./ModalDeleteConglomerado";
import ModalEdit from "./ModalEditConglomerado";
import ModalExport from "./ModalExportCSV";
import "./../../../css/styleTableConglomerado.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import {
  CONGLOMERATES,
  CONGLOMERATE_EXPORT
} from "./../../../services/EndPoints";
import { withTranslation } from "react-i18next";
import moment from "moment";

class TableContentConglomerado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      modalDelete: false,
      modalEdit: false,
      modalexport: false,
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
            this.openModalDelete(row.id);
          }}
        >
          {" "}
          <i className="fa fa-trash" />{" "}
        </button>
      </div>
    );
  }

  EstadoConglomerado(cell, row) {
    let status;
    if (row.status === 1) {
      status = <b className="text-success">Activo</b>;
    } else if (row.status === 0) {
      status = <b className="text-danger">Inactivo</b>;
    }
    return status;
  }

  FechaCreacionConglomerado(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("YYYY-MM-DD");
  }

  openModalView(id) {
    this.refs.child.toggle(id);
  }

  openModalDelete(id) {
    this.refs.child2.toggle(id);
  }

  openModalEdit(id) {
    this.refs.child3.toggle(id);
  }

  openModalExport = () => {
    this.refs.child4.toggle();
  };

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  // getExportDocument = () => {
  //   fetch(CONGLOMERATE_EXPORT, {
  //     method: "GET",
  //     headers: {
  //       Authorization: "BASIC " + window.btoa("sgdea:123456")
  //     }
  //   }).then(response => {
  //     if (response.ok) {
  //       console.log("descargo el documento");
  //     } else {
  //       console.log("revisar el network");
  //     }
  //   });
  // };

  createCustomButtonGroup = props => {
    return (
      <button
        type="button"
        className={`btn btn-secondary btn-sm`}
        onClick={() => this.openModalExport()}
      >
        <i className="fa fa-download" />{" "}
        {this.props.t("app_conglomerado_administrar_button_exportar")}
      </button>
    );
  };

  render() {
    const options = {
      btnGroup: this.createCustomButtonGroup,
      pagination: true,
      exportCSV: true
    };
    const { t } = this.props;

    const placeholder = t => {
      return t("app_conglomrado_administrar_table_placeholder");
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
                    search
                    hover
                    striped
                    bordered={false}
                    searchPlaceholder={placeholder(t)}
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
                      width={"100"}
                    >
                      {" "}
                      {t("app_conglomerado_administrar_table_codigo")}{" "}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataSort={true}
                      dataField={"name"}
                      dataAlign="center"
                      width={"205"}
                    >
                      {t("app_conglomerado_administrar_table_nombre")}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataSort={true}
                      dataField={"description"}
                      dataAlign="center"
                      width={"230"}
                    >
                      {t("app_conglomerado_administrar_table_descripcion")}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataSort={true}
                      dataField={"createdAt"}
                      dataFormat={(cell, row) =>
                        this.FechaCreacionConglomerado(cell, row)
                      }
                      dataAlign="center"
                      width={"150"}
                    >
                      Fecha de creación
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      width={""}
                      dataField={"status"}
                      dataSort={true}
                      dataAlign={"center"}
                      dataFormat={(cell, row) =>
                        this.EstadoConglomerado(cell, row)
                      }
                    >
                      {t("app_conglomerado_administrar_table_estado")}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      width={"200"}
                      export={false}
                      dataAlign="center"
                      dataFormat={(cell, row) =>
                        this.accionesConglomerado(cell, row)
                      }
                      style={{ border: "none" }}
                    >
                      {t("app_conglomerado_administrar_table_acciones")}
                    </TableHeaderColumn>
                  </BootstrapTable>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <ModalView t={t} modalviewstate={this.state.modalView} ref="child" />
        <ModalDelete
          t={t}
          modaldeletestate={this.state.modalDelete}
          ref="child2"
        />
        <ModalEdit t={t} modaleditstate={this.state.modalEdit} ref="child3" />
        <ModalExport t={t} modalexport={this.state.modalexport} ref="child4" />
      </div>
    );
  }
}

export default withTranslation("translations")(TableContentConglomerado);
