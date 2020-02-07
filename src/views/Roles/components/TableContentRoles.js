import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalView from "./ModalViewRoles";
import ModalDelete from "./ModalDeleteRoles";
import ModalEdit from "./ModalEditRoles";
import ModalPermission from "./ModalEditPermissionRoles";
import ModalExport from "./ModalExportCSV";
import "../../../css/styleTableRoles.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import moment from "moment";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ROLES_ALL } from "./../../../services/EndPoints";

class TableContentRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaldel: false,
      modaledit: false,
      modalpermission: false,
      modalexport: false,
      dataRoles: [],
      hiddenColumnID: true,
      t: this.props.t,
      auth: this.props.authorization
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
      this.getDataRoles();
    }
  }

  getDataRoles = () => {
    fetch(`${ROLES_ALL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataRoles: data
        });
      })
      .catch(err => console.log("Error", err));
  };

  EstadoRoles(cell, row) {
    const { t } = this.props;
    let status;
    if (row.status === 1) {
      status = (
        <p className="text-success">
          {" "}
          <b>{t("app_tablas_estado_activo")}</b>{" "}
        </p>
      );
    } else if (row.status !== 1) {
      status = (
        <p className="text-danger">
          {" "}
          <b>{t("app_tablas_estado_inactivo")}</b>{" "}
        </p>
      );
    }
    return status;
  }
  FechaCreacionRoles(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  accionesRoles(cel, row) {
    return (
      <div
        className="table-actionMenuRP"
        style={{ textAlign: "center", padding: "0", marginRight: "100px" }}
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
          className="btn btn-warning btn-sm"
          onClick={() => {
            this.openModalPermission(row.id);
          }}
        >
          <i className="fa fa-lock" />
        </button>
        &nbsp;
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            this.openModalDel(row.id);
          }}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  }

  openModalView(id) {
    this.refs.child.toggle(id);
  }

  openModalDel(id) {
    this.refs.child3.toggle(id);
  }

  openModalEdit(id) {
    this.refs.child2.toggle(id);
  }

  openModalPermission(id) {
    this.refs.child4.toggle(id);
  }

  openModalExport() {
    this.refs.child5.toggle();
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
        {t("app_roles_table_administrar_boton_exportar")}
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
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <div className="col-md-12">
              <BootstrapTable
                options={options}
                data={this.state.dataRoles}
                search
                searchPlaceholder={t("app_roles_table_administrar_placeholder")}
                pagination
                bordered={false}
                hover
                striped
                exportCSV
                className="tableRP texto-RP"
              >
                <TableHeaderColumn
                  dataSort={true}
                  isKey
                  dataField="id"
                  dataAlign="center"
                  width={"20"}
                  hidden={this.state.hiddenColumnID}
                >
                  #
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataSort={true}
                  dataFormat={this.indexN}
                  dataField="id"
                  dataAlign="center"
                  width={"20"}
                >
                  #
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataSort={true}
                  dataField="code"
                  dataAlign="center"
                  width={"50"}
                >
                  {t("app_roles_table_administrar_codigo")}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataSort={true}
                  dataField="name"
                  dataAlign="center"
                  width={"80"}
                >
                  {" "}
                  {t("app_roles_table_administrar_nombre")}{" "}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataSort={true}
                  dataField="description"
                  dataAlign="center"
                  width={"80"}
                >
                  {" "}
                  {t("app_roles_table_administrar_descripcion")}{" "}
                </TableHeaderColumn>
                <TableHeaderColumn
                  width={"50"}
                  dataSort={true}
                  dataField="status"
                  dataAlign="center"
                  dataFormat={(cell, row) => this.EstadoRoles(cell, row)}
                >
                  {" "}
                  {t("app_roles_table_administrar_estado")}{" "}
                </TableHeaderColumn>
                <TableHeaderColumn
                  width={"80"}
                  dataSort={true}
                  dataField="createdAt"
                  dataAlign="center"
                  dataFormat={(cell, row) => this.FechaCreacionRoles(cell, row)}
                >
                  {" "}
                  {t("app_roles_table_administrar_fecha_creacion")}{" "}
                </TableHeaderColumn>

                <TableHeaderColumn
                  width={"200"}
                  export={false}
                  dataAlign="center"
                  dataFormat={(cell, row) => this.accionesRoles(cell, row)}
                >
                  {" "}
                  {t("app_roles_table_administrar_acciones")}{" "}
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </Col>
        </Row>

        <ModalView
          t={this.props.t}
          modalviewroles={this.state.modalview}
          authorization={this.props.authorization}
          ref="child"
        />
        <ModalEdit
          t={this.props.t}
          modaledit={this.state.modaledit}
          ref="child2"
          updateTable={this.getDataRoles}
          authorization={this.props.authorization}
        />
        <ModalDelete
          t={this.props.t}
          modaldelete={this.state.modaldel}
          ref="child3"
          updateTable={this.getDataRoles}
          authorization={this.props.authorization}
        />
        <ModalPermission
          t={this.props.t}
          datamodal={this.state.data}
          modaleditpermission={this.state.modalpermission}
          ref="child4"
          authorization={this.props.authorization}
        />
        <ModalExport
          t={this.props.t}
          modalexport={this.state.modalexport}
          ref="child5"
          authorization={this.props.authorization}
        />
      </div>
    );
  }
}
TableContentRoles.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default withTranslation("translations")(TableContentRoles);
