import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalView from "./ModalViewConglomerado";
import ModalDelete from "./ModalDeleteConglomerado";
import ModalEdit from "./ModalEditConglomerado";
import ModalExport from "./ModalExportCSV";
import "./../../../css/styleTableConglomerado.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import { CONGLOMERATES } from "./../../../services/EndPoints";
import { withTranslation } from "react-i18next";
import moment from "moment";
import PropTypes from "prop-types";

class TableContentConglomerado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      modalDelete: false,
      modalEdit: false,
      modalexport: false,
      dataConglomerates: [],
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
      this.getDataConglomerates();
    }
  }

  getDataConglomerates = () => {
    fetch(CONGLOMERATES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataConglomerates: data,
        });
      })
      .catch((Error) => console.log(" ", Error));
  };

  accionesConglomerado(cell, row) {
    return (
      <div
        className="table-actionMenuConglo"
        style={{ textAlign: "center", padding: "0", marginRight: "10%" }}
      >
        <button
          title="Ver conglomerado"
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
          title="Editar conglomerado"
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
          title="Eliminar conglomerado"
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
    const { t } = this.props;
    let status;
    if (row.status === 1) {
      status = <b className="text-success">{t("app_tablas_estado_activo")}</b>;
    } else if (row.status === 0) {
      status = <b className="text-danger">{t("app_tablas_estado_inactivo")}</b>;
    }
    return status;
  }

  FechaCreacionConglomerado(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  openModalView(id) {
    this.ModalViewRef.toggle(id);
  }

  openModalDelete(id) {
    this.ModalDeleteRef.toggle(id);
  }

  openModalEdit(id) {
    this.ModalEditRef.toggle(id);
  }

  openModalExport = () => {
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
        {t("app_conglomerado_administrar_button_exportar")}
      </button>
    );
  };

  render() {
    const options = {
      btnGroup: this.createCustomButtonGroup,
      pagination: true,
      exportCSV: true,
    };
    const { t } = this.props;

    const placeholder = (t) => {
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
                    remote={true} // dudas de como funciona este props para actualizar la data
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
                      width={"100"}
                    >
                      {" "}
                      {t("app_conglomerado_administrar_table_codigo")}{" "}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField={"name"}
                      dataAlign="center"
                      width={"250"}
                    >
                      {t("app_conglomerado_administrar_table_nombre")}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField={"description"}
                      dataAlign="center"
                      width={"230"}
                    >
                      {t("app_conglomerado_administrar_table_descripcion")}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField={"createdAt"}
                      dataFormat={(cell, row) =>
                        this.FechaCreacionConglomerado(cell, row)
                      }
                      dataAlign="center"
                      width={"150"}
                    >
                      {t("app_conglomerado_administrar_table_fecha_creacion")}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      width={""}
                      dataField={"status"}
                      dataAlign={"center"}
                      dataFormat={(cell, row) =>
                        this.EstadoConglomerado(cell, row)
                      }
                    >
                      {t("app_conglomerado_administrar_table_estado")}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      // width={"200"}
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
        <ModalView
          t={t}
          modalviewstate={this.state.modalView}
          ref={(mv) => (this.ModalViewRef = mv)}
          authorization={this.state.auth}
        />
        <ModalDelete
          t={t}
          modaldeletestate={this.state.modalDelete}
          updateTable={this.getDataConglomerates}
          ref={(md) => (this.ModalDeleteRef = md)}
          authorization={this.state.auth}
        />
        <ModalEdit
          authorization={this.state.auth}
          t={t}
          modaleditstate={this.state.modalEdit}
          ref={(me) => (this.ModalEditRef = me)}
          updateTable={() => this.getDataConglomerates()}
        />
        <ModalExport
          t={t}
          modalexport={this.state.modalexport}
          ref={(mexp) => (this.ModalExportRef = mexp)}
          authorization={this.state.auth}
        />
      </div>
    );
  }
}

TableContentConglomerado.propTypes = {
  t: PropTypes.any.isRequired,
  authorization: PropTypes.string.isRequired,
};

export default withTranslation("translations")(TableContentConglomerado);
