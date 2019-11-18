import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './styles/table_fixed.css';
import { CSVLink } from 'react-csv';
import { Parser } from 'json2csv';

class ModalExportCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalexport,
      dataExport: [],
      t: this.props.t,
      username: 'ccuartas'
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.getDataExportCSV();
  };

  getDataExportCSV = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/company/export/data?username=${this.state.username}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'BASIC ' + window.btoa('sgdea:123456')
        }
      }
    )
      .then(response =>
        response.json().then(data => {
          this.setState({
            dataExport: data
          });
        })
      )
      .catch(error => console.log(' ', error));
  };

  render() {
    const data = this.state.dataExport;

    const fields = [
      {
        label: 'Code',
        value: 'code'
      },
      {
        label: 'Nit',
        value: 'nit'
      },
      {
        label: 'Name',
        value: 'name'
      },
      {
        label: 'Description',
        value: 'description'
      },
      {
        label: 'status',
        value: 'status'
      },
      {
        label: 'Code_Conglomerate',
        value: 'codeConglomerate'
      },
      {
        label: 'Code_City',
        value: 'codeCity'
      },
      {
        label: 'Code_Charge',
        value: 'codeCharge'
      }
    ];

    const json2csvParser = new Parser({ fields, quote: '' });
    const csv = json2csvParser.parse(data);
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>{t('app_empresa_modal_exportar_titulo')}</ModalHeader>
          <ModalBody>
            <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
              <thead className="">
                <tr>
                  <th>{t('app_empresa_modal_exportar_codigo')}</th>
                  <th>{t('app_empresa_modal_exportar_nit')}</th>
                  <th>{t('app_empresa_modal_exportar_nombre')}</th>
                  <th>{t('app_empresa_modal_exportar_descripcion')}</th>
                  <th>{t('app_empresa_modal_exportar_estado')}</th>
                  <th>{t('app_empresa_modal_exportar_codigo_conglomerado')}</th>
                  <th>{t('app_empresa_modal_exportar_codigo_ciudad')}</th>
                  <th>{t('app_empresa_modal_exportar_cargo')}</th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((aux, id) => {
                  return [
                    <tr key={id}>
                      <td>{aux.code}</td>
                      <td>{aux.nit}</td>
                      <td>{aux.name}</td>
                      <td>{aux.description}</td>
                      <td>{aux.status}</td>
                      <td>{aux.codeConglomerate}</td>
                      <td>{aux.codeCity}</td>
                      <td>{aux.codeCharge}</td>
                    </tr>
                  ];
                })}
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {' '}
              <i className="fa fa-times" />{' '}
              {t('app_empresa_modal_exportar_boton_cerrar')}{' '}
            </button>

            <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" />{' '}
              {t('app_empresa_modal_exportar_boton_exportar')}
            </CSVLink>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default ModalExportCSV;
