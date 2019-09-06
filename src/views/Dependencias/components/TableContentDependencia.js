import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Row, Col } from 'reactstrap';
import ModalView from './ModalViewDependencia';
import ModalEdit from './ModalEditDependencia';
import ModalDelete from './ModalDeleteDependencia';
import ModalExport from './ModalExportCSV';
import './../../../css/styleTableDependencia.css';
import './../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import moment from 'moment';

class TableContentDependencia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalviewstate: false,
      modaleditstate: false,
      modaldelstate: false,
      modalexport: false,
      dataDependence: [],
      hiddenColumnID: true
    };
  }

  componentDidMount() {
    this.getDataDependence();
  }

  getDataDependence = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/dependence`, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + window.btoa('sgdea:123456'),
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataDependence: data
        });
      })
      .catch(Error => console.log('', Error));
  };
  FechaCreacionDependencia(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format('YYYY-MM-DD');
  }
  accionesDependencias(cell, row) {
    return (
      <div className="table-actionMenuDep" style={{ marginRight: '59px' }}>
        <button
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModalView(row.id);
          }}
        >
          {' '}
          <i className="fa fa-eye" />{' '}
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
          {' '}
          <i className="fa fa-trash" />{' '}
        </button>
      </div>
    );
  }

  StatusDependencia(cell, row) {
    let status;
    if (row.status === 1) {
      status = <b className="text-success">Activo</b>;
    } else if (row.status === 0) {
      status = <b className="text-danger">Inactivo</b>;
    }
    return status;
  }

  openModalView(id) {
    this.refs.child1.toggle(id);
  }

  openModalDelete(id) {
    this.refs.child3.toggle(id);
  }

  openModalEdit(id) {
    this.refs.child2.toggle(id);
  }

  openModalExport() {
    this.refs.child4.toggle();
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  headquarter = headquarter => {
    return !headquarter ? null : `<div>${headquarter.name}</div>`;
  };

  charge = charge => {
    return !charge ? null : `<div>${charge.name}</div>`;
  };

  createCustomButtonGroup = props => {
    return (
      <button
        type="button"
        className={`btn btn-secondary btn-sm`}
        onClick={() => this.openModalExport()}
      >
        <i className="fa fa-download" /> Exportar CSV
      </button>
    );
  };

  render() {
    const dataDependence = this.state.dataDependence;
    const options = {
      btnGroup: this.createCustomButtonGroup
    };
    return (
      <div className="animated fadeIn">
        <Col md="12">
          <BootstrapTable
            options={options}
            data={dataDependence}
            pagination
            search
            searchPlaceholder="Buscar"
            exportCSV
            bordered={false}
            hover
            striped
            className="tableDep texto-Dep"
          >
            <TableHeaderColumn
              export={false}
              isKey
              dataField={'id'}
              hidden={this.state.hiddenColumnID}
            />
            <TableHeaderColumn
              dataSort={true}
              dataField={'id'}
              width={'30'}
              dataFormat={this.indexN}
              dataAlign="center"
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'140'}
              dataField="headquarter"
              dataFormat={this.headquarter}
              dataAlign="center"
              dataSort={true}
            >
              Sede
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'45'}
              dataField="code"
              dataAlign="center"
              dataSort={true}
            >
              Código
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'120'}
              dataField="name"
              dataSort={true}
              dataAlign="center"
            >
              Nombre
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'150'}
              dataField="charge"
              dataFormat={this.charge}
              dataAlign="center"
              dataSort={true}
            >
              Cargo responsable
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataField={'createdAt'}
              dataFormat={(cell, row) =>
                this.FechaCreacionDependencia(cell, row)
              }
              dataAlign="center"
              width={'150'}
            >
              Fecha de creación
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'70'}
              dataField="Estado"
              dataAlign="center"
              dataSort={true}
              dataFormat={(cell, row) => this.StatusDependencia(cell, row)}
            >
              {' '}
              Estado{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'120'}
              export={false}
              dataAlign="center"
              dataFormat={(cell, row) => this.accionesDependencias(cell, row)}
            >
              Acciones
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>
        <ModalView modalView={this.state.modalviewstate} ref="child1" />
        <ModalEdit modalEdit={this.state.modaleditstate} ref="child2" />
        <ModalDelete modalDel={this.state.modaldelstate} ref="child3" />
        <ModalExport modalExport={this.state.modalexport} ref={'child4'} />
      </div>
    );
  }
}

TableContentDependencia.propTypes = {};

export default TableContentDependencia;
