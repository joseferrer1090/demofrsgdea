import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const TableModalViewComponent = props => {
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

export default TableModalViewComponent;