import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalView from "./ModalViewPais";
import ModalEdit from "./ModalEditPais";
import ModalDelete from "./ModalDeletePais";
import ModalExport from "./ModalExportCSV";
import "./../../../css/styleTablePais.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import { COUNTRIES } from "./../../../services/EndPoints";
import moment from "moment";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

class TableContentPais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalViewPais: false,
      ModalEdit: false,
      ModalDel: false,
      modalexport: false,
      dataPais: [],
      hiddenColumnID: true,
      auth: this.props.authorization,
    };
  }

  static getDerivedStaticFromProps(props, state) {
    if (props.auhorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
      });
      this.getDataPais();
    }
  }

  getDataPais = () => {
    fetch(COUNTRIES, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.props.authorization,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataPais: data,
        });
      })
      .catch((Error) => console.log(" ", Error));
  };

  EstadoPais(cell, row) {
    const { t } = this.props;
    let status;
    if (row.status === 1) {
      status = <b className="text-success">{t("app_tablas_estado_activo")}</b>;
    } else if (row.status === 0) {
      status = <b className="text-danger">{t("app_tablas_estado_inactivo")}</b>;
    }
    return status;
  }

  FechaCreacionPais(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  accionesPais(cell, row) {
    const { t } = this.props;
    return (
      <div
        className="table-actionMenuPais"
        style={{ textAlign: "center", padding: "0", marginRight: "75px" }}
      >
        <button
          title={t("app_pais_administrar_table_acciones_btn_ver")}
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
          title={t("app_pais_administrar_table_acciones_btn_editar")}
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
          title={t("app_pais_administrar_table_acciones_btn_eliminar")}
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
    // this.refs.child.toggle(id);
    this.ModalViewRef.toggle(id);
  }

  openModalEdit(id) {
    // this.refs.child3.toggle(id);
    this.ModalEditRef.toggle(id);
  }

  openModalDelete(id) {
    // this.refs.child2.toggle(id);
    this.ModalDeleteRef.toggle(id);
  }

  openModalExport = () => {
    // this.refs.child4.toggle();
    this.ModalExportRef.toggle();
  };

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  createCustomButtonGroup = (props) => {
    const { t } = this.props;
    return (
      <button
        type="button"
        className={`btn btn-secondary btn-sm`}
        onClick={() => this.openModalExport()}
      >
        <i className="fa fa-download" />{" "}
        {t("app_pais_administrar_table_button_exportar")}
      </button>
    );
  };

  render() {
    const options = {
      btnGroup: this.createCustomButtonGroup,
    };
    const { t } = this.props;
    return (
      <div className="animated fadeIn">
        <div className="col-md-12">
          <BootstrapTable
            options={options}
            striped
            exportCSV
            pagination
            search
            searchPlaceholder={t("app_pais_administrar_table_placeholder")}
            data={this.state.dataPais}
            hover
            bordered={false}
            className="tablePais texto-Pais"
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
            <TableHeaderColumn dataField="code" dataAlign="center" width={"80"}>
              {" "}
              {t("app_pais_administrar_table_codigo")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="name"
              dataAlign="center"
              width={"300"}
            >
              {" "}
              {t("app_pais_administrar_table_nombre")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataField={"createdAt"}
              dataFormat={(cell, row) => this.FechaCreacionPais(cell, row)}
              dataAlign="center"
              width={"120"}
            >
              {t("app_pais_administrar_table_fecha_creacion")}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"120"}
              dataField="status"
              dataAlign="center"
              dataFormat={(cell, row) => this.EstadoPais(cell, row)}
            >
              {" "}
              {t("app_pais_administrar_table_estado")}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"170"}
              export={false}
              dataAlign="center"
              dataFormat={(cel, row) => this.accionesPais(cel, row)}
            >
              {" "}
              {t("app_pais_administrar_table_acciones")}{" "}
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
        <ModalView
          t={this.props.t}
          modalview={this.state.ModalViewPais}
          ref={(mv) => (this.ModalViewRef = mv)}
          authorization={this.state.auth}
        />
        <ModalEdit
          t={this.props.t}
          modaledit={this.state.ModalEdit}
          updateTable={this.getDataPais}
          ref={(me) => (this.ModalEditRef = me)}
          authorization={this.state.auth}
        />
        <ModalDelete
          t={this.props.t}
          modaldel={this.state.ModalDelete}
          updateTable={this.getDataPais}
          ref={(md) => (this.ModalDeleteRef = md)}
          authorization={this.state.auth}
        />
        <ModalExport
          t={this.props.t}
          modalexport={this.state.modalexport}
          ref={(mexp) => (this.ModalExportRef = mexp)}
          authorization={this.state.auth}
        />
      </div>
    );
  }
}
TableContentPais.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired,
};

export default withTranslation("translations")(TableContentPais);
