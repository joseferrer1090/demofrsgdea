import React, { Component } from "react";
import { WithRouter } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalViewTipoDocumentalRadication from "./ModalViewTipoDocumentalRadication";
import ModalDeleteTipoDocumentalRadication from "./ModalDeleteTipoDocumentalRadication";
import ModalExport from "./ModalExport";
import ModalExportUsers from "./ModalExportTDRUser";
import PropTypes from "prop-types";
import "./../../../css/styleTableTipoDocumentalRadicacion.css";
import { TYPEDOCUMENTARY_ALL } from "./../../../services/EndPoints";
import { withTranslation } from "react-i18next";
import moment from "moment";

class TableContentTramite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaldel: false,
      modalexport: false,
      modalexport2: false,
      auth: this.props.authorization,
      data: [],
      hiddenColumnID: true
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
      this.setState(
        {
          auth: this.props.authorization
        },
        this.getData()
      );
    }
  }

  getData = () => {
    fetch(`${TYPEDOCUMENTARY_ALL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data
        });
      })
      .catch(err => console.log(err));
  };

  accionesTramite = (cell, row) => {
    return (
      <div
        className="table-actionMenuTDocRadicacion"
        style={{ textAlign: "center", padding: "0", marginRight: "45px" }}
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
            this.routeChange(row.id);
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

  estadoTipodocumentalradicacion = (cell, row) => {
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

  FechaCreacion(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  openModalView(id) {
    // this.refs.child1.toggle(id);
    this.ModalViewRef.toggle(id);
  }

  routeChange = id => {
    let path = `#/configuracion/tipodocumentalradication/edit/${id}`;
    window.location.replace(path);
  };

  openModalDelete(id) {
    // this.refs.child2.toggle(id);
    this.ModalDeleteRef.toggle(id);
  }

  openModalExport() {
    // this.refs.child3.toogle();
    this.ModalExportRef.toggle();
  }

  openModalExport2() {
    // this.refs.child4.toogle();
    this.ModalExportUserRef.toggle();
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  createCustomButtonGroup = props => {
    const { t } = this.props;
    return (
      <div>
        <button
          type="button"
          className={`btn btn-secondary btn-sm`}
          onClick={() => this.openModalExport()}
        >
          <i className="fa fa-download" />{" "}
          {t("app_documentalRadicacion_table_administrar_exportar")}
        </button>
        &nbsp;
        <button
          type="button"
          className={`btn btn-secondary btn-sm`}
          onClick={() => this.openModalExport2()}
        >
          <i className="fa fa-download" />{" "}
          {t("app_documentalRadicacion_table_administrar_exportar_usuarios")}
        </button>
      </div>
    );
  };

  render() {
    const { auth } = this.state;
    const options = {
      btnGroup: this.createCustomButtonGroup,
      pagination: true,
      exportCSV: true
    };
    const { t } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm={12}>
            <BootstrapTable
              data={this.state.data}
              bordered={false}
              hover
              pagination
              search
              striped
              searchPlaceholder={t(
                "app_documentalRadicacion_table_administrar_placeholder"
              )}
              exportCSV
              className="texto-TLlegada"
              options={options}
            >
              <TableHeaderColumn
                isKey
                dataField={"id"}
                width="50"
                hidden={this.state.hiddenColumnID}
              />

              <TableHeaderColumn
                dataField={"id"}
                dataFormat={this.indexN}
                width={"40"}
              >
                #
              </TableHeaderColumn>
              <TableHeaderColumn
                width={"100"}
                dataField={"code"}
                dataAlign="center"
              >
                {" "}
                {t("app_documentalRadicacion_table_administrar_codigo")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={"205"}
                dataField={"name"}
                dataAlign="center"
              >
                {" "}
                {t("app_documentalRadicacion_table_administrar_nombre")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"description"} dataAlign="center">
                {" "}
                {t(
                  "app_documentalRadicacion_table_administrar_descripcion"
                )}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={"170"}
                dataField={"answerDays"}
                dataAlign="center"
              >
                {t(
                  "app_documentalRadicacion_table_administrar_tiempo_respuesta"
                )}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField={"createdAt"}
                dataAlign="center"
                dataFormat={(cell, row) => this.FechaCreacion(cell, row)}
              >
                {" "}
                {t(
                  "app_documentalRadicacion_table_administrar_fecha_creacion"
                )}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={"100"}
                dataField={"status"}
                dataAlign="center"
                dataFormat={(cell, row) =>
                  this.estadoTipodocumentalradicacion(cell, row)
                }
              >
                {" "}
                {t("app_documentalRadicacion_table_administrar_estado")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                export={false}
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesTramite(cell, row)}
              >
                {" "}
                {t("app_documentalRadicacion_table_administrar_acciones")}{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalViewTipoDocumentalRadication
          t={this.props.t}
          authorization={auth}
          modalviewtramit={this.state.modalview}
          ref={mv => (this.ModalViewRef = mv)}
        />
        <ModalDeleteTipoDocumentalRadication
          t={this.props.t}
          authorization={auth}
          modaldelete={this.state.modaldel}
          updateTable={this.getData}
          ref={md => (this.ModalDeleteRef = md)}
        />
        <ModalExport
          t={this.props.t}
          authorization={auth}
          ref={mexp => (this.ModalExportRef = mexp)}
          modalexport={this.state.modalexport}
        />
        <ModalExportUsers
          t={this.props.t}
          modal={this.state.modalexport2}
          authorization={auth}
          ref={meu => (this.ModalExportUserRef = meu)}
        />
      </div>
    );
  }
}

TableContentTramite.propTypes = {
  authorization: PropTypes.string.isRequired,
  t: PropTypes.any.isRequired
};

export default withTranslation("translations")(TableContentTramite);
