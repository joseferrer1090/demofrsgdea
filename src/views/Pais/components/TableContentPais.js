import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ModalView from './ModalViewPais';
import ModalEdit from './ModalEditPais';
import ModalDelete from './ModalDeletePais';
import ModalExport from './ModalExportCSV';
import './../../../css/styleTablePais.css';
import './../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import { COUNTRIES } from './../../../services/EndPoints';

class TableContentPais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalViewPais: false,
      ModalEdit: false,
      ModalDel: false,
      modalexport: false,
      dataPais: [],
      hiddenColumnID: true
    };
  }

  componentDidMount() {
    this.getDataPais();
  }

  getDataPais = () => {
    fetch(COUNTRIES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataPais: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  EstadoPais(cell, row) {
    let status;
    if (row.status === 1) {
      status = <b className="text-success">Activo</b>;
    } else if (row.status === 0) {
      status = <b className="text-danger">Inactivo</b>;
    }
    return status;
  }

  accionesPais(cell, row) {
    return (
      <div
        className="table-actionMenuPais"
        style={{ textAlign: 'center', padding: '0', marginRight: '95px' }}
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
            data={this.state.dataPais}
            hover
            bordered={false}
            // headerStyle={{ height: "39px" }}
            className="tablePais texto-Pais"
          >
            <TableHeaderColumn
              export={false}
              isKey
              dataField={'id'}
              hidden={this.state.hiddenColumnID}
            />
            <TableHeaderColumn
              dataSort={true}
              dataFormat={this.indexN}
              width={'50'}
              dataField={'id'}
              dataAlign="center"
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="code"
              dataAlign="center"
              width={'150'}
            >
              {' '}
              Código{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="name"
              dataAlign="center"
              width={'300'}
            >
              {' '}
              Nombre{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="status"
              dataAlign="center"
              dataFormat={(cell, row) => this.EstadoPais(cell, row)}
            >
              {' '}
              Estado{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'250'}
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
        <ModalExport modalexport={this.state.modalexport} ref="child4" />
      </div>
    );
  }
}

export default TableContentPais;
