import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { TEMPLATES_EMAIL } from "./../../../services/EndPoints";
import { withTranslation } from "react-i18next";
import ShowTemplate from "./Forms/ShowTemplate";
import moment from "moment";
import PropTypes from "prop-types";
import "./../../../css/styleTablePais.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

class TableContentPlantillaEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalPreview: false,
      ModalEdit: false,
      ModalDel: false,
      dataPlantillas: [],
      codeHTML: "",
      codeCSS: "",
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
        this.state.dataPlantillas.map((aux, idx) => {
          this.setState({
            codeHTML: aux.body,
            codeCSS: aux.css
          });
        });
        this.processTemplate(this.state.codeHTML, this.state.codeCSS);
      })
      .catch(Error => console.log(" ", Error));
  };

  processTemplate = (renderHTML, renderCSS) => {
    let template = `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style type="text/css">${renderCSS}</style>
        </head>
        <body>${renderHTML}</body>
        </html>`;
    // console.log(template);
    this.Template(template);
    return template;
  };

  Template = value => {
    this.setState({
      templatePreview: value
    });
  };

  FechaCreacionPlantillasEmail(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  accionesPlantillasEmail(cell, row) {
    return (
      <div
        className="table-actionMenuPais"
        style={{ textAlign: "center", padding: "0", marginRight: "75px" }}
      >
        <button
          className="btn btn-warning btn-sm"
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
    this.refs.child.toggle(id);
  }

  openModalEdit = id => {
    let path = `#/configuracion/plantillaemail/edit/${id}`;
    window.location.replace(path);
  };

  openModalDelete(id) {
    this.refs.child2.toggle(id);
  }

  openModalExport = () => {
    this.refs.child4.toggle();
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
            // options={options}
            striped
            exportCSV
            pagination
            search
            searchPlaceholder={t("app_pais_administrar_table_placeholder")}
            data={this.state.dataPlantillas}
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
              width={"120"}
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
          template={this.state.templatePreview}
          modal={this.state.ModalPreview}
        />
        {/* <ModalView
          t={this.props.t}
          modalview={this.state.ModalViewPais}
          ref="child"
          authorization={this.state.auth}
        />
        <ModalEdit
          t={this.props.t}
          modaledit={this.state.ModalEdit}
          updateTable={this.getDataPais}
          ref="child3"
          authorization={this.state.auth}
        />
        <ModalDelete
          t={this.props.t}
          modaldel={this.state.ModalDelete}
          updateTable={this.getDataPais}
          ref="child2"
          authorization={this.state.auth}
        /> */}
      </div>
    );
  }
}
TableContentPlantillaEmail.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default withTranslation("translations")(TableContentPlantillaEmail);
