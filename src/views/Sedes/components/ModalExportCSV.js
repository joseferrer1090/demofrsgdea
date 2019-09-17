import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import './styles/table_fixed.css';
import { CSVLink, CSVDownload } from 'react-csv';
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

  // componentDidMount() {
  //   this.getDataExportCSV();
  // }

  getDataExportCSV = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/headquarter/export/data?username=${this.state.username}`,
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
    const headers = [
      { label: 'code', key: 'code' },
      { label: 'name', key: 'name' },
      { label: 'description', key: 'description' },
      { label: 'status', key: 'status' }
    ];

    const records = data.map(aux => {
      return {
        code: aux.code,
        name: aux.name,
        description: aux.description,
        status: aux.status
      };
    });

    const fields = [
      {
        label: 'Code',
        value: 'code'
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
        label: 'Prefix',
        value: 'prefix'
      },
      {
        label: 'Sequence',
        value: 'sequence'
      },
      {
        label: 'Address',
        value: 'address'
      },
      {
        label: 'Phone',
        value: 'phone'
      },
      {
        label: 'Status',
        value: 'status'
      },
      {
        label: 'Code_Company',
        value: 'codeCompany'
      },
      {
        label: 'Code_Charge',
        value: 'codeCharge'
      },
      {
        label: 'Code_City',
        value: 'codeCity'
      }
    ];

    const json2csvParser = new Parser({ fields, quote: '' });
    const csv = json2csvParser.parse(data);
    // console.log(csv);
    // console.log(this.state.dataExport);
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {this.props.t('app_sedes_modal_export_titulo')}
          </ModalHeader>
          <ModalBody>
            <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
              <thead className="">
                <tr>
                  <th>{this.props.t('app_sedes_modal_export_codigo')}</th>
                  <th>{this.props.t('app_sedes_modal_export_nombre')}</th>
                  <th>{this.props.t('app_sedes_modal_export_descripcion')}</th>
                  <th>
                    {this.props.t('app_sedes_modal_export_pref_radicacion')}
                  </th>
                  <th>
                    {this.props.t('app_sedes_modal_export_sec_radicacion')}
                  </th>
                  <th>{this.props.t('app_sedes_modal_export_direccion')}</th>
                  <th>{this.props.t('app_sedes_modal_export_telefono')}</th>
                  <th>{this.props.t('app_sedes_modal_export_estado')}</th>
                  <th>{this.props.t('app_sedes_modal_export_empresa')}</th>
                  <th>{this.props.t('app_sedes_modal_export_cargo')}</th>
                  <th>{this.props.t('app_sedes_modal_export_ciudad')}</th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((aux, id) => {
                  return [
                    <tr key={id}>
                      <td>{aux.code}</td>
                      <td>{aux.name}</td>
                      <td>{aux.description}</td>
                      <td>{aux.prefix}</td>
                      <td>{aux.sequence}</td>
                      <td>{aux.address}</td>
                      <td>{aux.phone}</td>
                      <td>{aux.status}</td>
                      <td>{aux.codeCompany}</td>
                      <td>{aux.codeCharge}</td>
                      <td>{aux.codeCity}</td>
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
              {this.props.t('app_sedes_modal_export_boton_cerrar')}{' '}
            </button>

            <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" />{' '}
              {this.props.t('app_modal_export_boton_exportar')}
            </CSVLink>
            {/* <CSVDownload className="btn btn-secondary btn-sm" data={records}>
              {" "}
              <i className="fa fa-download" /> Exportar CSV{" "}
            </CSVDownload> */}
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

// ModalExportCSV.propTypes = {
//   modal: PropTypes.bool.isRequired
// };

export default ModalExportCSV;
