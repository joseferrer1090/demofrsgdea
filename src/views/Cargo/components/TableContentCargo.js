import React, { Component } from "react";
import { Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalView from "./ViewCargoModal";
import ModalEdit from "./ModalEditCargo";
import ModalDel from "./ModalDeleteCargo";
import ModalExport from "./ModalExportCSV";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import "./../../../css/styleTableCargo.css";
import moment from "moment";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { CHARGES } from "./../../../services/EndPoints";

class TableContentCargo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaledit: false,
      modaldelete: false,
      modalexport: false,
      dataCharge: [],
      HiddenColumn: true,
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
      this.getDataCharge();
    }
  }

  getDataCharge = () => {
    fetch(CHARGES, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.props.authorization,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCharge: data
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  CargoStatus = (cell, row) => {
    const { t } = this.props;
    let status;
    if (row.status === 1) {
      status = <b className="text-success">{t("app_tablas_estado_activo")}</b>;
    } else if (row.status === 0) {
      status = <b className="text-danger">{t("app_tablas_estado_inactivo")}</b>;
    }
    return status;
  };

  FechaCreacionCargo(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  accionesCargo(cell, row) {
    return (
      <div
        className="table-actionMenuCargo"
        style={{ textAlign: "center", padding: "0", marginRight: "45px" }}
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

  openModalView(id) {
    this.refs.child1.toggle(id);
  }

  openModalEdit(id) {
    this.refs.child2.toggle(id);
  }

  openModalDelete(id) {
    this.refs.child3.toggle(id);
  }

  openModalExport() {
    this.refs.child4.toggle();
  }

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
        {t("app_cargo_administrar_table_button_exportar")}
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
        <Col md="12">
          <BootstrapTable
            options={options}
            striped
            hover
            search
            searchPlaceholder={t("app_cargo_administrar_table_placeholder")}
            data={this.state.dataCharge}
            exportCSV
            pagination
            bordered={false}
            className="tableCargo texto-Cargo"
          >
            <TableHeaderColumn
              dataAlign="center"
              dataField={"id"}
              isKey
              width={50}
              hidden={this.state.HiddenColumn}
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              dataAlign="center"
              dataField={"id"}
              dataFormat={this.indexN}
              width={50}
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn dataAlign="center" dataField="code" width={120}>
              {" "}
              {t("app_cargo_administrar_table_codigo")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataAlign="center"
              dataField="name"
              width={"230"}
            >
              {t("app_cargo_administrar_table_nombre")}
            </TableHeaderColumn>

            <TableHeaderColumn
              dataAlign="center"
              dataField="description"
              width={"200"}
            >
              {" "}
              {t("app_cargo_administrar_table_descripcion")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataField={"createdAt"}
              dataFormat={(cell, row) => this.FechaCreacionCargo(cell, row)}
              dataAlign="center"
              width={"170"}
            >
              {t("app_cargo_administrar_table_fecha_creacion")}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataAlign="center"
              dataField="status"
              dataFormat={(cell, row) => this.CargoStatus(cell, row)}
              width="100"
            >
              {" "}
              {t("app_cargo_administrar_table_estado")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              export={false}
              dataAlign="center"
              dataFormat={(cell, row) => this.accionesCargo(cell, row)}
            >
              {" "}
              {t("app_cargo_administrar_table_acciones")}{" "}
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>
        <ModalView
          dalView
          t={t}
          modalviewcargo={this.state.modalview}
          authorization={this.state.auth}
          ref="child1"
        />
        <ModalEdit
          t={this.props.t}
          modaleditcargo={this.state.modaledit}
          updateTable={this.getDataCharge}
          authorization={this.state.auth}
          ref="child2"
        />
        <ModalDel
          t={this.props.t}
          modaldelete={this.state.modaldelete}
          updateTable={this.getDataCharge}
          authorization={this.state.auth}
          ref="child3"
        />
        <ModalExport
          authorization={this.state.auth}
          t={this.props.t}
          modalexport={this.state.modalexport}
          ref="child4"
        />
      </div>
    );
  }
}
TableContentCargo.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default withTranslation("translations")(TableContentCargo);
