import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
//import './styles/table_fixed.css';
import { CSVLink, CSVDownload } from 'react-csv';
import { Parser } from 'json2csv';
import { Trans } from 'react-i18next';

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
      `http://192.168.20.187:7000/api/sgdea/typeprocedure/export/data?username=${this.state.username}`,
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
        label: 'Name',
        value: 'name'
      },
      {
        label: 'Description',
        value: 'description'
      },
      {
        label: 'answerDays',
        value: 'answerDays'
      },
      {
        label: 'issue',
        value: 'issue'
      },
      {
        label: 'status',
        value: 'status'
      },
      {
          label: 'typeCorrespondence',
          value: 'typeCorrespondence'
      }, 
      {
          label: 'codeTemplate',
          value: 'codeTemplate'
      }
    ];

    const json2csvParser = new Parser({ fields, quote: '' });
    const csv = json2csvParser.parse(data);
    // console.log(csv);
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
           Exportar tipo de tramites
          </ModalHeader>
          <ModalBody>
            <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
              <thead className="">
                <tr className="">
                  <th>
                   código
                  </th>
                  <th>
                    nombre
                  </th>
                  <th>
                   descripción
                  </th>
                  <th>
                   respuesta
                  </th>
                  <th>
                   Asunto
                  </th>
                  <th>
                    Estado
                  </th>
                  <th>
                      tipo de correspondecia
                  </th>
                  <th>
                      codigo template
                  </th>
                </tr>
              </thead>
              <tbody className="text-justify">
                {data.map((aux, id) => {
                  return [
                    <tr key={id}>
                      <td>{aux.code}</td>
                      <td>{aux.name}</td>
                      <td>{aux.description}</td>
                      <td>{aux.answerDays}</td>
                      <td>{aux.issue}</td>
                      <td>{aux.status}</td>
                      <td>{aux.typeCorrespondence}</td>
                      <td>{aux.codeTemplate}</td>
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
              cerrar{' '}
            </button>

            <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" />{' '}
              Exportar csv
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

ModalExportCSV.propTypes = {
  t: PropTypes.any
};

export default ModalExportCSV;