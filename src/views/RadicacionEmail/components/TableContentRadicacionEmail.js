import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import "./../../../css/styleTableRadicacionEmail.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import ModalViewRadicacionEmail from "./ModalViewRadicacionEmail";
import ModalUpdateRadicacionEmail from "./ModalUpdateRadicacionEmail";
import ModalDeleteRadicacionEmail from "./ModalDeleteRadicacionEmail";
import ModalExportCSV from "./ModalExportCSV";
import moment from "moment";
import { withTranslation } from "react-i18next";
import { EMAIL_FILING } from "../../../services/EndPoints";

class TableContentRadicacionEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      modalUpdate: false,
      modaldelte: false,
      modalexport: false,
      dataRadicacionEmail: [],
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
      this.getDataRadicacionEmail();
    }
  }

  getDataRadicacionEmail = () => {
    fetch(`${EMAIL_FILING}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataRadicacionEmail: data,
        });
      })
      .catch((Error) => console.log(" ", Error));
  };

  accionesRadicacionEmail(cell, row) {
    const { t } = this.props;
    return (
      <div className="table-actionMenuMensj" style={{ marginRight: "40px" }}>
        <button
          title={t("app_radicacion_email_administrar_table_acciones_btn_ver")}
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
          title={t(
            "app_radicacion_email_administrar_table_acciones_btn_editar"
          )}
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
          title={t(
            "app_radicacion_email_administrar_table_acciones_btn_eliminar"
          )}
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

  EstadoRadicacionEmail = (cell, row) => {
    const { t } = this.props;
    let status;
    console.log(row.status);
    if (row.status === true) {
      status = (
        <b className="text-success"> {t("app_tablas_estado_activo")} </b>
      );
    } else if (row.status === false) {
      status = (
        <b className="text-danger"> {t("app_tablas_estado_inactivo")} </b>
      );
    }
    return status;
  };

  FechaCreacionRadicacionEmail(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("YYYY-MM-DD");
  }

  openModalView = (id) => {
    // this.refs.child.toggle(id);
    this.ModalViewRef.toggle(id);
  };

  openModalUpdate = (id) => {
    // this.refs.child2.toggle(id);
    this.ModalEditRef.toggle(id);
  };

  openModalDelete = (id) => {
    // this.refs.child3.toggle(id);
    this.ModalDeleteRef.toggle(id);
  };

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
        {t("app_radicacion_email_administrar_table_boton_exportar")}
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
        <Row>
          <Col sm="12">
            <BootstrapTable
              options={options}
              data={this.state.dataRadicacionEmail}
              bordered={false}
              hover
              striped
              pagination
              search={true}
              exportCSV
              searchPlaceholder={t(
                "app_radicacion_email_administrar_table_placeholder"
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
                dataField="protocol"
                dataAlign="center"
                width={"100"}
              >
                {t("app_radicacion_email_administrar_table_protocol")}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="host"
                dataAlign="center"
                width={"120"}
              >
                {t("app_radicacion_email_administrar_table_host")}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="port"
                dataAlign="center"
                width={"100"}
              >
                {t("app_radicacion_email_administrar_table_puerto")}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="email"
                dataAlign="center"
                width={"200"}
              >
                {t("app_radicacion_email_administrar_registrar_email")}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataSort={true}
                dataField={"createdAt"}
                dataFormat={(cell, row) =>
                  this.FechaCreacionRadicacionEmail(cell, row)
                }
                dataAlign="center"
                width={"150"}
              >
                {t("app_radicacion_email_administrar_table_fecha_creacion")}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={"100"}
                dataField="status"
                dataAlign="center"
                dataFormat={(cell, row) =>
                  this.EstadoRadicacionEmail(cell, row)
                }
              >
                {" "}
                {t("app_radicacion_email_administrar_table_estado")}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={"120"}
                export={false}
                dataAlign="center"
                dataFormat={(cell, row) =>
                  this.accionesRadicacionEmail(cell, row)
                }
              >
                {" "}
                {t("app_radicacion_email_administrar_table_acciones")}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalViewRadicacionEmail
          authorization={this.state.auth}
          t={this.props.t}
          modalview={this.state.modalView}
          ref={(mv) => (this.ModalViewRef = mv)}
        />
        <ModalUpdateRadicacionEmail
          authorization={this.state.auth}
          t={this.props.t}
          modalupdate={this.state.modalUpdate}
          updateTable={this.getDataRadicacionEmail}
          ref={(me) => (this.ModalEditRef = me)}
        />

        <ModalDeleteRadicacionEmail
          authorization={this.state.auth}
          t={this.props.t}
          modaldelete={this.state.modaldelte}
          updateTable={this.getDataRadicacionEmail}
          ref={(md) => (this.ModalDeleteRef = md)}
        />
        <ModalExportCSV
          authorization={this.state.auth}
          t={this.props.t}
          modalexport={this.state.modalexport}
          ref={(mexp) => (this.ModalExportRef = mexp)}
        />
      </div>
    );
  }
}

TableContentRadicacionEmail.propTypes = {};

export default withTranslation("translations")(TableContentRadicacionEmail);
