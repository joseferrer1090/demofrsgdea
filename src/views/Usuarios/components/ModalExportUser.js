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
      `http://192.168.10.180:7000/api/sgdea/user/export/data?username=${this.state.username}`,
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
    const data = this.state.dataExport;
    const fields = [
      {
        label: "identification",
        value: "identification"
      },
      {
        label: "Name",
        value: "name"
      },
      {
        label: "email",
        value: "email"
      },
      {
        label: "phone",
        value: "phone"
      },
      {
        label: "address",
        value: "address"
      },
      {
        label: "birthDate",
        value: "birthDate"
      },
      {
        label: "username",
        value: "username"
      },
      {
        label: "enabled",
        value: "enabled"
      },
      {
        label: "codeDependence",
        value: "codeDependence"
      },
      {
        label: "codeCharge",
        value: "codeCharge"
      }
    ];

    const json2csvParser = new Parser({ fields, quote: "" });
    const csv = json2csvParser.parse(data);
    // console.log(csv);
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Exportar usuarios</ModalHeader>
          <ModalBody>
            <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
              <thead className="">
                <tr className="">
                  <th>identificacion</th>
                  <th>nombre</th>
                  <th>email</th>
                  <th>telefono</th>
                  <th>direccion</th>
                  <th>fecha de nacimiento</th>
                  <th>usuario</th>
                  <th>estado</th>
                  <th>dependencia</th>
                  <th>cargo</th>
                </tr>
              </thead>
              <tbody className="text-justify">
                {data.map((aux, id) => {
                  return [
                    <tr key={id}>
                      <td>{aux.identification}</td>
                      <td>{aux.name}</td>
                      <td>{aux.email}</td>
                      <td>{aux.phone}</td>
                      <td>{aux.address}</td>
                      <td>{aux.birthDate}</td>
                      <td>{aux.username}</td>
                      <td>{aux.enabled}</td>
                      <td>{aux.codeDependence}</td>
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
              {" "}
              <i className="fa fa-times" /> Cerrar
            </button>

            <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" /> Descargar CSV
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

export default ModalExportCSV;
