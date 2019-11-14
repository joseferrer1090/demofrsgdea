import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Row, Col } from 'reactstrap';
import './../../../css/styleTableRadicacionEmail.css';
import './../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import ModalViewRadicacionEmail from './ModalViewRadicacionEmail';
import ModalUpdateRadicacionEmail from './ModalUpdateRadicacionEmail';
import ModalDeleteRadicacionEmail from './ModalDeleteRadicacionEmail';
import ModalExportCSV from './ModalExportCSV';
import moment from 'moment';
import { withTranslation } from 'react-i18next';

class TableContentRadicacionEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      modalUpdate: false,
      modaldelte: false,
      modalexport: false,
      dataRadicacionEmail: [],
      hiddenColumnID: true
    };
  }

  componentDidMount() {
    this.getDataRadicacionEmail();
  }

  getDataRadicacionEmail = () => {
    fetch(
      'http://192.168.10.180:8090/api/sgdea/service/configuration/email/accounts/filing',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzM3NjY0OTksInVzZXJfbmFtZSI6ImNjdWFydGFzIiwiYXV0aG9yaXRpZXMiOlsiQVNJU1RFTlRFIEFETUlOSVNUUkFUSVZPIl0sImp0aSI6IjkxMGRhYzBjLTgyODEtNDFlYi1iNzM2LWU1ZWQ1OTUxZmE5MyIsImNsaWVudF9pZCI6ImZyb250ZW5kYXBwIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.l165cU9w7Yl8eDgKdrYgZ-ZQOazEthA4Cx1jFEpQDjs'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataRadicacionEmail: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  accionesRadicacionEmail(cell, row) {
    return (
      <div className="table-actionMenuMensj" style={{ marginRight: '40px' }}>
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
            this.openModalUpdate(row.id);
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
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  }

  EstadoRadicacionEmail = (cell, row) => {
    let status;
    console.log(row.status);
    if (row.status === true) {
      status = <b className="text-success"> Activo </b>;
    } else if (row.status === false) {
      status = <b className="text-danger"> Inactivo </b>;
    }
    return status;
  };

  FechaCreacionRadicacionEmail(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format('YYYY-MM-DD');
  }

  openModalView = id => {
    this.refs.child.toggle(id);
  };

  openModalUpdate = id => {
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
        <i className="fa fa-download" /> Exportar
      </button>
    );
  };

  render() {
    const options = {
      btnGroup: this.createCustomButtonGroup
    };
    const { t } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12">
            <BootstrapTable
              options={options}
              data={this.state.dataRadicacionEmail}
              bordered={false}
              hover
              striped
              pagination
              search={true}
              exportCSV
              searchPlaceholder={'Buscar'}
              className="tableMensj texto-Mensj"
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
                dataField="protocol"
                dataAlign="center"
                width={'100'}
              >
                Protocolo
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="host"
                dataAlign="center"
                width={'120'}
              >
                Host
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="port"
                dataAlign="center"
                width={'100'}
              >
                Puerto
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="email"
                dataAlign="center"
                width={'200'}
              >
                Email
              </TableHeaderColumn>
              <TableHeaderColumn
                dataSort={true}
                dataField={'createdAt'}
                dataFormat={(cell, row) =>
                  this.FechaCreacionRadicacionEmail(cell, row)
                }
                dataAlign="center"
                width={'150'}
              >
                Fecha de creación
              </TableHeaderColumn>
              <TableHeaderColumn
                width={'100'}
                dataField="status"
                dataAlign="center"
                dataFormat={(cell, row) =>
                  this.EstadoRadicacionEmail(cell, row)
                }
              >
                {' '}
                Estado
              </TableHeaderColumn>
              <TableHeaderColumn
                width={'120'}
                export={false}
                dataAlign="center"
                dataFormat={(cell, row) =>
                  this.accionesRadicacionEmail(cell, row)
                }
              >
                {' '}
                Acciones
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalViewRadicacionEmail
          t={this.props.t}
          modalview={this.state.modalView}
          ref={'child'}
        />
        <ModalUpdateRadicacionEmail
          t={this.props.t}
          modalupdate={this.state.modalUpdate}
          updateTable={this.getDataRadicacionEmail}
          ref={'child2'}
        />

        <ModalDeleteRadicacionEmail
          t={this.props.t}
          modaldelete={this.state.modaldelte}
          updateTable={this.getDataRadicacionEmail}
          ref={'child3'}
        />
        <ModalExportCSV
          t={this.props.t}
          modalexport={this.state.modalexport}
          ref={'child4'}
        />
      </div>
    );
  }
}

TableContentRadicacionEmail.propTypes = {};

export default withTranslation('translations')(TableContentRadicacionEmail);
