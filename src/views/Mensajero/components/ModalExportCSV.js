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
      `http://192.168.10.180:7000/api/sgdea/messenger/export/data/ccuartas`,
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
        label: 'identification',
        value: 'identification'
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
      }
    ];

    const json2csvParser = new Parser({ fields, quote: '' });
    const csv = json2csvParser.parse(data);
    console.log(csv);
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Exportar tabla de mensajeros</ModalHeader>
          <ModalBody>
            <table className="table table-responsive  table-hover table-striped fixed_header">
              <thead className="">
                <tr>
                  <th>Identificación</th>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((aux, id) => {
                  return [
                    <tr key={id}>
                      <td>{aux.identification}</td>
                      <td>{aux.name}</td>
                      <td>{aux.description}</td>
                      <td>{aux.status}</td>
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
