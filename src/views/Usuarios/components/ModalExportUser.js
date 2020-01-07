import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CSVLink } from "react-csv";
import { Parser } from "json2csv";
import { USERS_EXPORT } from "../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalExportCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalexport,
      dataExport: [],
      username: "",
      t: this.props.t,
      auth: this.props.authorization
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.getDataExportCSV();
  };

  getDataExportCSV = () => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${USERS_EXPORT}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      }
    })
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
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>{t("app_usuarios_modal_exportar_titulo")}</ModalHeader>
          <ModalBody>
            <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
              <thead className="">
                <tr className="">
                  <th>{t("app_usuarios_modal_exportar_identificacion")}</th>
                  <th>{t("app_usuarios_modal_exportar_nombre")}</th>
                  <th>{t("app_usuarios_modal_exportar_email")}</th>
                  <th>{t("app_usuarios_modal_exportar_telefono")}</th>
                  <th>{t("app_usuarios_modal_exportar_direccion")}</th>
                  <th>{t("app_usuarios_modal_exportar_fecha_nacimiento")}</th>
                  <th>{t("app_usuarios_modal_exportar_usuario")}</th>
                  <th>{t("app_usuarios_modal_exportar_estado")}</th>
                  <th>{t("app_usuarios_modal_exportar_dependencia")}</th>
                  <th>{t("app_usuarios_modal_exportar_cargo")}</th>
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
              <i className="fa fa-times" />{" "}
              {t("app_usuarios_modal_exportar_boton_cerrar")}
            </button>
            <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" />{" "}
              {t("app_usuarios_modal_exportar_descargar_CSV")}
            </CSVLink>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

ModalExportCSV.propTypes = {
  modalexport: PropTypes.bool.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default ModalExportCSV;
