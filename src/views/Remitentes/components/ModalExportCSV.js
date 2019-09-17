import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import './styles/tables_fixed.css';
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
      `http://192.168.10.180:7000/api/sgdea/thirdparty/export/data?username=${this.state.username}`,
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
          console.log(data);
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
      { label: 'status', key: 'status' },
      { label: 'codeHeadquarter', key: 'codeHeadquarter' },
      { label: 'codeCharge', key: 'codeCharge' }
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
        label: 'identification',
        value: 'identification'
      },
      {
        label: 'name',
        value: 'name'
      },
      {
        label: 'status',
        value: 'status'
      },
      {
        label: 'email',
        value: 'email'
      },
      {
        label: 'landline',
        value: 'landline'
      },
      {
        label: 'cellPhone',
        value: 'cellPhone'
      },
      {
        label: 'codeCity',
        value: 'codeCity'
      },
      {
        label: 'address',
        value: 'address'
      },
      {
        label: 'reference',
        value: 'reference'
      },
      {
        label: 'observation',
        value: 'observation'
      },
      {
        label: 'status',
        value: 'status'
      },
      {
        label: 'communicationElement',
        value: 'communicationElement'
      },
      {
        label: 'codeTypeThirdParty',
        value: 'codeTypeThirdParty'
      }
    ];

    const json2csvParser = new Parser({ fields, quote: '' });
    const csv = json2csvParser.parse(data);
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {this.props.t('app_tercero_modal_export_titulo')}
          </ModalHeader>
          <ModalBody>
            <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
              <thead className="">
                <tr>
                  <th>
                    {this.props.t(
                      'app_tercero_modal_export_table_identification'
                    )}
                  </th>
                  <th>
                    {this.props.t('app_tercero_modal_export_table_nombre')}
                  </th>
                  <th>
                    {this.props.t('app_tercero_modal_export_table_email')}
                  </th>
                  <th>
                    {this.props.t('app_tercero_modal_export_table_telFijo')}
                  </th>
                  <th>
                    {this.props.t('app_tercero_modal_export_table_telCelular')}
                  </th>
                  <th>
                    {this.props.t(
                      'app_tercero_modal_export_table_codigo_ciudad'
                    )}
                  </th>
                  <th>
                    {this.props.t('app_tercero_modal_export_table_direccion')}
                  </th>
                  <th>
                    {this.props.t('app_tercero_modal_export_table_referencia')}
                  </th>
                  <th>
                    {this.props.t('app_tercero_modal_export_table_observacion')}
                  </th>
                  <th>
                    {this.props.t('app_tercero_modal_export_table_estado')}
                  </th>
                  <th>
                    {this.props.t(
                      'app_tercero_modal_export_table_elmento_comunicacion'
                    )}
                  </th>
                  <th>
                    {this.props.t(
                      'app_tercero_modal_export_table_codigo_TipoTercero'
                    )}
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((aux, id) => {
                  return [
                    <tr key={id}>
                      <td>{aux.identification}</td>
                      <td>{aux.name}</td>
                      <td>{aux.email}</td>
                      <td>{aux.landline}</td>
                      <td>{aux.cellPhone}</td>
                      <td>{aux.codeCity}</td>
                      <td>{aux.address}</td>
                      <td>{aux.reference}</td>
                      <td>{aux.observation}</td>
                      <td>{aux.status}</td>
                      <td>{aux.communicationElement}</td>
                      <td>{aux.codeTypeThirdParty}</td>
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
              {this.props.t('app_tercero_modal_export_table_boton_cerrar')}{' '}
            </button>

            <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" />{' '}
              {this.props.t('app_tercero_modal_export_table_boton_exportar')}
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
