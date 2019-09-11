import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Row, Col, Badge } from 'reactstrap';
import ModalEdit from './ModalEditSedes';
import ModalView from './ModalViewSedes';
import ModalDelete from './ModalDeleteSedes';
import ModalExport from './ModalExportCSV';
import './../../../css/styleTableSedes.css';
import './../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import { HEADQUARTERS } from './../../../services/EndPoints';
import moment from 'moment';
import { withTranslation } from 'react-i18next';
class TableContentSedes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      modalEdit: false,
      modalDel: false,
      modalExport: false,
      dataHeadquarters: [],
      hiddenColumnId: true
    };
  }

  componentDidMount() {
    this.getDataHeadquarters();
  }

  getDataHeadquarters = () => {
    fetch(HEADQUARTERS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataHeadquarters: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  SedesStatus = (cell, row) => {
    let status;
    if (row.status === 1) status = <b className="text-success">Activo</b>;
    else if (row.status === 0) {
      status = <b className="text-danger">Inactivo</b>;
    }
    return status;
  };

  accionesSedes = (cell, row) => {
    return (
      <div className="table-actionMenuSedes" style={{ marginRight: '60px' }}>
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

  FechaCreacionSede(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format('YYYY-MM-DD');
  }

  createCustomButtonGroup = props => {
    return (
      <button
        type="button"
        className={`btn btn-secondary btn-sm`}
        onClick={() => this.openModalExport()}
      >
        <i className="fa fa-download" />{' '}
        {this.props.t('app_sedes_administrar_table_button_exportar')}
      </button>
    );
  };

  EmpresaInfo = company => {
    return !company ? null : `<div>${company.name}</div>`;
  };

  render() {
    const options = {
      btnGroup: this.createCustomButtonGroup
    };
    const { t } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <div className="">
              <BootstrapTable
                options={options}
                data={this.state.dataHeadquarters}
                search
                hover
                pagination
                bordered={false}
                striped
                searchPlaceholder={t('app_sedes_administrar_table_placeholder')}
                exportCSV
                className="tableSedes tableSedes1 texto-Sedes"
                // headerStyle={{ height: "55px" }}
              >
                <TableHeaderColumn
                  export={false}
                  isKey
                  dataField={'id'}
                  hidden={this.state.hiddenColumnId}
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
                  dataField={'company'}
                  dataFormat={this.EmpresaInfo}
                  dataAlign={'center'}
                  width={'200'}
                  dataSort={true}
                >
                  {' '}
                  {t('app_sedes_administrar_table_empresa')}{' '}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField={'code'}
                  dataAlign="center"
                  width={'120'}
                  dataSort={true}
                >
                  {t('app_sedes_administrar_table_codigo')}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField={'name'}
                  dataAlign="center"
                  width={'250'}
                  dataSort={true}
                >
                  {t('app_sedes_administrar_table_nombre')}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataSort={true}
                  dataField={'createdAt'}
                  dataFormat={(cell, row) => this.FechaCreacionSede(cell, row)}
                  dataAlign="center"
                  width={'140'}
                >
                  {t('app_sedes_administrar_table_fecha_creacion')}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField={'status'}
                  dataFormat={(cell, row) => this.SedesStatus(cell, row)}
                  dataAlign={'center'}
                  width={'120'}
                  dataSort={true}
                >
                  {' '}
                  {t('app_sedes_administrar_table_estado')}{' '}
                </TableHeaderColumn>
                <TableHeaderColumn
                  export={false}
                  dataAlign="center"
                  dataFormat={(cell, row) => this.accionesSedes(cell, row)}
                  style={{ border: 'none' }}
                >
                  {' '}
                  {t('app_sedes_administrar_table_acciones')}{' '}
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </Col>
        </Row>
        <ModalView
          t={this.props.t}
          modalview={this.state.modalView}
          ref="child"
        />
        <ModalEdit
          t={this.props.t}
          modaledit={this.state.modalEdit}
          updateTable={this.getDataHeadquarters}
          ref="child2"
        />
        <ModalDelete
          t={this.props.t}
          modaldel={this.state.modalDel}
          updateTable={this.getDataHeadquarters}
          ref="child3"
        />
        <ModalExport
          t={this.props.t}
          modalExport={this.state.modalExport}
          ref="child4"
        />
      </div>
    );
  }
}

TableContentSedes.propTypes = {};

export default withTranslation('translations')(TableContentSedes);
