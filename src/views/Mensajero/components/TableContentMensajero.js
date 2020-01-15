import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalViewMensajero from "./ModalViewMensajero";
import ModalUpdate from "./ModalActualizarMensajero";
import Modaldelete from "./ModalDeleteMensajero";
import ModalExport from "./ModalExportCSV";
import "./../../../css/styleTableMensajero.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import { MESSENGERS } from "./../../../services/EndPoints";
import moment from "moment";
import { withTranslation } from "react-i18next";

class TableContentMensajero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      modalUpdate: false,
      modaldelte: false,
      modalexport: false,
      dataMessengers: [],
      hiddenColumnID: true,
      auth: this.props.authorization
    };
  }

  static getDerivedStaticFromProps(props, state) {
    if (props.auhorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
      this.getDataMessenger();
    }
  }

  getDataMessenger = () => {
    fetch(MESSENGERS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataMessengers: data
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  accionesMensajero(cell, row) {
    return (
      <div className="table-actionMenuMensj" style={{ marginRight: "60px" }}>
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
            this.openModalUpdate(row.id);
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
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  }

  EstadoMensajero = (cell, row) => {
    const { t } = this.props;
    let status;
    if (row.status === 1) {
      status = <b className="text-success">{t("app_tablas_estado_activo")}</b>;
    } else if (row.status === 0) {
      status = (
        <b className="text-danger"> {t("app_tablas_estado_inactivo")} </b>
      );
    }
    return status;
  };

  FechaCreacionMensajero(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  openModalView = id => {
    this.refs.child.toggle(id);
  };

  openModalUpdate = id => {
    this.refs.child2.toggle(id);
  };

  openModalDelete = id => {
    this.refs.child3.toggle(id);
  };

  openModalExport = () => {
    this.refs.child4.toggle();
  };

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  createCustomButtonGroup = props => {
    const { t } = this.props;
    return (
      <button
        type="button"
        className={`btn btn-secondary btn-sm`}
        onClick={() => this.openModalExport()}
      >
        <i className="fa fa-download" />{" "}
        {t("app_mensajero_administrar_table_boton_exportar")}
      </button>
    );
  };

  render() {
    const options = {
      btnGroup: this.createCustomButtonGroup
    };
    const { t } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12">
            <BootstrapTable
              options={options}
              data={this.state.dataMessengers}
              bordered={false}
              hover
              striped
              pagination
              search={true}
              exportCSV
              searchPlaceholder={t(
                "app_mensajero_administrar_table_placeholder"
              )}
              className="tableMensj texto-Mensj"
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
                dataField="identification"
                dataAlign="center"
                width={"140"}
              >
                {t("app_mensajero_administrar_table_identificacion")}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="name"
                dataAlign="center"
                width={"120"}
              >
                {t("app_mensajero_administrar_table_nombre")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="description"
                dataAlign="center"
                width={"200"}
              >
                {t("app_mensajero_administrar_table_descripción")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataSort={true}
                dataField={"createdAt"}
                dataFormat={(cell, row) =>
                  this.FechaCreacionMensajero(cell, row)
                }
                dataAlign="center"
                width={"150"}
              >
                {t("app_mensajero_administrar_table_fecha_creacion")}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={"100"}
                dataField="status"
                dataAlign="center"
                dataFormat={(cell, row) => this.EstadoMensajero(cell, row)}
              >
                {" "}
                {t("app_mensajero_administrar_table_estado")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={"120"}
                export={false}
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesMensajero(cell, row)}
              >
                {" "}
                {t("app_mensajero_administrar_table_acciones")}{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalViewMensajero
          authorization={this.state.auth}
          t={this.props.t}
          modalview={this.state.modalView}
          ref={"child"}
        />
        <ModalUpdate
          authorization={this.state.auth}
          t={this.props.t}
          modalupdate={this.state.modalUpdate}
          updateTable={this.getDataMessenger}
          ref={"child2"}
        />
        <Modaldelete
          authorization={this.state.auth}
          t={this.props.t}
          modaldelete={this.state.modaldelte}
          updateTable={this.getDataMessenger}
          ref={"child3"}
        />
        <ModalExport
          authorization={this.state.auth}
          t={this.props.t}
          modalexport={this.state.modalexport}
          ref={"child4"}
        />
      </div>
    );
  }
}

TableContentMensajero.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default withTranslation("translations")(TableContentMensajero);
