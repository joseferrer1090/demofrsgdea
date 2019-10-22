import React, { Component } from "react";
import { WithRouter } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalViewTramite from "./ModalViewTramite";
import ModalDeleteTramite from "./ModalDeleteTramite";
import ModalExport from "./ModalExportCSV";
import ModalExport2 from "./ModalExportCSVTipoTramiteUser";
import PropTypes from "prop-types";
import moment from 'moment';


class TableContentTramite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTipoTramite: [],
      modalview: false,
      modaldel: false, 
      modalexport: false,
      modalexport2: false,
      hiddenColumnID: true
    };
  }

  componentDidMount() {
    this.getDataTipoTramite();
  }

  getDataTipoTramite = () => {
    fetch(`http://192.168.20.187:7000/api/sgdea/typeprocedure`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa('sgdea:123456')
      }
    }).then(response => response.json()).then(data => {
      this.setState({
        dataTipoTramite: data
      })
    }).catch(err => console.log("Error", err));
  }

  accionesTramite = (cell, row) => {
    return (
      <div
        className="table-actionMenuTLlegada"
        style={{ textAlign: "center", padding: "0", marginRight: "80px" }}
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
            this.routeChange();
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

  FechaCreacionTipoTramite(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format('YYYY-MM-DD');
  }

  estadotramite = (cell, row) => {
    let status;
    if (row.status === 1) {
      status = <div className="text-success"> Activo </div>;
    } else if (row.status === 0) {
      status = <div className="text-danger"> Inactivo </div>;
    }
    return status;
  };

  openModalView(id) {
    this.refs.child1.toggle(id);
  }

  routeChange = () => {
    let path = `/#/configuracion/tipotramite/edit`;
    window.location.replace(path);
  };

  openModalDelete(id) {
    this.refs.child2.toggle(id);
  }

  openModalExport(){
    this.refs.child3.toggle();
  }

  openModalExportUsers(){
    this.refs.child4.toggle();
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

   createCustomButtonGroup = props => {
    return (
     <div>
        <button
        type="button"
        className={`btn btn-secondary btn-sm`}
        onClick={() => this.openModalExport()}
      >
        <i className="fa fa-download" />{' '}
        Exportar
      </button>
      &nbsp;
       <button
        type="button"
        className={`btn btn-secondary btn-sm`}
        onClick={() => this.openModalExportUsers()}
      >
        <i className="fa fa-download" />{' '}
        Exportar usuarios por tramite
      </button>
     </div>
      
    );
  };

  render() {
    const options = {
      btnGroup: this.createCustomButtonGroup,
      pagination: true,
      exportCSV: true
    };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm={12}>
            <BootstrapTable
              data={this.state.dataTipoTramite}
              bordered={false}
              options={options}
              hover
              pagination
              search
              striped
              searchPlaceholder="Buscar"
              exportCSV
              className="texto-TLlegada"
            >
             
              <TableHeaderColumn isKey dataField={"id"} width="50" hidden={this.state.hiddenColumnID}/>
              <TableHeaderColumn  dataField={"id"} width="50"  dataFormat={this.indexN} >
                {" "}
                #{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"code"} dataAlign="center">
                {" "}
                Código{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"name"} dataAlign="center">
                {" "}
                Nombre{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"description"} dataAlign="center">
                {" "}
                Descripción{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"answerDays"} dataAlign={"center"}> Tiempo de respuesta  </TableHeaderColumn>
              <TableHeaderColumn dataField={"createdAt"} dataAlign={"center"} dataFormat={(cell, row) => this.FechaCreacionTipoTramite(cell, row)}> Fecha de creacion</TableHeaderColumn>
              <TableHeaderColumn
                dataField="status"
                dataAlign="center"
                dataFormat={(cell, row) => this.estadotramite(cell, row)}
              >
                {" "}
                Estado{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                export={false}
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesTramite(cell, row)}
              >
                {" "}
                Acciones{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalViewTramite
          modalviewtramit={this.state.modalview}
          ref={"child1"}
        />
        <ModalDeleteTramite updateTable={this.getDataConglomerates} modaldelete={this.state.modaldel} ref={"child2"} />
        <ModalExport modalexport={this.state.modalexport} ref={"child3"}  />
        <ModalExport2 modalexport2={this.state.modalexport2} ref={"child4"}/>
      </div>
    );
  }
}

TableContentTramite.propTypes = {};

export default TableContentTramite;
