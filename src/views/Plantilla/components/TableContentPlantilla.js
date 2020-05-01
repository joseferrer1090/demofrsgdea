import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import ModalDelete from "./ModalDeletePlantilla";
import ModalView from "./ModalViewPlantilla";
import ModalEdit from "./ModalEditPlantilla";
import ModalViewPlantilla from "./ModalViewPlantilla";
import ModalExport from "./ModalExportData";
import { TEMPLATE_ALL } from "./../../../services/EndPoints";
import moment from "moment";
import { withTranslation } from "react-i18next";

class TableContentPlantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modaldelete: false,
      modalview_: false,
      modaledit: false,
      modalexport: false,
      token: this.props.authorization,
      dataTemplate: [],
      id: "",
      t: this.props.t,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.token) {
      return {
        token: props.authorization,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        token: this.props.authorization,
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
        authorization: "Bearer " + auth,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          dataTemplate: data,
        });
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
  };

  accionesPlnatilla = (cel, row) => {
    const { t } = this.state;
    return (
      <div
        className="table-actionMenuGUsu"
        style={{ textAlign: "center", padding: "0", marginRight: "30px" }}
      >
        <button
          title={t("app_plantilla_administrar_table_acciones_btn_ver")}
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.setState({
              id: row.id,
            });
            this.openModalView(row.id);
          }}
        >
          {" "}
          <i className="fa fa-eye" />{" "}
        </button>
        &nbsp;
        <button
          title={t("app_plantilla_administrar_table_acciones_btn_editar")}
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.setState({
              id: row.id,
            });
            this.openModalEdit();
          }}
        >
          <i className="fa fa-pencil" />
        </button>
        &nbsp;
        <button
          title={t("app_plantilla_administrar_table_acciones_btn_metadatos")}
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openViewAddIndexes(row.id);
          }}
        >
          <i className="fa fa-address-card-o " />
        </button>
        &nbsp;
        <button
          title={t("app_plantilla_administrar_table_acciones_btn_eliminar")}
          className="btn btn-danger btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.setState({
              id: row.id,
            });
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
    const { t } = this.state;
    if (row.status === 1) {
      status = (
        <p className="text-success">
          {" "}
          <b>{t("app_tablas_estado_activo")}</b>{" "}
        </p>
      );
    } else if (row.status === 0) {
      status = (
        <p className="text-danger">
          {" "}
          <b>{t("app_tablas_estado_inactivo")}</b>{" "}
        </p>
      );
    }
    return status;
  }

  openModalDelete() {
    this.modalDeleteRef.toggle();
  }
  x;
  openModalEdit() {
    this.modalEditRef.toggle();
    //let path = `/#/configuracion/plantilla/edit`;
    //window.location.replace(path);
  }

  openViewAddIndexes(id) {
    let path = `/#/configuracion/plantilla/addindexes/${id}`;
    window.location.replace(path);
  }

  openModalView(id) {
    this.refs.child1.toggle(id);
  }

  openModalExport() {
    this.modalExport.toggle();
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  FechaPlantilla(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  createCustomButtonGroup = (props) => {
    const { t } = this.state;
    return (
      <button
        type="button"
        className={`btn btn-secondary btn-sm`}
        onClick={() => this.openModalExport()}
      >
        <i className="fa fa-download" />{" "}
        {t("app_plantilla_administrar_btn_exportar")}
      </button>
    );
  };

  render() {
    const options = {
      btnGroup: this.createCustomButtonGroup,
      pagination: true,
      exportCSV: true,
    };
    const { t } = this.state;
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
              searchPlaceholder={t(
                "app_plantilla_administrar_placeholder_search"
              )}
              pagination
              className=""
              options={options}
            >
              <TableHeaderColumn
                isKey
                dataField="id"
                dataAlign="center"
                dataFormat={this.indexN}
                width={"50"}
              >
                {" "}
                #{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="code"
                dataAlign="center"
                width={"100"}
              >
                {" "}
                {t("app_plantilla_administrar_table_codigo")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="name"
                dataAlign="center"
                width={"300"}
              >
                {" "}
                {t("app_plantilla_administrar_table_nombre")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={"100"}
                dataField="status"
                dataAlign="center"
                dataFormat={(cell, row) => this.estadoPlantilla(cell, row)}
              >
                {" "}
                {t("app_plantilla_administrar_table_estado")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataAlign="center"
                dataField="createdAt"
                dataFormat={(cell, row) => this.FechaPlantilla(cell, row)}
              >
                {t("app_plantilla_administrar_table_fecha_creacion")}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataAlign="center"
                dataField="updatedAt"
                dataFormat={(cell, row) => this.FechaPlantilla(cell, row)}
              >
                {t("app_plantilla_administrar_table_fecha_modificacion")}
              </TableHeaderColumn>
              <TableHeaderColumn
                export={false}
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesPlnatilla(cell, row)}
                width={"150"}
              >
                {" "}
                {t("app_plantilla_administrar_table_acciones")}{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalViewPlantilla
          modalview={this.state.modalview_}
          ref={"child1"}
          authorization={this.state.token}
          idPlantilla={this.state.id}
          t={t}
        />
        <ModalEdit
          authorization={this.state.token}
          modaledit={this.state.modaledit}
          id={this.state.id}
          ref={(modal) => (this.modalEditRef = modal)}
          updateTable={this.getDataTemplates}
          t={t}
        />
        <ModalDelete
          t={t}
          authorization={this.state.token}
          modaldelete={this.state.modaldelete}
          ref={(mdelete) => (this.modalDeleteRef = mdelete)}
          id={this.state.id}
          updateTable={this.getDataTemplates}
        />
        <ModalExport
          authorization={this.state.token}
          modalexport={this.state.modalexport}
          ref={(mexport) => (this.modalExport = mexport)}
          t={t}
        />
      </div>
    );
  }
}

TableContentPlantilla.propTypes = {
  t: PropTypes.string.isRequired,
};

export default withTranslation("translations")(TableContentPlantilla);
