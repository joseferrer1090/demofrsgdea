import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import './styles/table_fixed.css';
import { CSVLink, CSVDownload } from 'react-csv';
import { Parser } from 'json2csv';
import { Trans } from 'react-i18next';

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
    fetch(
      `http://192.168.10.180:7000/api/sgdea/conglomerate/export/data/jferrer`,
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
        label: 'Code_Charge',
        value: 'codeCharge'
      },
      {
        label: 'Code_City',
        value: 'codeCity'
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
            {this.props.t('app_conglomerado_modal_export_titulo')}
          </ModalHeader>
          <ModalBody>
            <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
              <thead className="">
                <tr className="">
                  <th>
                    {this.props.t('app_conglomerado_modal_export_tabla_codigo')}
                  </th>
                  <th>
                    {this.props.t('app_conglomerado_modal_export_tabla_nombre')}
                  </th>
                  <th>
                    {this.props.t(
                      'app_conglomerado_modal_export_tabla_descripcion'
                    )}
                  </th>
                  <th>
                    {this.props.t('app_conglomerado_modal_export_tabla_cargo')}
                  </th>
                  <th>
                    {this.props.t('app_conglomerado_modal_export_tabla_ciudad')}
                  </th>
                  <th>
                    {this.props.t('app_conglomerado_modal_export_tabla_estado')}
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
                      <td>{aux.codeCharge}</td>
                      <td>{aux.codeCity}</td>
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
              <i className="fa fa-times" />{' '}
              {this.props.t('app_conglomerado_modal_export_cerrar')}{' '}
            </button>

            <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" />{' '}
              {this.props.t('app_conglomerado_modal_export_boton')}
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
