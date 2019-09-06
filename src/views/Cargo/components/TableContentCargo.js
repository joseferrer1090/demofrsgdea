import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ModalView from './ViewCargoModal';
import ModalEdit from './ModalEditCargo';
import ModalDel from './ModalDeleteCargo';
import ModalExport from './ModalExportCSV';
import './../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import './../../../css/styleTableCargo.css';
import moment from 'moment';

class TableContentCargo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaledit: false,
      modaldelete: false,
      modalexport: false,
      dataCharge: [],
      HiddenColumn: true
    };
  }

  componentDidMount() {
    this.getDataCharge();
  }

  getDataCharge = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/charge/`, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + window.btoa('sgdea:123456'),
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCharge: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  CargoStatus = (cell, row) => {
    let status;
    if (row.status === 1) {
      status = <b className="text-success">Activo</b>;
    } else if (row.status === 0) {
      status = <b className="text-danger">Inactivo</b>;
    }
    return status;
  };

  FechaCreacionCargo(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format('YYYY-MM-DD');
  }

  accionesCargo(cell, row) {
    return (
      <div
        className="table-actionMenuCargo"
        style={{ textAlign: 'center', padding: '0', marginRight: '105px' }}
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
    this.refs.child1.toggle(id);
  }

  openModalEdit(id) {
    this.refs.child2.toggle(id);
  }

  openModalDelete(id) {
    this.refs.child3.toggle(id);
  }

  openModalExport() {
    this.refs.child4.toggle();
  }

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
        <Col md="12">
          <BootstrapTable
            options={options}
            striped
            hover
            search
            searchPlaceholder="Buscar"
            data={this.state.dataCharge}
            exportCSV
            pagination
            bordered={false}
            className="tableCargo texto-Cargo"
            // headerStyle={{ height: "55px" }}
          >
            <TableHeaderColumn
              dataAlign="center"
              dataField={'id'}
              isKey
              width={50}
              hidden={this.state.HiddenColumn}
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              dataAlign="center"
              dataField={'id'}
              dataFormat={this.indexN}
              width={50}
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn dataAlign="center" dataField="code" width={100}>
              {' '}
              Código{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataAlign="center"
              dataField="name"
              width={'100'}
            >
              Nombre
            </TableHeaderColumn>

            <TableHeaderColumn
              dataAlign="center"
              dataField="description"
              width={200}
            >
              {' '}
              Descripción{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataField={'createdAt'}
              dataFormat={(cell, row) => this.FechaCreacionCargo(cell, row)}
              dataAlign="center"
              width={'150'}
            >
              Fecha de creación
            </TableHeaderColumn>
            <TableHeaderColumn
              dataAlign="center"
              dataField="status"
              dataFormat={(cell, row) => this.CargoStatus(cell, row)}
              width="100"
            >
              {' '}
              Estado{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'200'}
              export={false}
              dataAlign="center"
              dataFormat={(cell, row) => this.accionesCargo(cell, row)}
            >
              {' '}
              Acciones{' '}
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>
        <ModalView modalviewcargo={this.state.modalview} ref="child1" />
        <ModalEdit modaleditcargo={this.state.modaledit} ref="child2" />
        <ModalDel modaldelete={this.state.modaldelete} ref="child3" />
        <ModalExport modalexport={this.state.modalexport} ref="child4" />
      </div>
    );
  }
}

export default TableContentCargo;
