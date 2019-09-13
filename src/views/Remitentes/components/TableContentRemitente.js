import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Row, Col } from 'reactstrap';
import ModalView from './ModalViewRemitente';
import ModalUpdate from './ModalUpdateRemitente';
import ModalDel from './ModalDeleteRemitente';
import ModalExport from './ModalExportCSV';
import './../../../css/styleTableRemitente.css';
import './../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import moment from 'moment';
import { withTranslation } from 'react-i18next';
class TableContentRemitente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalViewRemitente: false,
      modalUpdateRemitente: false,
      modalDeleteRemitente: false,
      dataTercero: [],
      hiddenColumnID: true
    };
  }

  componentDidMount() {
    this.getDataTerceros();
  }

  getDataTerceros = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/thirdparty`, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + window.btoa('sgdea:123456'),
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          dataTercero: data
        });
      })
      .catch(Error => console.log('', Error));
  };

  FechaCreacionTercero(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format('YYYY-MM-DD');
  }

  accionesRemitente(cel, row) {
    return (
      <div
        className="table-actionMenuRemi"
        style={{ textAlign: 'center', padding: '0', marginRight: '30px' }}
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
            this.openModalDel(row.id);
          }}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  }

  EstadoRemitente(cell, row) {
    let status;
    if (row.status === 1) {
      status = (
        <b className="text-success">
          {' '}
          {this.props.t('app_tablas_estado_activo')}{' '}
        </b>
      );
    } else if (row.status === 0) {
      status = (
        <b className="text-danger">
          {' '}
          {this.props.t('app_tablas_estado_inactivo')}{' '}
        </b>
      );
    }
    return status;
  }

  openModalView(id) {
    this.refs.child.toggle(id);
  }

  openModalDel(id) {
    this.refs.child2.toggle(id);
  }

  openModalEdit(id) {
    this.refs.child3.toggle(id);
  }
  openModalExport() {
    this.refs.child4.toggle();
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  typeThirdParty = typeThirdParty => {
    return !typeThirdParty ? null : `<div>${typeThirdParty.name}</div>`;
  };
  createCustomButtonGroup = props => {
    return (
      <button
        type="button"
        className={`btn btn-secondary btn-sm`}
        onClick={() => this.openModalExport()}
      >
        <i className="fa fa-download" />{' '}
        {this.props.t('app_tercero_administrar_tabla_boton_exportar')}
      </button>
    );
  };

  render() {
    const options = {
      btnGroup: this.createCustomButtonGroup
    };
    const dataTerceros = this.state.dataTercero;
    const tipoTercero = this.state.tipoTercero;
    const { t } = this.props;
    return (
      <div className="animated fadeIn">
        <Col sm="12">
          <BootstrapTable
            options={options}
            data={dataTerceros}
            pagination
            search
            searchPlaceholder={t('app_tercero_adminstrar_tabla_placeholder')}
            hover
            striped
            bordered={false}
            exportCSV
            className="tableRemi texto-Remi"
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
              dataAlign="center"
              width={'50'}
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataFormat={this.typeThirdParty}
              dataField={'typeThirdParty'}
              dataAlign="center"
              width={'170'}
            >
              {' '}
              {t('app_tercero_adminstrar_tabla_TipoTercero')}{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={'identification'}
              dataAlign="center"
              width={'120'}
            >
              {' '}
              {t('app_tercero_adminstrar_tabla_identificacion')}{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={'name'}
              dataAlign="center"
              width={'150'}
            >
              {' '}
              {t('app_tercero_adminstrar_tabla_nombre')}{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={'email'}
              dataAlign="center"
              width={'200'}
            >
              {' '}
              {t('app_tercero_adminstrar_tabla_email')}{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataField={'createdAt'}
              dataFormat={(cell, row) => this.FechaCreacionTercero(cell, row)}
              dataAlign="center"
              width={'150'}
            >
              {t('app_tercero_adminstrar_tabla_fecha_creacion')}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'80'}
              dataField={'status'}
              dataAlign="center"
              dataFormat={(cell, row) => this.EstadoRemitente(cell, row)}
            >
              {' '}
              {t('app_tercero_adminstrar_tabla_estado')}{' '}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={'120'}
              export={false}
              dataAlign="center"
              dataFormat={(cell, row) => this.accionesRemitente(cell, row)}
              style={{ border: 'none' }}
            >
              {' '}
              {t('app_tercero_adminstrar_tabla_acciones')}{' '}
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>

        <ModalView
          t={this.props.t}
          modalview={this.state.modalViewRemitente}
          ref="child"
        />
        <ModalDel
          t={this.props.t}
          modaldel={this.state.modalDeleteRemitente}
          ref="child2"
        />
        <ModalUpdate
          t={this.props.t}
          modalupdate={this.state.modalUpdateRemitente}
          ref="child3"
        />
        <ModalExport
          t={this.props.t}
          modalExport={this.state.modalexport}
          ref={'child4'}
        />
      </div>
    );
  }
}

TableContentRemitente.propTypes = {};

export default withTranslation('translations')(TableContentRemitente);
