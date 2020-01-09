import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const TableModalViewComponent = props => {
  return (
    <div className="col-md-12">
      <BootstrapTable data={props.data}>
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
      </BootstrapTable>
    </div>
  );
};

export default TableModalViewComponent;
