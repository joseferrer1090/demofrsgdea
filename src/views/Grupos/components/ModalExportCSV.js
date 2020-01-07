import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";
import PropTypes from "prop-types";
//import './styles/table_fixed.css';
import { CSVLink, CSVDownload } from "react-csv";
import { Parser } from "json2csv";
import { GROUPUSERS_EXPORT_USERS } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";
//const XMLHttpRequest = require("xmlhttprequest");

class ModalExportCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalexport,
      dataExport: [],
      username: "ccuartas",
      id: this.props.id,
      auth: this.props.authorization
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    this.getDataExportCSV(id);
  };
  //http://192.168.10.180:7000/api/sgdea/groupuser/export/${id}/users?username=${username.user_name}
  getDataExportCSV = id => {
    const auth = this.state.auth;
    const username = decode(auth);
    console.log(auth);
    fetch(
      `${GROUPUSERS_EXPORT_USERS}${id}/users?username=${username.user_name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.auth
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataExport: data
        });
      })
      .catch(err => console.log("Error", err));

    // const xhttp = new XMLHttpRequest();

    // xhttp.onreadystatechange = function(e){
    //     if (xhttp.readyState === 4 && xhttp.status === 200){
    //         console.log("ok, response :", this.response);
    //         this.setState({
    //         dataExport: this.response
    //         });
    //     }
    // }

    // xhttp.open("get",`http://192.168.10.180:7000/api/sgdea/groupuser/export/${id}/users?username=${this.state.username}`, true);
    // xhttp.setRequestHeader("Content-Type", "application/json");
    // xhttp.setRequestHeader("Authorization", `Basic ` + window.btoa('sgdea:123456'));
  };

  render() {
    const data = this.state.dataExport;
    const fields = [
      {
        label: "identification",
        value: "identification"
      },
      {
        label: "name",
        value: "name"
      },
      {
        label: "email",
        value: "email"
      },
      {
        label: "codeGroupUser",
        value: "codeGroupUser"
      }
    ];

    const json2csvParser = new Parser({ fields, quote: "" });
    const csv = json2csvParser.parse(data);
    // console.log(csv);
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Modal Exportar Grupo</ModalHeader>
          <ModalBody>
            <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
              <thead className="">
                <tr className="">
                  <th>identificacion</th>
                  <th>nombre</th>
                  <th>email</th>
                  <th>codigoGrupo</th>
                </tr>
              </thead>
              <tbody className="text-justify">
                {data.map((aux, id) => {
                  return [
                    <tr key={id}>
                      <td>{aux.identification}</td>
                      <td>{aux.name}</td>
                      <td>{aux.email}</td>
                      <td>{aux.codeGroupUser}</td>
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
              <i className="fa fa-download" /> Exportar
            </CSVLink>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

ModalExportCSV.propTypes = {
  modalexport: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default ModalExportCSV;
