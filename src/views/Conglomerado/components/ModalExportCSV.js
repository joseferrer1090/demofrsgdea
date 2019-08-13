import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import CSVDownload from "react-json-to-csv";
import "./styles/table_fixed.css";

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
      `http://192.168.10.180:7000/api/sgdea/conglomerate/export/data/jferrer`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "BASIC " + window.btoa("sgdea:123456")
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
      .catch(error => console.log(" ", error));
  };

  render() {
    const data = this.state.dataExport;
    console.log(data);
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Exportar tabla de conglomerado</ModalHeader>
          <ModalBody>
            <table className="table table-responsive  table-hover table-striped fixed_header">
              <thead className="">
                <tr>
                  <th>Codigo</th>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Estado</th>
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
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
            <CSVDownload
              className="btn btn-secondary btn-sm"
              data={this.state.dataExport}
            >
              {" "}
              <i className="fa fa-download" /> Exportar CSV{" "}
            </CSVDownload>
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
