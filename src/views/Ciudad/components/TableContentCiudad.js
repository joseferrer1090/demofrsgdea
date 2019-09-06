import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ModalView from './ModalViewCiudad';
import ModalEdit from './ModalEditCiudad';
import ModalDelete from './ModalDeleteCiudad';
import ModalExport from './ModalExportCSV';
import './../../../css/styleTableCiudad.css';
import './../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import { CITYS } from './../../../services/EndPoints';
import moment from 'moment';

class TableContentCiudad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalViewPais: false,
      ModalEdit: false,
      ModalDel: false,
      modalExport: false,
      dataCity: [],
      hiddenColumnId: true
    };
  }

  componentDidMount() {
    this.getDataCity();
  }

  getDataCity = () => {
    fetch(CITYS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCity: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  FechaCreacionCiudad(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format('YYYY-MM-DD');
  }

  accionesPais(cell, row) {
    return (
      <div
        className="table-actionMenuCiudad"
        style={{ textAlign: 'center', padding: '0', marginRight: '65px' }}
      >
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

  openModalView(id) {
    this.refs.child.toggle(id);
  }

  openModalEdit(id) {
    this.refs.child3.toggle(id);
  }

  openModalDelete(id) {
    this.refs.child2.toggle(id);
  }
  openModalExport = () => {
    this.refs.child4.toggle();
  };

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  EstadoEmpresa(cell, row) {
    let status;
    if (row.status === 1) {
      status = <b className="text-success">Activo</b>;
    } else if (row.status === 0) {
      status = <b className="text-danger">Inactivo</b>;
    }
    return status;
  }
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

  DepartamentoInfo = department => {
    return !department ? null : `<div>${department.name}</div>`;
  };

  CountryInfo = department => {
    return !department ? null : `<div>${department.country.name}</div>`;
  };
  render() {
    const options = {
      btnGroup: this.createCustomButtonGroup
    };
    return (
      <div className="animated fadeIn">
        <div className="col-md-12">
          <BootstrapTable
            options={options}
            striped
            exportCSV
            pagination
            search
            searchPlaceholder="Buscar"
            data={this.state.dataCity}
            hover
            bordered={false}
            className="tableCiudad texto-Ciudad"
          >
            <TableHeaderColumn
              isKey
              dataField="id"
              dataAlign="center"
              width={'80'}
              hidden={this.state.hiddenColumnId}
            />
            <TableHeaderColumn
              dataField={'id'}
              dataFormat={this.indexN}
              width="50"
              dataAlign="center"
              dataSort={true}
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="department"
              dataFormat={this.CountryInfo}
              dataAlign="center"
              width={'120'}
            >
              {' '}
              País{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="department"
              dataFormat={this.DepartamentoInfo}
              dataAlign="center"
              width={'150'}
            >
              {' '}
              Departamento{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="code"
              dataAlign="center"
              width={'110'}
            >
              {' '}
              Código{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="name"
              dataAlign="center"
              width={'130'}
            >
              {' '}
              Nombre{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataField={'createdAt'}
              dataFormat={(cell, row) => this.FechaCreacionCiudad(cell, row)}
              dataAlign="center"
              width={'120'}
            >
              Fecha de creación
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'80'}
              dataSort={true}
              dataField={'status'}
              dataAlign="center"
              dataFormat={(cell, row) => this.EstadoEmpresa(cell, row)}
            >
              Estado
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'180'}
              export={false}
              dataAlign="center"
              dataFormat={(cel, row) => this.accionesPais(cel, row)}
            >
              {' '}
              Acciones{' '}
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
        <ModalView modalview={this.state.ModalViewPais} ref="child" />
        <ModalEdit modaledit={this.state.ModalEdit} ref="child3" />
        <ModalDelete modaldel={this.state.ModalDelete} ref="child2" />
        <ModalExport modalexport={this.state.modalExport} ref="child4" />
      </div>
    );
  }
}

export default TableContentCiudad;
