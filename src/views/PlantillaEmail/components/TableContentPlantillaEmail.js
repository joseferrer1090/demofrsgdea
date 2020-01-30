import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { TEMPLATES_EMAIL } from "./../../../services/EndPoints";
import { withTranslation } from "react-i18next";
import ShowTemplate from "./Forms/ShowTemplate";
import moment from "moment";
import PropTypes from "prop-types";
import "./../../../css/styleTablePlantillaEmail.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import ModalViewInfoTemplateEmail from "./ModalViewPlantillaEmail";

class TableContentPlantillaEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalPreview: false,
      ModalEdit: false,
      ModalDel: false,
      dataPlantillas: [],
      templatePreview: "",
      hiddenColumnID: true,
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
      this.getDataPlantillasEmail();
    }
  }

  getDataPlantillasEmail = () => {
    fetch(TEMPLATES_EMAIL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.props.authorization,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataPlantillas: data
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  FechaCreacionPlantillasEmail(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  accionesPlantillasEmail(cell, row) {
    return (
      <div
        className="table-actionMenuPlantillaEmail"
        style={{ textAlign: "center", padding: "0", marginRight: "40px" }}
      >
        <button
          className="btn btn-dark btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModalViewInfo(row.id);
          }}
        >
          {" "}
          <i className="fa fa-info-circle" />{" "}
        </button>
        &nbsp;
        <button
          className="btn btn-warning btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModalPreview(row.id);
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
      </div>
    );
  }

  openModalViewInfo = id => {
    this.refs.child2.toggle(id);
  };

  openModalPreview(id) {
    this.refs.child.toggle(id);
  }

  openModalEdit = id => {
    let path = `#/configuracion/plantillaemail/edit/${id}`;
    window.location.replace(path);
  };

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  render() {
    const { t } = this.props;
    return (
      <div className="animated fadeIn">
        <div className="col-md-12">
          <BootstrapTable
            striped
            pagination
            search
            searchPlaceholder={t("app_pais_administrar_table_placeholder")}
            data={this.state.dataPlantillas}
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
              dataField="name"
              dataAlign="center"
              width={"300"}
            >
              Nombre
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="description"
              dataAlign="center"
              width={"300"}
            >
              Descripción
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataField={"createdAt"}
              dataFormat={(cell, row) =>
                this.FechaCreacionPlantillasEmail(cell, row)
              }
              dataAlign="center"
              width={"150"}
            >
              {t("app_pais_administrar_table_fecha_creacion")}
            </TableHeaderColumn>

            <TableHeaderColumn
              width={"170"}
              export={false}
              dataAlign="center"
              dataFormat={(cel, row) => this.accionesPlantillasEmail(cel, row)}
            >
              {" "}
              {t("app_pais_administrar_table_acciones")}{" "}
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
        <ShowTemplate
          ref={"child"}
          modal={this.state.ModalPreview}
          authorization={this.state.auth}
        />
        <ModalViewInfoTemplateEmail
          ref={"child2"}
          modal={this.state.ModalPreview}
          authorization={this.state.auth}
        />
      </div>
    );
  }
}
TableContentPlantillaEmail.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default withTranslation("translations")(TableContentPlantillaEmail);
