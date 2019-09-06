import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ModalView from './ModalViewTipoLlegada';
import ModalEdit from './ModalEditTipoLlegada';
import ModalDelete from './ModalDeleteTipoLlegada';
import ModalExport from './ModalExportCSV';
import PropTypes from 'prop-types';
import './../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import './../../../css/styleTableTipoLlegada.css';
import { TYPESHIPMENTARRIVAL } from './../../../services/EndPoints';
import moment from 'moment';

class TableTipoLlegada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalviewtipollegada: false,
      modaledittipollegada: false,
      modaldeletetipollegada: false,
      modalexport: false,
      dataTipoLlegada: [],
      hiddenColumnID: true
    };
  }

  componentDidMount() {
    this.getDataTipoLlegada();
  }
  getDataTipoLlegada = () => {
    fetch(TYPESHIPMENTARRIVAL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataTipoLlegada: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  accionesTipoLlegada = (cell, row) => {
    return (
      <div
        className="table-actionMenuTLlegada"
        style={{ textAlign: 'center', padding: '0', marginRight: '40px' }}
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
            this.openModalEdit(row.id);
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

  FechaCreacionTipoLlegada(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format('YYYY-MM-DD');
  }

  estadoTipoLlegada = (cell, row) => {
    let status;
    if (row.status === 1) {
      status = <b className="text-success"> Activo </b>;
    } else if (row.status === 0) {
      status = <b className="text-danger"> Inactivo </b>;
    }
    return status;
  };

  openModalView(id) {
    this.refs.child.toggle(id);
  }

  openModalEdit(id) {
    this.refs.child2.toggle(id);
  }

  openModalDelete(id) {
    this.refs.child3.toggle(id);
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
      <div>
        <Row>
          <Col sm="12">
            <BootstrapTable
              options={options}
              data={this.state.dataTipoLlegada}
              bordered={false}
              hover
              pagination
              search={true}
              striped
              searchPlaceholder="Buscar"
              exportCSV
              className="texto-TLlegada"
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
                dataField={'code'}
                dataAlign="center"
                width={'150'}
              >
                {' '}
                Código{' '}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField={'name'}
                dataAlign="center"
                width={'250'}
              >
                {' '}
                Nombre{' '}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField={'description'}
                dataAlign="center"
                width={'250'}
              >
                {' '}
                Descripción{' '}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataSort={true}
                dataField={'createdAt'}
                dataFormat={(cell, row) =>
                  this.FechaCreacionTipoLlegada(cell, row)
                }
                dataAlign="center"
                width={'100'}
              >
                Fecha de creación
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField={'status'}
                dataAlign="center"
                width={'120'}
                dataFormat={(cell, row) => this.estadoTipoLlegada(cell, row)}
              >
                {' '}
                Estado{' '}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={'150'}
                export={false}
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesTipoLlegada(cell, row)}
              >
                {' '}
                Acciones{' '}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalView modalview={this.state.modalviewtipollegada} ref={'child'} />
        <ModalEdit modaledit={this.state.modaledittipollegada} ref={'child2'} />
        <ModalDelete
          modaldelete={this.state.modaldeletetipollegada}
          ref={'child3'}
        />
        <ModalExport modalexport={this.state.modalexport} ref="child4" />
      </div>
    );
  }
}

TableTipoLlegada.propTypes = {};

export default TableTipoLlegada;
