import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";
import { CSVLink, CSVDownload } from "react-csv";
import { Parser } from "json2csv";

class ModalExportCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalexport,
      dataExport: [],
      username: "ccuartas"
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
      `http://192.168.10.180:7000/api/sgdea/conglomerate/export/data?username=${this.state.username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + window.btoa("sgdea:123456")
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataExport: data
        });
      })
      .catch(err => console.log("", err));
  };
  render() {
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Exportar usuarios</ModalHeader>
          <ModalBody>
            <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
              <thead className="">
                <tr className="">
                  <th>cabeza 1</th>
                  <th>cabeza 2</th>
                  <th>cabeza 3</th>
                  <th>cabeza 4</th>
                  <th>cabeza 5</th>
                  <th>cabeza 6</th>
                </tr>
              </thead>
              <tbody className="text-justify">
                {/* {data.map((aux, id) => {
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
                })} */}
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
              {" "}
              <i className="fa fa-times" /> Cerrar
            </button>

            {/* <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" /> Descargar CSV
            </CSVLink> */}
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

export default ModalExportCSV;
