import React, { Component, Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CSVLink, CSVDownload } from "react-csv";
import { Parser } from "json2csv";
import { Trans } from "react-i18next";
import {
  TYPEDOCUMENTARYS_EXPORT_USERS,
  TYPEDOCUMENTARYS_STATUS
} from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalExportTDRUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalexport2,
      dataExport: [],
      t: this.props.t,
      username: "",
      tipoTramite: "",
      dataExportUSer: [],
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

  toogle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    console.log(this.props.id);
    return (
      <Fragment>
        <Modal className="modal-xl" isOpen={this.state.modal}>
          <ModalHeader>
            Exportar usuarios por tipo documental de radicacion
          </ModalHeader>
          <ModalBody>
            <SelectTipoTramite
              token={this.props.authorization}
              value={this.state.tipoTramite}
              onChange={e => {
                this.setState({ tipoTramite: e.target.value });
              }}
            />
            <div className="row">
              <div className="col-md-12">
                <TableCSV
                  authorization={this.props.authorization}
                  id={this.state.tipoTramite}
                  data={this.state.dataExportUSer}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" /> cerrar{" "}
            </button>

            {/* <button className="btn btn-secondary btn-sm"> Exportar  </button> */}
            {/* <CSVLink data={} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" />{' '}
              Exportar csv
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

ModalExportTDRUser.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default ModalExportTDRUser;

const SelectTipoTramite = props => {
  const token = props.token;
  const [data, setData] = useState([]);
  const username = decode(token);

  useEffect(() => {
    fetch(`${TYPEDOCUMENTARYS_STATUS}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(err => console.log("Error", err));
  }, []);
  return (
    <div className="form-group row">
      <label
        htmlFor="staticEmail"
        className="col-sm-3 col-form-label"
        style={{ paddingLeft: "70px" }}
      >
        Tipo documental de radicacion <span className="text-danger">*</span> :
      </label>
      <div className="col-sm-8">
        <select
          className="form-control form-control-sm"
          value={props.value}
          onChange={props.onChange}
        >
          <option value="">Seleccione tipo documental de radicacion</option>
          {data.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>
                {aux.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

class TableCSV extends React.Component {
  state = {
    data: this.props.data,
    idTipoTramite: this.props.id,
    auth: this.props.authorization
  };

  getDataTipoTramiteByUser = () => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(
      `${TYPEDOCUMENTARYS_EXPORT_USERS}/${this.props.id}/users?username=${username.user_name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.authorization
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data
        });
      })
      .catch(err => console.log("Error", err));
  };

  static getDerivedStateFromProps(props, state) {
    if (props.id !== state.idTipoTramite) {
      return {
        idTipoTramite: props.id
      };
    }
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      this.getDataTipoTramiteByUser();
    }
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  // componentDidMount() {
  //   this.getDataTipoTramiteByUser();
  // }

  render() {
    //  console.log(this.state.data);
    const data = this.state.data;
    const fields = [
      {
        label: "CodeTypeProcedure",
        value: "codeTypeProcedure"
      },
      {
        label: "email",
        value: "email"
      },
      {
        label: "identification",
        value: "identification"
      },
      {
        label: "nombre",
        value: "name"
      },
      {
        label: "original",
        value: "original"
      }
    ];
    const json2csvParser = new Parser({ fields, quote: "" });
    const csv = json2csvParser.parse(data);
    return (
      <div>
        <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
          <thead className="">
            <tr className="">
              <th>CodeTypeProcedure</th>
              <th>Email</th>
              <th>Identificacion</th>
              <th>Nombre</th>
              <th>Original</th>
            </tr>
          </thead>
          <tbody className="text-justify">
            {Object.keys(this.state.data).length === 0 ? (
              <p className="text-center"> No hay dato para generar el CSV </p>
            ) : (
              this.state.data.map((aux, id) => {
                return (
                  <tr>
                    <td>{aux.codeTypeDocumentary}</td>
                    <td>{aux.email}</td>
                    <td>{aux.identification}</td>
                    <td>{aux.name}</td>
                    <td>
                      {aux.original === true ? (
                        <p className="text-success">Activo</p>
                      ) : (
                        <p className="text-danger">Inactivo</p>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <CSVLink data={csv} className="btn btn-secondary btn-sm">
          <i className="fa fa-download" /> Exportar csv
        </CSVLink>
      </div>
    );
  }
}
