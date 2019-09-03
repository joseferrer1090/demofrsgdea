import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ModalView from './ModalViewEmpresa';
import ModalEdit from './ModalEditEmpresa';
import ModalDel from './ModalDeleteEmpresa';
import ModalExport from './ModalExportCSV';
import { Row, Col } from 'reactstrap';
import './../../../css/styleTableEmpresa.css';
import './../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import { COMPANYS } from './../../../services/EndPoints';

class TableContentEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaledit: false,
      modaldel: false,
      modalexport: false,
      dataCompanys: [],
      hiddenColumnID: true
    };
  }

  componentDidMount() {
    this.getDataCompany();
  }

  getDataCompany = () => {
    fetch(COMPANYS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          dataCompanys: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  accionesEmpresa = (cel, row) => {
    return (
      <div className="table-actionMenuEmpre" style={{ marginRight: '60px' }}>
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
  };

  EstadoEmpresa(cell, row) {
    let status;
    if (row.status === 1) {
      status = <b className="text-success">Activo</b>;
    } else if (row.status === 0) {
      status = <b className="text-danger">Inactivo</b>;
    }
    return status;
  }

  openModalView = id => {
    this.refs.child.toggle(id);
  };

  openModalEdit = id => {
    this.refs.child2.toggle(id);
  };

  openModalDelete = id => {
    this.refs.child3.toggle(id);
  };

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

  ConglomerateInfo = conglomerate => {
    return !conglomerate ? null : `<div>${conglomerate.name}</div>`;
  };
  render() {
    const options = {
      btnGroup: this.createCustomButtonGroup
    };
    console.log(this.state.dataCompanys);
    return (
      <div className="animated fadeIn">
        <Col md="12">
          <BootstrapTable
            options={options}
            data={this.state.dataCompanys}
            pagination
            search={true}
            exportCSV
            hover
            striped
            bordered={false}
            searchPlaceholder="Buscar"
            className="tableEmpre tableEmpre1 texto-Empre"
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
              dataField={'id'}
              width={'50'}
              dataAlign="center"
            >
              #
            </TableHeaderColumn>

            <TableHeaderColumn
              width={'200'}
              dataSort={true}
              dataField={'conglomerate'}
              dataAlign="center"
              dataFormat={this.ConglomerateInfo}
            >
              Conglomerado
            </TableHeaderColumn>

            <TableHeaderColumn
              width={'80'}
              dataSort={true}
              dataField={'code'}
              dataAlign="center"
            >
              Código
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'200'}
              dataSort={true}
              dataField={'nit'}
              dataAlign="center"
            >
              Nit
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataField={'name'}
              dataAlign="center"
            >
              Nombre
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataField={'status'}
              dataAlign="center"
              dataFormat={(cell, row) => this.EstadoEmpresa(cell, row)}
            >
              Estado
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'190'}
              export={false}
              dataAlign="center"
              dataFormat={(cell, row) => this.accionesEmpresa(cell, row)}
              style={{ border: 'none' }}
            >
              Acciones
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>

        <ModalView modalviewempesa={this.state.modalview} ref={'child'} />
        <ModalEdit modaleditempresa={this.state.modaledit} ref={'child2'} />
        <ModalDel modaldelempresa={this.state.modaldel} ref="child3" />
        <ModalExport modalexport={this.state.modalexport} ref="child4" />
      </div>
    );
  }
}

TableContentEmpresa.propTypes = {};

export default TableContentEmpresa;
