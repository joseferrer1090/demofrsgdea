import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ModalViewAditoria from './components/ModalViewAuditoria';
import ModalSearch from './components/ModalSearchAuditoria';
import './../../../node_modules/react-datepicker/dist/react-datepicker.css';
import './../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import './../../css/custom_calendar.css';
import './../../css/table_data.css';
import './components/customstyle.css';
import './../../css/styleTableAuditoria.css';
import styled from 'styled-components';
import moment from 'moment';
import { withTranslation } from 'react-i18next';

class Auditoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      modalviewauditoria: false,
      modalSearch: false,
      visible: false,
      dataAuditoria: [],
      dataProps: [],
      hiddenColumnId: true,
      page: '0',
      size: '10'
    };
  }

  componentDidMount() {
    this.getDataAudit();
  }

  getDataAudit = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/audit/pagination?page=${this.state.page}&size=${this.state.size}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + window.btoa('sgdea:123456')
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataAuditoria: data.content
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  accionVerAuditoria(cel, row) {
    return (
      <div
        className="table-actionMenuAuditoria"
        style={{ marginRight: '60px' }}
      >
        <button
          className="btn btn-secondary btn-sm "
          data-trigger="hover"
          onClick={() => {
            this.openModalView(row.id);
          }}
        >
          {' '}
          <i className="fa fa-eye" />{' '}
        </button>
      </div>
    );
  }

  createButtonCustom = props => {
    return (
      <div className="btn-group btn-group-sm">
        {props.exportCSVBtn}
        &nbsp;
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalSearch();
          }}
        >
          {' '}
          <i className="fa fa-pencil" />{' '}
          {this.props.t('app_auditoria_tabla_consulta_boton_consultar')}{' '}
        </button>
      </div>
    );
  };

  openModalView(id) {
    this.refs.child1.toggle(id);
  }

  openModalSearch() {
    this.refs.child2.toggle();
  }

  FechaAuditoria(cell, row) {
    let date;
    date = new Date(row.date);
    return moment(date).format('YYYY-MM-DD');
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  ModuloInfo = pageAction => {
    return !pageAction
      ? null
      : `<div>${pageAction.pageEntity.pageModule.name}</div>`;
  };
  EntidadInfo = pageAction => {
    return !pageAction ? null : `<div>${pageAction.pageEntity.name}</div>`;
  };
  AccionInfo = pageAction => {
    return !pageAction ? null : `<div>${pageAction.name}</div>`;
  };

  onDataFetch = data => {
    this.setState({
      dataAuditoria: data
    });
  };

  render() {
    const options = {
      btnGroup: this.createButtonCustom
    };

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <Card body>
              <BootstrapTable
                data={this.state.dataAuditoria}
                options={options}
                bordered={false}
                hover
                exportCSV
                search
                searchPlaceholder="Buscar"
                pagination
                striped
                className="tableAuditoria texto-Auditoria"
                // headerStyle={{ height: "39px" }}
              >
                {/* <TableHeaderColumn
                  export={false}
                  isKey={true}
                  dataField={'id'}
                  hidden={this.state.hiddenColumnId}
                /> */}
                <TableHeaderColumn
                  isKey={true}
                  dataField="date"
                  dataAlign="center"
                  dataFormat={(cell, row) => this.FechaAuditoria(cell, row)}
                  width={'180'}
                >
                  {' '}
                  {this.props.t('app_auditoria_tabla_fecha_auditoria')}{' '}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={this.ModuloInfo}
                  dataField="pageAction"
                  dataAlign="center"
                  width={'180'}
                >
                  {' '}
                  {this.props.t('app_auditoria_tabla_modulo')}{' '}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={this.EntidadInfo}
                  dataField="pageAction"
                  dataAlign="center"
                  width={'180'}
                >
                  {' '}
                  {this.props.t('app_auditoria_tabla_entidad')}{' '}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={this.AccionInfo}
                  dataField="pageAction"
                  dataAlign="center"
                  width={'180'}
                >
                  {' '}
                  {this.props.t('app_auditoria_tabala_accion')}{' '}
                </TableHeaderColumn>

                <TableHeaderColumn
                  width={'180'}
                  dataField="username"
                  dataAlign="center"
                >
                  {' '}
                  {this.props.t('app_auditoria_tabla_usuario')}{' '}
                </TableHeaderColumn>

                <TableHeaderColumn
                  width={'100'}
                  export={false}
                  dataAlign="center"
                  dataFormat={(cel, row) => this.accionVerAuditoria(cel, row)}
                >
                  {this.props.t('app_auditoria_tabla_acciones')}{' '}
                </TableHeaderColumn>
              </BootstrapTable>
            </Card>
          </div>
        </div>
        <ModalViewAditoria
          t={this.props.t}
          modalview={this.state.modalviewauditoria}
          ref={'child1'}
        />
        <ModalSearch
          t={this.props.t}
          onDataFetch={this.onDataFetch}
          modalSearch={this.state.modalSearch}
          ref={'child2'}
        />
      </div>
    );
  }
}

export default withTranslation('translations')(Auditoria);
