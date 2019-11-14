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
      `http://192.168.10.180:8090/api/sgdea/service/configuration/email/accounts/filing/export/data?username=${this.state.username}`,
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
    console.log(data);
    const fields = [
      {
        label: 'protocol',
        value: 'protocol'
      },
      {
        label: 'host',
        value: 'host'
      },
      {
        label: 'port',
        value: 'port'
      },
      {
        label: 'email',
        value: 'email'
      },
      {
        label: 'status',
        value: 'status'
      }
    ];

    const json2csvParser = new Parser({ fields, quote: '' });
    const csv = json2csvParser.parse(data);
    // console.log(csv);
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {this.props.t('app_mensajero_modal_export_titulo')}
          </ModalHeader>
          <ModalBody>
            <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
              <thead className="">
                <tr>
                  <th>Protocolo</th>
                  <th>Host</th>
                  <th>Puerto</th>
                  <th>Email</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((aux, id) => {
                  const statusRadicacionEmail = data => {
                    let status;
                    if (data === true) {
                      status = <b className="text-success"> Activo</b>;
                    } else if (data === false) {
                      status = <b className="text-danger"> Inactivo</b>;
                    }
                    return status;
                  };
                  return [
                    <tr key={id}>
                      <td>{aux.protocol}</td>
                      <td>{aux.host}</td>
                      <td>{aux.port}</td>
                      <td>{aux.email}</td>
                      <td>{statusRadicacionEmail(aux.status)}</td>
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
              {this.props.t('app_mensajero_modal_export_table_boton_cerrar')}{' '}
            </button>

            <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" />{' '}
              {this.props.t('app_mensajero_modal_export_table_boton_exportar')}
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
