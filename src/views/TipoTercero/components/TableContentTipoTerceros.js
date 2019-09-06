import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ModalViewTipoTercero from './ModalViewTipoTercero';
import ModalDeleteTipoTercero from './ModalDeleteTipoTercero';
import ModalUpdateTipoTercero from './ModalEditTipoTercero';
import ModalExport from './ModalExportCSV';
import { Row, Col } from 'reactstrap';
import './../../../css/styleTableTTercero.css';
import './../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import { TYPETHIRDPARTYS } from './../../../services/EndPoints';
import moment from 'moment';

class TableContentTipoTerceros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      modaldelete: false,
      modaluptate: false,
      modalexport: false,
      dataTipoTercero: [],
      hiddenColumnID: true
    };
  }

  componentDidMount() {
    this.getDataTipoTercero();
  }

  getDataTipoTercero = () => {
    fetch(TYPETHIRDPARTYS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataTipoTercero: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  estadoTipoTercero = (cell, row) => {
    let status;
    if (row.status === 1) {
      status = <b className="text-success"> Activo </b>;
    } else if (row.status === 0) {
      status = <b className="text-danger"> Inactivo </b>;
    }
    return status;
  };

  FechaCreacionTipoTercero(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format('YYYY-MM-DD');
  }

  accionesTipoTercer = (cell, row) => {
    return (
      <div
        className="table-actionMenuTTercero"
        style={{ textAlign: 'center', padding: '0', marginRight: '50px' }}
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
      <div className="animated fadeIn">
        <Row>
          <Col sm={12}>
            <BootstrapTable
              options={options}
              data={this.state.dataTipoTercero}
              bordered={false}
              hover
              pagination
              search
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
                  this.FechaCreacionTipoTercero(cell, row)
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
                dataFormat={(cell, row) => this.estadoTipoTercero(cell, row)}
              >
                {' '}
                Estado{' '}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField={''}
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesTipoTercer(cell, row)}
              >
                {' '}
                Acciones{' '}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalViewTipoTercero modalview={this.state.modalView} ref={'child'} />
        <ModalUpdateTipoTercero
          modalupdate={this.state.modaluptate}
          ref={'child2'}
        />
        <ModalDeleteTipoTercero
          modaldelete={this.state.modaldelete}
          ref={'child3'}
        />
        <ModalExport modalexport={this.state.modalexport} ref={'child4'} />
      </div>
    );
  }
}

TableContentTipoTerceros.propTypes = {};

export default TableContentTipoTerceros;
