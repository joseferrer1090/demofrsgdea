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
      authorization:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzY2ODgwMTEsInVzZXJfbmFtZSI6ImpmZXJyZXIiLCJhdXRob3JpdGllcyI6WyJBU0lTVEVOVEUgQURNSU5JU1RSQVRJVk8iXSwianRpIjoiMzAyOGZiZmMtYWU5My00MzhhLTk5ODctMGNiMDdkODFjNGEzIiwiY2xpZW50X2lkIjoiZnJvbnRlbmRhcHAiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.EoRB0gGPH_qCxOqsFbQ2lhaVNwSjThowbPG-A4JmL7SX8FE8tdBee4_QTZ2WvlWaPVoSTJF8XmsY9V4iEB65remcBNA1WhhyUnWzNYRpsD2rs7b-G0Q8bPekLNcR4mHcnjZ78vmuGoEpSAb64EOiIwSmFFVJ8N8Uqtz1cCFAPKA-BR7lQx68nBarai-zqIQ1uV5TQldzG4Qg9NpzUdLkKTb0CGe4vCY8OepoDtBjkgQk2PuvxplzxwUq3MuyZQfkCzC0UT0e2PfglzQIeQOkeRZmaidcwPjMo9V0LENo2EebDh15p8ce2Xp6S9x7CDptmcQaA1Gml1UJt5ukM_-d3g"
    };
  }

  componentDidMount() {
    this.getDataCharge();
  }

  getDataCharge = () => {
    fetch(CHARGES, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.state.authorization,
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
    return moment(createdAt).format("YYYY-MM-DD");
  }

  accionesCargo(cell, row) {
    return (
      <div
        className="table-actionMenuCargo"
        style={{ textAlign: "center", padding: "0", marginRight: "60px" }}
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
              width={"170"}
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
              width={"140"}
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
              width={"150"}
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
          t={this.props.t}
          modalviewcargo={this.state.modalview}
          ref="child1"
        />
        <ModalEdit
          t={this.props.t}
          modaleditcargo={this.state.modaledit}
          updateTable={this.getDataCharge}
          ref="child2"
        />
        <ModalDel
          t={this.props.t}
          modaldelete={this.state.modaldelete}
          updateTable={this.getDataCharge}
          ref="child3"
        />
        <ModalExport
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
