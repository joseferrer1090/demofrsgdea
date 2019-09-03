import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ModalView from './ModalViewDepartamento';
import ModalEdit from './ModalEditDepartamento';
import ModalDelete from './ModalDeleteDepartamento';
import ModalExport from './ModalExportCSV';
import './../../../css/styleTableDepartamento.css';
import './../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import { DEPARTMENTS } from './../../../services/EndPoints';
class TableContentDepartamento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalViewPais: false,
      ModalEdit: false,
      ModalDel: false,
      modalexport: false,
      dataDepartment: [],
      hiddenColumnID: true
    };
  }
  componentDidMount() {
    this.getDataDepartment();
  }

  getDataDepartment = () => {
    fetch(DEPARTMENTS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataDepartment: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  accionesPais(cell, row) {
    return (
      <div
        className="table-actionMenuDepto"
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

  DepartamentoStatus(cell, row) {
    let status;
    if (row.status === 1) status = <b className="text-success">Activo</b>;
    else if (row.status === 0) {
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

  PaisInfo = country => {
    return !country ? null : `<div>${country.name}</div>`;
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
            exportCSV
            pagination
            search
            striped
            searchPlaceholder="Buscar"
            data={this.state.dataDepartment}
            hover
            bordered={false}
            className="tableDepto texto-Depto"
          >
            <TableHeaderColumn
              export={false}
              isKey
              dataField={'id'}
              hidden={this.state.hiddenColumnID}
            />
            <TableHeaderColumn
              dataField={'id'}
              dataFormat={this.indexN}
              width={'50'}
              dataAlign="center"
              dataSort={true}
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="country"
              dataFormat={this.PaisInfo}
              dataAlign="center"
              width={'130'}
            >
              {' '}
              País{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="code"
              dataAlign="center"
              width={'130'}
            >
              {' '}
              Código{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="name"
              dataAlign="center"
              width={'250'}
            >
              {' '}
              Nombre{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="status"
              dataAlign="center"
              dataFormat={(cell, row) => this.DepartamentoStatus(cell, row)}
            >
              {' '}
              Estado{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'200'}
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
        <ModalDelete modaldel={this.state.ModalDel} ref="child2" />
        <ModalExport modalexport={this.state.ModalExport} ref="child4" />
      </div>
    );
  }
}

export default TableContentDepartamento;
