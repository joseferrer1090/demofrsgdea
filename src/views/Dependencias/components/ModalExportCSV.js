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
      dataExport: []
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
    fetch(
      `http://192.168.10.180:7000/api/sgdea/dependence/export/data/jferrer`,
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
        label: 'code',
        value: 'code'
      },
      {
        label: 'name',
        value: 'name'
      },
      {
        label: 'description',
        value: 'description'
      },
      {
        label: 'status',
        value: 'status'
      },
      {
        label: 'code_headquarter',
        value: 'codeHeadquarter'
      },
      {
        label: 'code_charge',
        value: 'codeCharge'
      }
    ];

    const json2csvParser = new Parser({ fields, quote: '' });
    const csv = json2csvParser.parse(data);
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Exportar tabla de dependencia</ModalHeader>
          <ModalBody>
            <table className="table table-responsive  table-hover table-striped fixed_header">
              <thead className="">
                <tr>
                  <th>Codigo</th>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Estado</th>
                  <th>Sede</th>
                  <th>Cargo</th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((aux, id) => {
                  return [
                    <tr key={id}>
                      <td>{aux.code}</td>
                      <td>{aux.name}</td>
                      <td>{aux.description}</td>
                      <td>{aux.status}</td>
                      <td>{aux.codeHeadquarter}</td>
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
              <i className="fa fa-times" /> Cerrar{' '}
            </button>

            <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" /> Exportar CSV
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
