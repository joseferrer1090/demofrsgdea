import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { TEMPLATE_EXPORT } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import { CSVLink } from "react-csv";
import { Parser } from "json2csv";

class ModalExportData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalexport,
      auth: this.props.authorization,
      dataExport: []
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
    return null;
  }

  getDataExport = () => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${TEMPLATE_EXPORT}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataExport: data
        });
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.getDataExport();
  };
  render() {
    const data = this.state.dataExport;
    const fields = [
      {
        label: "code",
        value: "code"
      },
      {
        label: "name",
        value: "name"
      },
      {
        label: "description",
        value: "description"
      },
      {
        label: "status",
        value: "status"
      }
    ];
    const json2csvParser = new Parser({ fields, quote: "" });
    const csv = json2csvParser.parse(data);
    return (
      <Modal className={"modal-lg"} isOpen={this.state.modal}>
        <ModalHeader>
          {" "}
          <i className="fa fa-download" /> Exportar datos de la tabla
        </ModalHeader>
        <ModalBody>
          <table className="table  table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody className="text-justify">
              {this.state.dataExport.map((aux, id) => {
                return (
                  <tr key={id}>
                    <td>{aux.code}</td>
                    <td>{aux.name}</td>
                    <td>{aux.description}</td>
                    <td>{aux.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          <div className="pull-right">
            <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" /> Exportar informaciòn
            </CSVLink>
            &nbsp;
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              <i className="fa fa-times" /> Cerrar
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalExportData.propTypes = {
  authorization: PropTypes.string.isRequired
};

export default ModalExportData;
