import React from "react";
import PropTypes from "prop-types";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
const TableModalViewTipoDocumental = props => {
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
        <TableHeaderColumn dataField={"identification"} isKey>
          {" "}
          Identificacion{" "}
        </TableHeaderColumn>
        <TableHeaderColumn dataField={"charge"}> Cargo </TableHeaderColumn>
        <TableHeaderColumn dataField={"name"}> Nombre </TableHeaderColumn>
        <TableHeaderColumn dataField={"dependence"}>
          {" "}
          Dependencia{" "}
        </TableHeaderColumn>
        <TableHeaderColumn dataField={"charge"}>Cargo</TableHeaderColumn>
        <TableHeaderColumn dataField={"headquarter"}>Sede </TableHeaderColumn>
        <TableHeaderColumn dataField={"company"}> Empresa </TableHeaderColumn>
        <TableHeaderColumn dataField={"conglomerate"}>
          Conglomerado
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

export default TableModalViewTipoDocumental;
