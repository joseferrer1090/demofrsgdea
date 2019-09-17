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
import moment from 'moment';
import { withTranslation } from 'react-i18next';

class TableContentEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaledit: false,
      modaldel: false,
      modalexport: false,
      dataCompanys: this.props.updateTable,
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
        this.setState({
          dataCompanys: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  accionesEmpresa = (cel, row) => {
    return (
      <div className="table-actionMenuEmpre" style={{ marginRight: '40px' }}>
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

  FechaCreacionEmpresa(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format('YYYY-MM-DD');
  }

  EstadoEmpresa(cell, row) {
    let status;
    if (row.status === 1) {
      status = (
        <b className="text-success">
          {this.props.t('app_tablas_estado_activo')}
        </b>
      );
    } else if (row.status === 0) {
      status = (
        <b className="text-danger">
          {this.props.t('app_tablas_estado_inactivo')}
        </b>
      );
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
        <i className="fa fa-download" />{' '}
        {this.props.t('app_empresa_administrar_table_boton_exportar')}
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
    const { t } = this.props;
    const data = this.state.dataCompanys;
    return (
      <div className="animated fadeIn">
        <Col md="12">
          <BootstrapTable
            options={options}
            data={data}
            pagination
            search={true}
            exportCSV
            hover
            striped
            bordered={false}
            searchPlaceholder={t('app_empresa_administrar_table_placeholder')}
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
              {t('app_empresa_administrar_table_conglomerado')}
            </TableHeaderColumn>

            <TableHeaderColumn
              width={'120'}
              dataSort={true}
              dataField={'code'}
              dataAlign="center"
            >
              {t('app_empresa_administrar_table_codigo')}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'100'}
              dataSort={true}
              dataField={'nit'}
              dataAlign="center"
            >
              {t('app_empresa_administrar_table_nit')}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'200'}
              dataSort={true}
              dataField={'name'}
              dataAlign="center"
            >
              {t('app_empresa_administrar_table_nombre')}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataField={'createdAt'}
              dataFormat={(cell, row) => this.FechaCreacionEmpresa(cell, row)}
              dataAlign="center"
              width={'140'}
            >
              {t('app_empresa_administrar_table_fecha_creacion')}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataField={'status'}
              dataAlign="center"
              dataFormat={(cell, row) => this.EstadoEmpresa(cell, row)}
            >
              {t('app_empresa_administrar_table_estado')}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'150'}
              export={false}
              dataAlign="center"
              dataFormat={(cell, row) => this.accionesEmpresa(cell, row)}
              style={{ border: 'none' }}
            >
              {t('app_empresa_administrar_table_acciones')}
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>

        <ModalView
          t={this.props.t}
          modalviewempesa={this.state.modalview}
          ref={'child'}
        />
        <ModalEdit
          t={this.props.t}
          modaleditempresa={this.state.modaledit}
          ref={'child2'}
          updateTable={this.getDataCompany}
        />
        <ModalDel
          t={this.props.t}
          modaldelempresa={this.state.modaldel}
          updateTable={this.getDataCompany}
          ref="child3"
        />
        <ModalExport
          t={this.props.t}
          modalexport={this.state.modalexport}
          ref="child4"
        />
      </div>
    );
  }
}

TableContentEmpresa.propTypes = {};

export default withTranslation('translations')(TableContentEmpresa);
