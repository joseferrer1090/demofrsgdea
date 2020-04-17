import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const TableModalViewComponent = props => {
  const { t } = props;
  return (
    <div className="">
      <BootstrapTable
        data={props.data}
        options={{ noDataText: "No hay usuarios asignado a ese tramite" }}
        pagination
        bordered={false}
        hover={true}
        maxHeight={"150px"}
      >
        <TableHeaderColumn width={"170"} dataField={"identification"} isKey>
          {" "}
          {t("app_tipoTramite_ver_table_identificacion")}{" "}
        </TableHeaderColumn>

        <TableHeaderColumn dataField={"name"}>
          {" "}
          {t("app_tipoTramite_ver_table_nombre")}{" "}
        </TableHeaderColumn>
        <TableHeaderColumn dataField={"charge"}>
          {" "}
          {t("app_tipoTramite_ver_table_cargo")}{" "}
        </TableHeaderColumn>
        <TableHeaderColumn dataField={"dependence"}>
          {" "}
          {t("app_tipoTramite_ver_table_dependencia")}{" "}
        </TableHeaderColumn>

        <TableHeaderColumn dataField={"headquarter"}>
          {t("app_tipoTramite_ver_table_sede")}{" "}
        </TableHeaderColumn>
        <TableHeaderColumn dataField={"company"}>
          {" "}
          {t("app_tipoTramite_ver_table_empresa")}{" "}
        </TableHeaderColumn>
        <TableHeaderColumn dataField={"conglomerate"}>
          {t("app_tipoTramite_ver_table_conglomerado")}
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

export default TableModalViewComponent;
