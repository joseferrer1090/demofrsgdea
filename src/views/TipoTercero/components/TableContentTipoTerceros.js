import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalViewTipoTercero from "./ModalViewTipoTercero";
import ModalDeleteTipoTercero from "./ModalDeleteTipoTercero";
import ModalUpdateTipoTercero from "./ModalEditTipoTercero";
import ModalExport from "./ModalExportCSV";
import { Row, Col } from "reactstrap";
import "./../../../css/styleTableTTercero.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import { TYPETHIRDPARTYS } from "./../../../services/EndPoints";
import moment from "moment";
import { withTranslation } from "react-i18next";

class TableContentTipoTerceros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      modaldelete: false,
      modaluptate: false,
      modalexport: false,
      dataTipoTercero: [],
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
      this.getDataTipoTercero();
    }
  }

  getDataTipoTercero = () => {
    fetch(TYPETHIRDPARTYS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataTipoTercero: data
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  estadoTipoTercero = (cell, row) => {
    const { t } = this.props;
    let status;
    if (row.status === 1) {
      status = (
        <b className="text-success"> {t("app_tablas_estado_activo")} </b>
      );
    } else if (row.status === 0) {
      status = (
        <b className="text-danger"> {t("app_tablas_estado_inactivo")} </b>
      );
    }
    return status;
  };

  FechaCreacionTipoTercero(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  accionesTipoTercer = (cell, row) => {
    return (
      <div
        className="table-actionMenuTTercero"
        style={{ textAlign: "center", padding: "0", marginRight: "37px" }}
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
            this.openModalEdit(row.id);
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

  openModalView(id) {
    // this.refs.child.toggle(id);
    this.ModalViewRef.toggle(id);
  }

  openModalEdit(id) {
    // this.refs.child2.toggle(id);
    this.ModalEditRef.toggle(id);
  }

  openModalDelete(id) {
    // this.refs.child3.toggle(id);
    this.ModalDeleteRef.toggle(id);
  }
  openModalExport = () => {
    // this.refs.child4.toggle();
    this.ModalExportRef.toggle();
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
        {t("app_tipoTerecero_administrar_table_button_exportar")}
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
          <Col sm={12}>
            <BootstrapTable
              options={options}
              data={this.state.dataTipoTercero}
              bordered={false}
              hover
              pagination
              search
              striped
              searchPlaceholder={t(
                "app_tipoTerecero_administrar_table_placeholder"
              )}
              exportCSV
              className="texto-TLlegada"
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
                dataField={"code"}
                dataAlign="center"
                width={"150"}
              >
                {" "}
                {t("app_tipoTerecero_administrar_table_codigo")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField={"name"}
                dataAlign="center"
                width={"230"}
              >
                {" "}
                {t("app_tipoTerecero_administrar_table_nombre")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField={"description"}
                dataAlign="center"
                width={"230"}
              >
                {" "}
                {t("app_tipoTerecero_administrar_table_descripcion")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataSort={true}
                dataField={"createdAt"}
                dataFormat={(cell, row) =>
                  this.FechaCreacionTipoTercero(cell, row)
                }
                dataAlign="center"
                width={"150"}
              >
                {t("app_tipoTerecero_administrar_table_fecha_creacion")}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField={"status"}
                dataAlign="center"
                width={"120"}
                dataFormat={(cell, row) => this.estadoTipoTercero(cell, row)}
              >
                {" "}
                {t("app_tipoTerecero_administrar_table_estado")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField={""}
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesTipoTercer(cell, row)}
              >
                {" "}
                {t("app_tipoTerecero_administrar_table_acciones")}{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalViewTipoTercero
          authorization={this.state.auth}
          t={this.props.t}
          modalview={this.state.modalView}
          ref={mv => (this.ModalViewRef = mv)}
        />
        <ModalUpdateTipoTercero
          authorization={this.state.auth}
          t={this.props.t}
          modalupdate={this.state.modaluptate}
          updateTable={this.getDataTipoTercero}
          ref={me => (this.ModalEditRef = me)}
        />
        <ModalDeleteTipoTercero
          authorization={this.state.auth}
          t={this.props.t}
          modaldelete={this.state.modaldelete}
          updateTable={this.getDataTipoTercero}
          ref={md => (this.ModalDeleteRef = md)}
        />
        <ModalExport
          authorization={this.state.auth}
          t={this.props.t}
          modalexport={this.state.modalexport}
          ref={mexp => (this.ModalExportRef = mexp)}
        />
      </div>
    );
  }
}

TableContentTipoTerceros.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default withTranslation("translations")(TableContentTipoTerceros);
