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
      t: this.props.t
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  componentDidMount() {
    this.getDataExportCSV();
  }

  getDataExportCSV = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/company/export/data/ccuartas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'BASIC ' + window.btoa('sgdea:123456')
      }
    })
      .then(response =>
        response.json().then(data => {
          this.setState({
            dataExport: data
          });
        })
      )
      .catch(error => console.log(' ', error));
  };

  // createFileCSV = () => {
  //   const data = this.state.dataExport;
  //   const createCsvWriter = require("csv-writer").createObjectCsvWriter;
  //   const csvWriter = createCsvWriter({
  //     path: "/public/conglomerado.csv",
  //     header: [
  //       { id: "code", title: "code" },
  //       { id: "name", title: "name" },
  //       { id: "description", title: "description" },
  //       { id: "status", title: "status" }
  //     ]
  //   });

  //   const records = data.map(aux => {
  //     return {
  //       code: aux.code,
  //       name: aux.name,
  //       description: aux.description,
  //       status: aux.status
  //     };
  //   });

  //   csvWriter.writeRecords(records).then(() => {
  //     console.log("...Done");
  //   });

  //   // console.log(csvStringifier.getHeaderString());
  //   // => 'NAME,LANGUAGE\n'
  //   // console.log(csvStringifier.stringifyRecords(records));
  //   // => 'Bob,"French, English"\nMary,English\n'
  //   console.log(data);
  // };

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
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {this.props.t('app_empresa_modal_exportar_titulo')}
          </ModalHeader>
          <ModalBody>
            <table className="table table-responsive  table-hover table-striped fixed_header">
              <thead className="">
                <tr>
                  <th>{this.props.t('app_empresa_modal_exportar_codigo')}</th>
                  <th>{this.props.t('app_empresa_modal_exportar_nit')}</th>
                  <th>{this.props.t('app_empresa_modal_exportar_nombre')}</th>
                  <th>
                    {this.props.t('app_empresa_modal_exportar_descripcion')}
                  </th>
                  <th>{this.props.t('app_empresa_modal_exportar_estado')}</th>
                  <th>
                    {this.props.t(
                      'app_empresa_modal_exportar_codigo_conglomerado'
                    )}
                  </th>
                  <th>
                    {this.props.t('app_empresa_modal_exportar_codigo_ciudad')}
                  </th>
                  <th>{this.props.t('app_empresa_modal_exportar_cargo')}</th>
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
              {this.props.t('app_empresa_modal_exportar_boton_cerrar')}{' '}
            </button>

            <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" />{' '}
              {this.props.t('app_empresa_modal_exportar_boton_exportar')}
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
