import React, { Component } from "react";
import { Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalView from "./ModalViewGrupo";
import ModalDelete from "./ModalDeleteGrupo";
import ModalEdit from "./ModalEditGrupo";
import ModalExport from "./ModalExportCSV";
import "./../../../css/styleTableGrupoUsuarios.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import moment from "moment";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { GROUPUSERS } from "./../../../services/EndPoints";

class TableContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaledit: false,
      modaldelete: false,
      modalexport: false,
      dataGroup: [],
      hiddenColumnID: true,
      auth: this.props.authorization,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
      });
      this.getDataGroup();
    }
  }

  // componentDidMount() {
  //   this.getDataGroup();
  // }

  getDataGroup = () => {
    fetch(`${GROUPUSERS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataGroup: data,
        });
      })
      .catch((err) => console.log("Error", err));
  };

  accionesGrupo = (cel, row) => {
    return (
      <div
        className="table-actionMenuGUsu"
        style={{ textAlign: "center", padding: "0", marginRight: "65px" }}
      >
        <button
          title="Ver grupo"
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
          title="Editar grupo"
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
          title="Eliminar grupo"
          className="btn btn-danger btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModalDelete(row.id);
          }}
        >
          {" "}
          <i className="fa fa-trash" />{" "}
        </button>
        &nbsp;
        <button
          title="Exportar"
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.opneModalExport(row.id);
          }}
        >
          {" "}
          <i className="fa fa-download" aria-hidden="true"></i>
        </button>
      </div>
    );
  };

  EstadoGrupo(cell, row) {
    const t = this.props.t;
    let status;
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

  openModalView = (id) => {
    // this.refs.child.toggle(id);
    this.ModalViewRef.toggle(id);
  };

  openModalEdit = (id) => {
    // this.refs.child3.toggle(id);
    this.ModalEditRef.toggle(id);
  };

  openModalDelete = (id) => {
    // this.refs.child2.toggle(id);
    this.ModalDeleteRef.toggle(id);
  };

  opneModalExport = (id) => {
    // this.refs.child4.toggle(id);
    this.ModalExportRef.toggle(id);
  };

  FechaCreacionRoles(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  createCustomButtonGroup = (props) => {
    const { t } = this.props;
    return (
      <button type="button" className={`btn btn-secondary btn-sm`}>
        <i className="fa fa-download" /> Exportar
      </button>
    );
  };

  render() {
    const { t } = this.props;
    const options = {
      btnGroup: this.createCustomButtonGroup,
    };
    return (
      <div className="animated fadeIn">
        <Col md="12">
          <BootstrapTable
            data={this.state.dataGroup}
            bordered={false}
            hover
            striped
            search
            searchPlaceholder={t(
              "app_grupoUsuarios_table_administrar_placeholder"
            )}
            pagination
            className="tableGUsu texto-GUsu"
            // exportCSV
          >
            <TableHeaderColumn
              isKey
              dataField="id"
              dataAlign="center"
              width={"10"}
              hidden={this.state.hiddenColumnID}
            >
              {" "}
              #{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="id"
              dataAlign="center"
              width={"50"}
              dataFormat={this.indexN}
            >
              #{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="code"
              dataAlign="center"
              width={"150"}
            >
              {" "}
              {t("app_grupoUsuarios_table_administrar_codigo")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="name"
              dataAlign="center"
              width={"300"}
            >
              {" "}
              {t("app_grupoUsuarios_table_administrar_nombre")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"150"}
              dataField="estado"
              dataAlign="center"
              dataFormat={(cell, row) => this.EstadoGrupo(cell, row)}
            >
              {" "}
              {t("app_grupoUsuarios_table_administrar_estado")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"150"}
              dataSort={true}
              dataField="createdAt"
              dataAlign="center"
              dataFormat={(cell, row) => this.FechaCreacionRoles(cell, row)}
            >
              {" "}
              {t("app_grupoUsuarios_table_administrar_fecha_creacion")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              export={false}
              dataFormat={(cell, row) => this.accionesGrupo(cell, row)}
              dataAlign="center"
              // width={"200"}
            >
              {" "}
              {t("app_grupoUsuarios_table_administrar_acciones")}{" "}
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>
        <ModalView
          authorization={this.state.auth}
          modalview={this.state.modalview}
          ref={(mv) => (this.ModalViewRef = mv)}
          t={this.props.t}
        />
        <ModalDelete
          authorization={this.state.auth}
          updateTable={this.getDataGroup}
          modaldel={this.state.modaldelete}
          ref={(md) => (this.ModalDeleteRef = md)}
          t={this.props.t}
        />
        <ModalEdit
          authorization={this.state.auth}
          updateTable={this.getDataGroup}
          modaledit={this.state.modaledit}
          ref={(me) => (this.ModalEditRef = me)}
          t={this.props.t}
        />
        <ModalExport
          authorization={this.state.auth}
          modalexport={this.state.modalexport}
          ref={(mexp) => (this.ModalExportRef = mexp)}
          t={this.props.t}
        />
      </div>
    );
  }
}
TableContent.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired,
};
export default withTranslation("translations")(TableContent);
