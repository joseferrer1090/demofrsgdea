import React from "react";
import PropTypes from "prop-types";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";

const TableModalViewTipoDocumental = props => {
  const { t } = props;
  return (
    <div className="col-md-12">
      <BootstrapTable
        data={props.data}
        pagination
        bordered={false}
        hover={true}
        maxHeight={"150px"}
        options={{ noDataText: "No hay usuarios asignado a este tramite" }}
      >
        <TableHeaderColumn width={"115"} dataField={"identification"} isKey>
          {" "}
          {t("app_documentalRadicacion_ver_table_identificacion")}{" "}
        </TableHeaderColumn>
        <TableHeaderColumn dataField={"name"}>
          {" "}
          {t("app_documentalRadicacion_ver_table_nombre")}{" "}
        </TableHeaderColumn>
        <TableHeaderColumn dataField={"charge"}>
          {t("app_documentalRadicacion_ver_table_cargo")}
        </TableHeaderColumn>
        <TableHeaderColumn dataField={"dependence"}>
          {" "}
          {t("app_documentalRadicacion_ver_table_dependencia")}{" "}
        </TableHeaderColumn>

        <TableHeaderColumn dataField={"headquarter"}>
          {t("app_documentalRadicacion_ver_table_sede")}{" "}
        </TableHeaderColumn>
        <TableHeaderColumn dataField={"company"}>
          {" "}
          {t("app_documentalRadicacion_ver_table_empresa")}{" "}
        </TableHeaderColumn>
        <TableHeaderColumn dataField={"conglomerate"}>
          {t("app_documentalRadicacion_ver_table_conglomerado")}
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

export default TableModalViewTipoDocumental;
