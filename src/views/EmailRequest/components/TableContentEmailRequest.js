import React, { Component, Fragment } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import {
  Row,
  Col,
  CardBody,
  CardHeader,
  Card,
  Collapse,
  Form,
} from "reactstrap";
import { Formik, ErrorMessage, Field } from "formik";
import { REQUEST_EMAIL, EMAIL_ACCOUNTS } from "./../../../services/EndPoints";
import { withTranslation } from "react-i18next";
import moment from "moment";
import PropTypes from "prop-types";
import "./../../../css/styleTableEmailRequest.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import ModalViewEmailRequest from "./ModalViewEmailRequest";
import Modalc from "./Modal";
import SelectAccount from "./SelectAccount";

class TableContentEmailRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalPreview: false,
      ModalInfo: false,
      ModalDel: false,
      templatePreview: "",
      hiddenColumnID: true,
      auth: this.props.authorization,
      t: this.props.t,
      /* */
      collapase: true,
      dataTable: [],
      dataEmailAccount: [],
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
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
      this.getData();
    }
  }

  getData = () => {
    fetch(`${EMAIL_ACCOUNTS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataEmailAccount: data,
        });
      });
  };

  getDataRequestEmail = (id) => {
    fetch(`${REQUEST_EMAIL}${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.state.auth,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataTable: data,
        });
      })
      .catch((Error) => console.log(" ", Error));
  };

  toggleCollapse = () => {
    this.setState({
      collapase: !this.state.collapase,
    });
  };

  FechaCreacionPlantillasEmail(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  accionesPlantillasEmail(cell, row) {
    const { t } = this.props;
    return (
      <div
        className="table-actionMenuPlantillaEmail"
        style={{ textAlign: "center", padding: "0", marginRight: "40px" }}
      >
        <button
          title={t("app_emailRequest_administrar_table_acciones_btn_ver_info")}
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModal(row.id);
          }}
        >
          {" "}
          <i className="fa fa-eye" />{" "}
        </button>
        &nbsp;
        <button
          title={t(
            "app_emailRequest_administrar_table_acciones_btn_ver_adjuntos"
          )}
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModalView(row.id);
          }}
        >
          {" "}
          <i className="fa fa-file-text" />{" "}
        </button>
      </div>
    );
  }
  FechaCreacionEmailRequest(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }
  StatusAnswer(cell, row) {
    const { t } = this.state;
    let status;
    if (row.answer === true) {
      status = (
        <b className="text-success">
          {" "}
          {t("app_emailRequest_administrar_table_estado_completa")}{" "}
        </b>
      );
    } else if (row.answer === false) {
      status = (
        <b className="text-danger">
          {" "}
          {t("app_emailRequest_administrar_table_estado_pendientea")}{" "}
        </b>
      );
    }
    return status;
  }

  openModal = (id) => {
    // this.refs.child2.toggle(id);
    this.ModalViewFilesRef.toggle(id);
  };

  openModalView(id) {
    // this.refs.child.toggle(id);
    this.ModalViewInfoRef.toggle(id);
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  render() {
    const dataTable = (e) => {
      const value = e.target.value;
      if (value !== "") {
        this.getDataRequestEmail(value);
      } else {
        this.setState({
          dataTable: [],
        });
      }
    };
    const { t } = this.state;
    return (
      <div className="animated fadeIn">
        <div className="col-md-12">
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  {" "}
                  <a
                    onClick={() => {
                      this.toggleCollapse();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    {t("app_emailRequest_administrar_title_card")}
                  </a>{" "}
                </CardHeader>
                <Collapse isOpen={this.state.collapase}>
                  <CardBody>
                    <div className="row">
                      <div className="col-md-6">
                        <dl className="param">
                          <dt>
                            {t("app_emailRequest_administrar_title_select")}
                          </dt>
                          <dd>
                            <select
                              name={"email_accounts"}
                              onChange={(e) => dataTable(e)}
                              className={`form-control form-control-sm`}
                            >
                              <option value={""}>
                                --{" "}
                                {t(
                                  "app_emailRequest_administrar_title_select_placeholder"
                                )}{" "}
                                --
                              </option>
                              {this.state.dataEmailAccount.map((aux, id) => {
                                return (
                                  <option key={id} value={aux.id}>
                                    {aux.email}
                                  </option>
                                );
                              })}
                            </select>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </CardBody>
                </Collapse>
              </Card>
            </Col>
          </Row>
          <BootstrapTable
            striped
            pagination
            search
            searchPlaceholder={t(
              "app_emailRequest_administrar_table_placeholder"
            )}
            data={this.state.dataTable}
            hover
            bordered={false}
            className="tablePlantillaEmail texto-PlantillaEmail"
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
              dataField="sender"
              dataAlign="center"
              width={"250"}
            >
              {t("app_emailRequest_administrar_table_remitente")}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="subject"
              dataAlign="center"
              width={"250"}
            >
              {t("app_emailRequest_administrar_table_asunto")}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={"createdAt"}
              dataFormat={(cell, row) =>
                this.FechaCreacionEmailRequest(cell, row)
              }
              dataAlign="center"
              width={"150"}
            >
              {t("app_emailRequest_administrar_table_fecha_creacion")}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={"answer"}
              dataFormat={(cell, row) => this.StatusAnswer(cell, row)}
              dataAlign="center"
              width={"200"}
            >
              {t("app_emailRequest_administrar_table_estado")}
            </TableHeaderColumn>
            <TableHeaderColumn
              // width={"170"}
              export={false}
              dataAlign="center"
              dataFormat={(cel, row) => this.accionesPlantillasEmail(cel, row)}
            >
              {" "}
              {t("app_emailRequest_administrar_table_acciones")}
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
        <ModalViewEmailRequest
          ref={(mi) => (this.ModalViewInfoRef = mi)}
          modal={this.state.ModalPreview}
          authorization={this.state.auth}
          t={this.state.t}
        />
        <Modalc
          ref={(mf) => (this.ModalViewFilesRef = mf)}
          modal={this.state.ModalInfo}
          authorization={this.state.auth}
          t={this.state.t}
        />
      </div>
    );
  }
}
TableContentEmailRequest.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired,
};

export default withTranslation("translations")(TableContentEmailRequest);
